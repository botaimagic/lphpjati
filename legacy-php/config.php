<?php
/**
 * Site configuration.
 * CHANGE ADMIN_USERNAME AND THE PASSWORD HASH BEFORE GOING LIVE.
 * To generate a new hash, run this once from a terminal with PHP installed:
 *   php -r "echo password_hash('yourNewPassword', PASSWORD_DEFAULT), PHP_EOL;"
 * then paste the result below as ADMIN_PASSWORD_HASH.
 */

define('ADMIN_USERNAME', 'admin');

// Default password: changeme123  -- CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN.
define('ADMIN_PASSWORD_HASH', '$2y$10$pHilzXCJeSs5ZsrrLAEHAewulbOxwwtZEd5ZaAssIZnzyDIzjLGO6');

define('SITE_NAME', 'Hadi Purnama Jati');
define('CONTENT_FILE', __DIR__ . '/data/content.json');
define('UPLOADS_DIR', __DIR__ . '/assets/uploads');
define('UPLOADS_URL', 'assets/uploads');

// Used to sign the login session cookie name; change to any random string.
define('SESSION_NAME', 'hpjati_cms_session');

session_name(SESSION_NAME);
session_start();
