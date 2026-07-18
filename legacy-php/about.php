<?php
$activePage = 'about';
require_once __DIR__ . '/includes/functions.php';
$content = load_content();
$home = $content['home'] ?? [];
$about = $content['about'] ?? [];
$pageTitle = ($home['name'] ?? SITE_NAME) . ' — About';
require __DIR__ . '/includes/header.php';
?>
    <div class="content-wrapper">

        <?php if (!empty($about['intro'])): ?>
        <div>
            <div class="section-divider">About</div>
            <p class="intro-text" style="margin-top:16px;"><?= nl2br(e($about['intro'])) ?></p>
        </div>
        <?php endif; ?>

        <?php if (!empty($about['speeches'])): ?>
        <div>
            <div class="section-divider">Selected Speech</div>
            <div class="links-group" style="margin-top:16px;">
                <?php foreach ($about['speeches'] as $item): ?>
                <div class="card-link">
                    <div class="card-icon-box">🎙️</div>
                    <div class="card-info">
                        <h3><?= e($item['title']) ?></h3>
                        <p><?= e($item['subtitle']) ?></p>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>

        <?php if (!empty($about['education'])): ?>
        <div>
            <div class="section-divider">Education</div>
            <div class="links-group" style="margin-top:16px;">
                <?php foreach ($about['education'] as $item): ?>
                <div class="card-link">
                    <div class="card-icon-box">🎓</div>
                    <div class="card-info">
                        <h3><?= e($item['title']) ?></h3>
                        <p><?= e($item['subtitle']) ?></p>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>

        <?php if (!empty($about['books'])): ?>
        <div>
            <div class="section-divider">Books</div>
            <div class="links-group" style="margin-top:16px;">
                <?php foreach ($about['books'] as $item): ?>
                <a href="<?= e($item['link']) ?>" target="_blank" rel="noopener" class="card-link">
                    <div class="card-icon-box green">📚</div>
                    <div class="card-info">
                        <h3><?= e($item['title']) ?></h3>
                        <p><?= e($item['subtitle']) ?></p>
                    </div>
                    <div class="card-arrow">→</div>
                </a>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>

    </div>
<?php require __DIR__ . '/includes/footer.php'; ?>
