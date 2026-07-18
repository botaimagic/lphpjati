<?php
require_once __DIR__ . '/../includes/functions.php';

if (is_logged_in()) {
    header('Location: index.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === ADMIN_USERNAME && password_verify($password, ADMIN_PASSWORD_HASH)) {
        session_regenerate_id(true);
        $_SESSION['is_admin'] = true;
        header('Location: index.php');
        exit;
    }
    $error = 'Username atau password salah.';
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login — CMS <?= e(SITE_NAME) ?></title>
<link rel="stylesheet" href="../assets/style.css">
<link rel="stylesheet" href="assets/admin.css">
</head>
<body class="admin-body admin-login-body">
<div class="admin-login-card">
    <h1>CMS Login</h1>
    <p class="admin-muted"><?= e(SITE_NAME) ?></p>
    <?php if ($error): ?>
    <div class="admin-alert"><?= e($error) ?></div>
    <?php endif; ?>
    <form method="post">
        <?= csrf_field() ?>
        <label>Username
            <input type="text" name="username" required autofocus>
        </label>
        <label>Password
            <input type="password" name="password" required>
        </label>
        <button type="submit" class="admin-btn-primary">Masuk</button>
    </form>
</div>
</body>
</html>
