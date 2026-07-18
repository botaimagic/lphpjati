<?php
/**
 * Shared public page header.
 * Expects $activePage ('home'|'about'|'blog') and $pageTitle to be set by the including page.
 */
require_once __DIR__ . '/functions.php';
$content = load_content();
$home = $content['home'] ?? [];
$social = $home['social'] ?? [];
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= e($pageTitle ?? SITE_NAME) ?></title>
<link rel="icon" type="image/png" href="https://jagoprompt.com/wp-content/uploads/2026/01/favicon-32x32-1.png">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="jp-container">
    <header class="header-section">
        <div class="profile-wrapper">
            <img src="<?= e($home['profile_img'] ?? '') ?>" alt="<?= e($home['name'] ?? '') ?>" class="profile-img">
        </div>
        <h1><?= e($home['name'] ?? '') ?></h1>
        <p class="tagline"><?= e($home['tagline'] ?? '') ?></p>

        <nav class="jp-nav">
            <a href="index.php" class="<?= $activePage === 'home' ? 'active' : '' ?>">Home</a>
            <a href="about.php" class="<?= $activePage === 'about' ? 'active' : '' ?>">About</a>
            <a href="blog.php" class="<?= $activePage === 'blog' ? 'active' : '' ?>">Blog</a>
        </nav>

        <div class="social-row">
            <?php if (!empty($social['instagram'])): ?>
            <a href="<?= e($social['instagram']) ?>" class="social-btn" target="_blank" rel="noopener"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.36-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <?php endif; ?>
            <?php if (!empty($social['linkedin'])): ?>
            <a href="<?= e($social['linkedin']) ?>" class="social-btn" target="_blank" rel="noopener"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <?php endif; ?>
            <?php if (!empty($social['scholar'])): ?>
            <a href="<?= e($social['scholar']) ?>" class="social-btn" target="_blank" rel="noopener"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 8.3l11 6.3l9.3-5.3V16.5H23V8.3zM5.2 12.5V16c0 1.7 3 3 6.8 3s6.8-1.3 6.8-3v-3.5l-6.8 3.4z"/></svg></a>
            <?php endif; ?>
            <?php if (!empty($social['email'])): ?>
            <a href="mailto:<?= e($social['email']) ?>" class="social-btn"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></a>
            <?php endif; ?>
        </div>
    </header>
