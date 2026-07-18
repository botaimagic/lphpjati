<?php
require_once __DIR__ . '/../includes/functions.php';
require_login();

$content = load_content();
$home = $content['home'] ?? [];
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();

    $home['name'] = trim($_POST['name'] ?? '');
    $home['tagline'] = trim($_POST['tagline'] ?? '');
    $home['profile_img'] = handle_image_upload('profile_img_file', $home['profile_img'] ?? '');
    $home['whatsapp_text'] = trim($_POST['whatsapp_text'] ?? '');
    $home['whatsapp_link'] = trim($_POST['whatsapp_link'] ?? '');

    $home['social'] = [
        'instagram' => trim($_POST['social_instagram'] ?? ''),
        'linkedin' => trim($_POST['social_linkedin'] ?? ''),
        'scholar' => trim($_POST['social_scholar'] ?? ''),
        'email' => trim($_POST['social_email'] ?? ''),
    ];

    $logoRows = collect_rows($_POST, ['logos_name', 'logos_img']);
    $home['logos'] = array_map(fn($r) => ['name' => $r['logos_name'], 'img' => $r['logos_img']], $logoRows);

    $productRows = collect_rows($_POST, ['products_name', 'products_img', 'products_price', 'products_link']);
    $home['products'] = array_map(fn($r) => [
        'name' => $r['products_name'], 'img' => $r['products_img'],
        'price' => $r['products_price'], 'link' => $r['products_link'],
    ], $productRows);

    $content['home'] = $home;
    save_content($content);
    $success = 'Home page saved.';
}

$activeAdmin = 'home';
$pageTitle = 'Edit Home — CMS';
require __DIR__ . '/includes/admin-header.php';
?>
<h1>Edit Home Page</h1>
<?php if ($success): ?><div class="admin-success"><?= e($success) ?></div><?php endif; ?>

<form method="post" enctype="multipart/form-data">
    <?= csrf_field() ?>

    <div class="admin-card">
        <h3>Profile</h3>
        <div class="admin-field">
            <label>Name</label>
            <input type="text" name="name" value="<?= e($home['name'] ?? '') ?>" required>
        </div>
        <div class="admin-field">
            <label>Tagline</label>
            <input type="text" name="tagline" value="<?= e($home['tagline'] ?? '') ?>">
        </div>
        <div class="admin-field">
            <label>Profile Photo</label>
            <?php if (!empty($home['profile_img'])): ?>
            <div class="admin-current-image">
                <img src="<?= e(admin_img_src($home['profile_img'])) ?>" alt="">
                <span class="admin-field-hint">Current photo. Upload a new file to replace it.</span>
            </div>
            <?php endif; ?>
            <input type="file" name="profile_img_file" accept="image/*">
        </div>
    </div>

    <div class="admin-card">
        <h3>Contact Button</h3>
        <div class="admin-field">
            <label>Button Text</label>
            <input type="text" name="whatsapp_text" value="<?= e($home['whatsapp_text'] ?? '') ?>">
        </div>
        <div class="admin-field">
            <label>Link (WhatsApp / contact URL)</label>
            <input type="url" name="whatsapp_link" value="<?= e($home['whatsapp_link'] ?? '') ?>">
        </div>
    </div>

    <div class="admin-card">
        <h3>Social Links</h3>
        <div class="admin-field">
            <label>Instagram URL</label>
            <input type="url" name="social_instagram" value="<?= e($home['social']['instagram'] ?? '') ?>">
        </div>
        <div class="admin-field">
            <label>LinkedIn URL</label>
            <input type="url" name="social_linkedin" value="<?= e($home['social']['linkedin'] ?? '') ?>">
        </div>
        <div class="admin-field">
            <label>Google Scholar URL</label>
            <input type="url" name="social_scholar" value="<?= e($home['social']['scholar'] ?? '') ?>">
        </div>
        <div class="admin-field">
            <label>Email</label>
            <input type="email" name="social_email" value="<?= e($home['social']['email'] ?? '') ?>">
        </div>
    </div>

    <div class="admin-card">
        <h3>"Speaker At" Logos</h3>
        <div id="logos-rows">
            <?php foreach ($home['logos'] ?? [] as $logo): ?>
            <div class="admin-repeat-row">
                <button type="button" class="admin-repeat-remove" data-remove-row>Remove</button>
                <div class="admin-field-row">
                    <div class="admin-field"><label>Name</label><input type="text" name="logos_name[]" value="<?= e($logo['name']) ?>"></div>
                    <div class="admin-field"><label>Logo Image URL</label><input type="url" name="logos_img[]" value="<?= e($logo['img']) ?>"></div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
        <button type="button" class="admin-add-btn" data-add-row data-template="#logo-template" data-target="#logos-rows">+ Add Logo</button>
        <template id="logo-template">
            <div class="admin-repeat-row">
                <button type="button" class="admin-repeat-remove" data-remove-row>Remove</button>
                <div class="admin-field-row">
                    <div class="admin-field"><label>Name</label><input type="text" name="logos_name[]"></div>
                    <div class="admin-field"><label>Logo Image URL</label><input type="url" name="logos_img[]"></div>
                </div>
            </div>
        </template>
    </div>

    <div class="admin-card">
        <h3>Digital Products</h3>
        <div id="products-rows">
            <?php foreach ($home['products'] ?? [] as $product): ?>
            <div class="admin-repeat-row">
                <button type="button" class="admin-repeat-remove" data-remove-row>Remove</button>
                <div class="admin-field"><label>Name</label><input type="text" name="products_name[]" value="<?= e($product['name']) ?>"></div>
                <div class="admin-field-row">
                    <div class="admin-field"><label>Image URL</label><input type="url" name="products_img[]" value="<?= e($product['img']) ?>"></div>
                    <div class="admin-field"><label>Price</label><input type="text" name="products_price[]" value="<?= e($product['price']) ?>"></div>
                </div>
                <div class="admin-field"><label>Buy Link</label><input type="url" name="products_link[]" value="<?= e($product['link']) ?>"></div>
            </div>
            <?php endforeach; ?>
        </div>
        <button type="button" class="admin-add-btn" data-add-row data-template="#product-template" data-target="#products-rows">+ Add Product</button>
        <template id="product-template">
            <div class="admin-repeat-row">
                <button type="button" class="admin-repeat-remove" data-remove-row>Remove</button>
                <div class="admin-field"><label>Name</label><input type="text" name="products_name[]"></div>
                <div class="admin-field-row">
                    <div class="admin-field"><label>Image URL</label><input type="url" name="products_img[]"></div>
                    <div class="admin-field"><label>Price</label><input type="text" name="products_price[]"></div>
                </div>
                <div class="admin-field"><label>Buy Link</label><input type="url" name="products_link[]"></div>
            </div>
        </template>
    </div>

    <button type="submit" class="admin-btn-primary">Save Home Page</button>
</form>

<script src="assets/admin.js"></script>
<?php require __DIR__ . '/includes/admin-footer.php'; ?>
