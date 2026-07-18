<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$content = load_content();
$posts = $content['blog'] ?? [];

$editId = $_GET['id'] ?? null;
$post = null;
if ($editId) {
    foreach ($posts as $p) {
        if ($p['id'] === $editId) { $post = $p; break; }
    }
}
$isNew = $post === null;
if ($isNew) {
    $post = ['id' => bin2hex(random_bytes(8)), 'slug' => '', 'title' => '', 'date' => date('Y-m-d'), 'thumbnail' => '', 'content' => '', 'status' => 'published'];
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();

    $title = trim($_POST['title'] ?? '');
    if ($title === '') {
        $error = 'Title is required.';
    } else {
        $post['title'] = $title;
        $post['date'] = trim($_POST['date'] ?? '') ?: date('Y-m-d');
        $post['content'] = trim($_POST['content'] ?? '');
        $post['status'] = ($_POST['status'] ?? 'published') === 'draft' ? 'draft' : 'published';
        $post['thumbnail'] = handle_image_upload('thumbnail_file', $post['thumbnail'] ?? '');

        $slugInput = trim($_POST['slug'] ?? '') ?: $title;
        $post['slug'] = unique_slug($slugInput, $posts, $isNew ? null : $post['id']);

        $index = null;
        foreach ($posts as $i => $p) {
            if ($p['id'] === $post['id']) { $index = $i; break; }
        }
        if ($index !== null) {
            $posts[$index] = $post;
        } else {
            $posts[] = $post;
        }

        $content['blog'] = $posts;
        save_content($content);
        header('Location: blog.php');
        exit;
    }
}

$activeAdmin = 'blog';
$pageTitle = ($isNew ? 'New Post' : 'Edit Post') . ' — CMS';
require __DIR__ . '/includes/admin-header.php';
?>
<h1><?= $isNew ? 'New Post' : 'Edit Post' ?></h1>
<?php if ($error): ?><div class="admin-alert"><?= e($error) ?></div><?php endif; ?>

<form method="post" enctype="multipart/form-data">
    <?= csrf_field() ?>

    <div class="admin-card">
        <div class="admin-field">
            <label>Title</label>
            <input type="text" name="title" value="<?= e($post['title']) ?>" required>
        </div>
        <div class="admin-field">
            <label>URL Slug (optional — auto-generated from title if left blank)</label>
            <input type="text" name="slug" value="<?= e($post['slug']) ?>" placeholder="e.g. my-first-post">
        </div>
        <div class="admin-field-row">
            <div class="admin-field">
                <label>Date</label>
                <input type="date" name="date" value="<?= e($post['date']) ?>">
            </div>
            <div class="admin-field">
                <label>Status</label>
                <select name="status" style="padding:10px 12px;border-radius:10px;border:1px solid #E2E8F0;font-family:inherit;font-size:14px;">
                    <option value="published" <?= $post['status'] === 'published' ? 'selected' : '' ?>>Published</option>
                    <option value="draft" <?= $post['status'] === 'draft' ? 'selected' : '' ?>>Draft</option>
                </select>
            </div>
        </div>
        <div class="admin-field">
            <label>Thumbnail Image</label>
            <?php if (!empty($post['thumbnail'])): ?>
            <div class="admin-current-image">
                <img src="<?= e(admin_img_src($post['thumbnail'])) ?>" alt="">
                <span class="admin-field-hint">Current thumbnail. Upload a new file to replace it.</span>
            </div>
            <?php endif; ?>
            <input type="file" name="thumbnail_file" accept="image/*">
        </div>
        <div class="admin-field">
            <label>Content</label>
            <textarea name="content" rows="12"><?= e($post['content']) ?></textarea>
            <span class="admin-field-hint">Plain text or basic HTML. Line breaks are shown automatically.</span>
        </div>
    </div>

    <button type="submit" class="admin-btn-primary">Save Post</button>
    <a href="blog.php" class="admin-btn-secondary">Cancel</a>
</form>

<?php require __DIR__ . '/includes/admin-footer.php'; ?>
