<?php
/**
 * Global runtime configuration
 *
 * @package     HelloFromTonya
 * @since       1.5.4
 * @author      hellofromTonya
 * @link        https://hellofromtonya.com
 * @license     GNU-2.0+
 */

define( 'DEV_ENV', false );
$site_url = DEV_ENV === true
	? 'http://hellofromtonya.dev'
	: 'https://hellofromtonya.com';

$version = '1.5.4';

$title       = 'Hello from Tonya | Engineer. Educator. Mentor. Advisor. Author.';
$description = "Hello, I'm Tonya. Engineer. Educator. Mentor. Advisor. Author. I unlock potential in people and technology. Specializing in engineering, software, web development, and project management.";


$root_dir      = realpath( __DIR__ . '/..' );
$assets_dir    = '/assets';
$views_dir     = $root_dir . '/views';
$og_image      = $site_url . '/assets/images/social/hellofromtonya.png';
$twitter_image = $og_image;
