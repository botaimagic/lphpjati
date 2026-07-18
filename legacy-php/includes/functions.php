<?php
require_once __DIR__ . '/../config.php';

function load_content(): array
{
    $raw = file_get_contents(CONTENT_FILE);
    $data = json_decode($raw, true);
    return is_array($data) ? $data : ['home' => [], 'about' => [], 'blog' => []];
}

function save_content(array $data): bool
{
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    $fp = fopen(CONTENT_FILE, 'c+');
    if (!$fp) {
        return false;
    }
    flock($fp, LOCK_EX);
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, $json);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return true;
}

function is_logged_in(): bool
{
    return !empty($_SESSION['is_admin']);
}

function require_login(): void
{
    if (!is_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf_token" value="' . htmlspecialchars(csrf_token()) . '">';
}

function check_csrf(): void
{
    $token = $_POST['csrf_token'] ?? '';
    if (!hash_equals($_SESSION['csrf_token'] ?? '', $token)) {
        http_response_code(403);
        die('Invalid CSRF token. Please go back and try again.');
    }
}

function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8');
}

/** Resolves a stored image path for display from within admin/ (one directory below site root). */
function admin_img_src(?string $path): string
{
    if (!$path) {
        return '';
    }
    return preg_match('#^https?://#i', $path) ? $path : '../' . $path;
}

function slugify(string $text): string
{
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    return trim($text, '-') ?: 'post';
}

function unique_slug(string $base, array $posts, ?string $excludeId = null): string
{
    $slug = slugify($base);
    $existing = array_column($posts, 'slug');
    $original = $slug;
    $i = 2;
    foreach ($posts as $post) {
        if ($post['slug'] === $slug && ($excludeId === null || $post['id'] !== $excludeId)) {
            while (in_array($slug, $existing, true)) {
                $slug = $original . '-' . $i;
                $i++;
            }
            break;
        }
    }
    return $slug;
}

/**
 * Handles an uploaded image field; returns the public URL path, or
 * the fallback (existing) URL if no new file was uploaded.
 */
function handle_image_upload(string $fieldName, string $fallback = ''): string
{
    if (empty($_FILES[$fieldName]) || $_FILES[$fieldName]['error'] === UPLOAD_ERR_NO_FILE) {
        return $fallback;
    }
    $file = $_FILES[$fieldName];
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return $fallback;
    }
    $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
    $mime = mime_content_type($file['tmp_name']);
    if (!isset($allowed[$mime])) {
        return $fallback;
    }
    if (!is_dir(UPLOADS_DIR)) {
        mkdir(UPLOADS_DIR, 0755, true);
    }
    $filename = bin2hex(random_bytes(8)) . '.' . $allowed[$mime];
    $dest = UPLOADS_DIR . '/' . $filename;
    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        return $fallback;
    }
    return UPLOADS_URL . '/' . $filename;
}

/** Rebuilds a repeatable-field array from parallel POST arrays, dropping blank rows. */
function collect_rows(array $post, array $fieldNames): array
{
    $rows = [];
    $count = 0;
    foreach ($fieldNames as $field) {
        if (isset($post[$field]) && is_array($post[$field])) {
            $count = max($count, count($post[$field]));
        }
    }
    for ($i = 0; $i < $count; $i++) {
        $row = [];
        $hasContent = false;
        foreach ($fieldNames as $field) {
            $value = trim($post[$field][$i] ?? '');
            $row[$field] = $value;
            if ($value !== '') {
                $hasContent = true;
            }
        }
        if ($hasContent) {
            $rows[] = $row;
        }
    }
    return $rows;
}
