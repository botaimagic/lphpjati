<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$content = load_content();
$posts = $content['blog'] ?? [];
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete') {
    check_csrf();
    $id = $_POST['id'] ?? '';
    $posts = array_values(array_filter($posts, fn($p) => $p['id'] !== $id));
    $content['blog'] = $posts;
    save_content($content);
    $success = 'Post deleted.';
}

usort($posts, fn($a, $b) => strcmp($b['date'] ?? '', $a['date'] ?? ''));

$activeAdmin = 'blog';
$pageTitle = 'Blog Posts — CMS';
require __DIR__ . '/includes/admin-header.php';
?>
<h1>Blog Posts</h1>
<?php if ($success): ?><div class="admin-success"><?= e($success) ?></div><?php endif; ?>

<a href="blog-edit.php" class="admin-btn-primary" style="text-decoration:none;display:inline-block;margin-bottom:20px;">+ New Post</a>

<div class="admin-card">
    <?php if (empty($posts)): ?>
    <p class="admin-muted">No posts yet.</p>
    <?php else: ?>
    <table class="admin-table">
        <thead>
        <tr><th></th><th>Title</th><th>Date</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
        <?php foreach ($posts as $post): ?>
        <tr>
            <td>
                <?php if (!empty($post['thumbnail'])): ?>
                <img src="<?= e(admin_img_src($post['thumbnail'])) ?>" class="admin-thumb-preview" alt="">
                <?php endif; ?>
            </td>
            <td><?= e($post['title']) ?></td>
            <td><?= e(date('d M Y', strtotime($post['date'] ?? 'now'))) ?></td>
            <td><span class="admin-status-badge admin-status-<?= e($post['status'] ?? 'published') ?>"><?= e($post['status'] ?? 'published') ?></span></td>
            <td class="admin-actions">
                <a href="blog-edit.php?id=<?= urlencode($post['id']) ?>" class="admin-btn-secondary">Edit</a>
                <form method="post" onsubmit="return confirm('Delete this post?');">
                    <?= csrf_field() ?>
                    <input type="hidden" name="action" value="delete">
                    <input type="hidden" name="id" value="<?= e($post['id']) ?>">
                    <button type="submit" class="admin-btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>
</div>

<?php require __DIR__ . '/includes/admin-footer.php'; ?>
