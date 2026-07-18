<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$content = load_content();
$about = $content['about'] ?? [];
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();

    $about['intro'] = trim($_POST['intro'] ?? '');

    $eduRows = collect_rows($_POST, ['edu_title', 'edu_subtitle']);
    $about['education'] = array_map(fn($r) => ['title' => $r['edu_title'], 'subtitle' => $r['edu_subtitle']], $eduRows);

    $speechRows = collect_rows($_POST, ['speech_title', 'speech_subtitle']);
    $about['speeches'] = array_map(fn($r) => ['title' => $r['speech_title'], 'subtitle' => $r['speech_subtitle']], $speechRows);

    $bookRows = collect_rows($_POST, ['book_title', 'book_subtitle', 'book_link']);
    $about['books'] = array_map(fn($r) => ['title' => $r['book_title'], 'subtitle' => $r['book_subtitle'], 'link' => $r['book_link']], $bookRows);

    $content['about'] = $about;
    save_content($content);
    $success = 'About page saved.';
}

$activeAdmin = 'about';
$pageTitle = 'Edit About — CMS';
require __DIR__ . '/includes/admin-header.php';
?>
<h1>Edit About Page</h1>
<?php if ($success): ?><div class="admin-success"><?= e($success) ?></div><?php endif; ?>

<form method="post">
    <?= csrf_field() ?>

    <div class="admin-card">
        <h3>Intro / Bio</h3>
        <div class="admin-field">
            <textarea name="intro" rows="4"><?= e($about['intro'] ?? '') ?></textarea>
        </div>
    </div>

    <div class="admin-card">
        <h3>Selected Speech</h3>
        <div id="speech-rows">
            <?php foreach ($about['speeches'] ?? [] as $item): ?>
            <div class="admin-repeat-row">
                <button type="button" class="admin-repeat-remove" data-remove-row>Remove</button>
                <div class="admin-field"><label>Title</label><input type="text" name="speech_title[]" value="<?= e($item['title']) ?>"></div>
                <div class="admin-field"><label>Subtitle</label><input type="text" name="speech_subtitle[]" value="<?= e($item['subtitle']) ?>"></div>
            </div>
            <?php endforeach; ?>
        </div>
        <button type="button" class="admin-add-btn" data-add-row data-template="#speech-template" data-target="#speech-rows">+ Add Speech</button>
        <template id="speech-template">
            <div class="admin-repeat-row">
                <button type="button" class="admin-repeat-remove" data-remove-row>Remove</button>
                <div class="admin-field"><label>Title</label><input type="text" name="speech_title[]"></div>
                <div class="admin-field"><label>Subtitle</label><input type="text" name="speech_subtitle[]"></div>
            </div>
        </template>
    </div>

    <div class="admin-card">
        <h3>Education</h3>
        <div id="edu-rows">
            <?php foreach ($about['education'] ?? [] as $item): ?>
            <div class="admin-repeat-row">
                <button type="button" class="admin-repeat-remove" data-remove-row>Remove</button>
                <div class="admin-field"><label>Title</label><input type="text" name="edu_title[]" value="<?= e($item['title']) ?>"></div>
                <div class="admin-field"><label>Subtitle</label><input type="text" name="edu_subtitle[]" value="<?= e($item['subtitle']) ?>"></div>
            </div>
            <?php endforeach; ?>
        </div>
        <button type="button" class="admin-add-btn" data-add-row data-template="#edu-template" data-target="#edu-rows">+ Add Education</button>
        <template id="edu-template">
            <div class="admin-repeat-row">
                <button type="button" class="admin-repeat-remove" data-remove-row>Remove</button>
                <div class="admin-field"><label>Title</label><input type="text" name="edu_title[]"></div>
                <div class="admin-field"><label>Subtitle</label><input type="text" name="edu_subtitle[]"></div>
            </div>
        </template>
    </div>

    <div class="admin-card">
        <h3>Books</h3>
        <div id="book-rows">
            <?php foreach ($about['books'] ?? [] as $item): ?>
            <div class="admin-repeat-row">
                <button type="button" class="admin-repeat-remove" data-remove-row>Remove</button>
                <div class="admin-field"><label>Title</label><input type="text" name="book_title[]" value="<?= e($item['title']) ?>"></div>
                <div class="admin-field"><label>Subtitle</label><input type="text" name="book_subtitle[]" value="<?= e($item['subtitle']) ?>"></div>
                <div class="admin-field"><label>Link</label><input type="url" name="book_link[]" value="<?= e($item['link']) ?>"></div>
            </div>
            <?php endforeach; ?>
        </div>
        <button type="button" class="admin-add-btn" data-add-row data-template="#book-template" data-target="#book-rows">+ Add Book</button>
        <template id="book-template">
            <div class="admin-repeat-row">
                <button type="button" class="admin-repeat-remove" data-remove-row>Remove</button>
                <div class="admin-field"><label>Title</label><input type="text" name="book_title[]"></div>
                <div class="admin-field"><label>Subtitle</label><input type="text" name="book_subtitle[]"></div>
                <div class="admin-field"><label>Link</label><input type="url" name="book_link[]"></div>
            </div>
        </template>
    </div>

    <button type="submit" class="admin-btn-primary">Save About Page</button>
</form>

<script src="assets/admin.js"></script>
<?php require __DIR__ . '/includes/admin-footer.php'; ?>
