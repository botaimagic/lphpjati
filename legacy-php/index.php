<?php
$activePage = 'home';
require_once __DIR__ . '/includes/functions.php';
$content = load_content();
$home = $content['home'] ?? [];
$pageTitle = ($home['name'] ?? SITE_NAME) . ' — Home';
require __DIR__ . '/includes/header.php';
?>
    <?php if (!empty($home['whatsapp_link'])): ?>
    <a href="<?= e($home['whatsapp_link']) ?>" target="_blank" rel="noopener" class="whatsapp-btn">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.388 2.012 13.916.99 11.295.99c-5.443 0-9.871 4.372-9.875 9.8-.002 1.8.483 3.55 1.402 5.093l-.993 3.629 3.731-.967c1.479.802 3.13 1.226 4.488 1.226zM18.14 14.8c-.334-.167-1.977-.965-2.282-1.074-.304-.11-.526-.167-.748.166-.221.332-.857 1.074-1.051 1.294-.194.22-.389.248-.723.081-.334-.167-1.409-.514-2.685-1.639-.992-.874-1.662-1.954-1.856-2.283-.194-.33-.021-.508.146-.673.15-.148.334-.384.5-.577.167-.193.222-.33.333-.55.111-.22.056-.413-.028-.579-.083-.167-.748-1.785-1.026-2.454-.27-.648-.544-.56-.748-.57l-.637-.01c-.221 0-.58.083-.884.412-.304.331-1.163 1.125-1.163 2.744 0 1.619 1.191 3.182 1.357 3.402.166.22 2.345 3.541 5.681 4.966.793.339 1.413.541 1.897.693.797.25 1.522.215 2.095.131.639-.094 1.977-.8 2.254-1.572.277-.771.277-1.433.194-1.571-.083-.138-.304-.22-.638-.387z"/></svg>
        <?= e($home['whatsapp_text'] ?? 'Contact Me') ?>
    </a>
    <?php endif; ?>

    <?php if (!empty($home['logos'])): ?>
    <div class="logo-section">
        <div class="section-divider">Speaker At</div>
        <div class="marquee-container">
            <div class="marquee-track">
                <?php foreach (array_merge($home['logos'], $home['logos']) as $logo): ?>
                <img src="<?= e($logo['img']) ?>" alt="<?= e($logo['name']) ?>" class="logo-img">
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <?php endif; ?>

    <div class="content-wrapper">
        <?php if (!empty($home['products'])): ?>
        <div>
            <div class="section-divider">Digital Products</div>
            <div class="product-grid" style="margin-top:16px;">
                <?php foreach ($home['products'] as $product): ?>
                <a href="<?= e($product['link']) ?>" target="_blank" rel="noopener" class="product-card">
                    <img src="<?= e($product['img']) ?>" alt="<?= e($product['name']) ?>" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name"><?= e($product['name']) ?></h3>
                        <span class="product-price"><?= e($product['price']) ?></span>
                        <div class="product-btn">Beli Sekarang</div>
                    </div>
                </a>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>
    </div>
<?php require __DIR__ . '/includes/footer.php'; ?>
