<?php
$activePage = 'blog';
require_once __DIR__ . '/includes/functions.php';
$content = load_content();
$home = $content['home'] ?? [];
$posts = $content['blog'] ?? [];

$slug = $_GET['slug'] ?? '';
$post = null;
foreach ($posts as $p) {
    if ($p['slug'] === $slug && ($p['status'] ?? 'published') === 'published') {
        $post = $p;
        break;
    }
}

$pageTitle = $post ? ($post['title'] . ' — ' . ($home['name'] ?? SITE_NAME)) : 'Post not found';
require __DIR__ . '/includes/header.php';
?>
    <div class="content-wrapper">
        <a href="blog.php" class="back-link">← Back to Blog</a>

        <?php if (!$post): ?>
        <div class="empty-state">Tulisan tidak ditemukan.</div>
        <?php else: ?>
        <div class="post-header">
            <?php if (!empty($post['thumbnail'])): ?>
            <img src="<?= e($post['thumbnail']) ?>" alt="" class="post-cover">
            <?php endif; ?>
            <div class="post-body">
                <h1><?= e($post['title']) ?></h1>
                <div class="post-date"><?= e(date('d M Y', strtotime($post['date'] ?? 'now'))) ?></div>
                <div class="post-content"><?= nl2br($post['content'] ?? '') ?></div>
            </div>
        </div>
        <?php endif; ?>
    </div>
<?php require __DIR__ . '/includes/footer.php'; ?>
