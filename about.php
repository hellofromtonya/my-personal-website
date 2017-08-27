<?php
/**
 * About Little Ole Me web page bootstrap.
 *
 * @package     HelloFromTonya
 * @since       1.5.2
 * @author      hellofromTonya
 * @link        https://hellofromtonya.com
 * @license     GNU-2.0+
 */

require __DIR__ . '/support/helpers.php';
require __DIR__ . '/config/globals.php';

$page  = 'about';
$title = 'About Tonya | ' . $title;
$url   = 'https://hellofromtonya.com/about';

include __DIR__ . '/views/index.php';
