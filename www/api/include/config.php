<?php
/**
 * Database configuration
 user: user_gootoplay
 pass: pass#GootoPlay2016
 */
// define('DB_USERNAME', 'root');
// define('DB_PASSWORD', 'root');


define('DB_USERNAME', 'user_gootoplay');
define('DB_PASSWORD', 'pass#GootoPlay2016');
define('DB_HOST', 'localhost');
define('DB_NAME', 'gootoplay_db');
 
 
/**
 * MSG91 configuration
 */
define('MSG91_AUTH_KEY', "117353A6izGErSMe576ceaad");
// sender id should 6 character long
define('MSG91_SENDER_ID', 'GOPLAY');
 
define('USER_CREATED_SUCCESSFULLY', 0);
define('USER_CREATE_FAILED', 1);
define('USER_ALREADY_EXISTED', 2);
?>