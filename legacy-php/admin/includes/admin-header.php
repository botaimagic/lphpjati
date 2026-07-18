<?php
/** Expects $activeAdmin ('home'|'about'|'blog') and $pageTitle. */
require_once __DIR__ . '/../../includes/functions.php';
require_login();
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= e($pageTitle ?? 'CMS') ?></title>
<link rel="stylesheet" href="../assets/style.css">
<link rel="stylesheet" href="assets/admin.css">
</head>
<body class="admin-body">
<div class="admin-shell">
    <aside class="admin-sidebar">
        <h2>HPJati CMS</h2>
        <a href="home.php" class="<?= $activeAdmin === 'home' ? 'active' : '' ?>">Home</a>
        <a href="about.php" class="<?= $activeAdmin === 'about' ? 'active' : '' ?>">About</a>
        <a href="blog.php" class="<?= $activeAdmin === 'blog' ? 'active' : '' ?>">Blog</a>
        <div class="admin-view-link">
            <a href="../index.php" target="_blank">View Site ↗</a>
            <a href="logout.php" class="admin-logout">Logout</a>
        </div>
    </aside>
    <main class="admin-main">
