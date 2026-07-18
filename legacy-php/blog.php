<?php
$activePage = 'blog';
require_once __DIR__ . '/includes/functions.php';
$content = load_content();
$home = $content['home'] ?? [];
$posts = $content['blog'] ?? [];

$posts = array_filter($posts, fn($p) => ($p['status'] ?? 'published') === 'published');
usort($posts, fn($a, $b) => strcmp($b['date'] ?? '', $a['date'] ?? ''));

$pageTitle = ($home['name'] ?? SITE_NAME) . ' — Blog';
require __DIR__ . '/includes/header.php';
?>
    <div class="content-wrapper">
        <div>
            <div class="section-divider">Blog</div>
            <div class="blog-list" style="margin-top:16px;">
                <?php if (empty($posts)): ?>
                <div class="empty-state">Belum ada tulisan.</div>
                <?php else: ?>
                <?php foreach ($posts as $post): ?>
                <a href="post.php?slug=<?= urlencode($post['slug']) ?>" class="blog-card">
                    <div class="blog-thumb">
                        <?php if (!empty($post['thumbnail'])): ?>
                        <img src="<?= e($post['thumbnail']) ?>" alt="">
                        <?php else: ?>
                        📝
                        <?php endif; ?>
                    </div>
                    <div>
                        <div class="blog-title"><?= e($post['title']) ?></div>
                        <div class="blog-publish-date"><?= e(date('d M Y', strtotime($post['date'] ?? 'now'))) ?></div>
                    </div>
                </a>
                <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
<?php require __DIR__ . '/includes/footer.php'; ?>
