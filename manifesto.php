<?php
/**
 * My Manifesto web page bootstrap.
 *
 * @package     HelloFromTonya
 * @since       1.5.2
 * @author      hellofromTonya
 * @link        https://hellofromtonya.com
 * @license     GNU-2.0+
 */

require __DIR__ . '/support/helpers.php';
require __DIR__ . '/config/globals.php';

$page          = 'manifesto';
$title         = 'Manifesto | Hello from Tonya | Engineer. Educator. Mentor. Advisor. Author.';

$url           = $site_url . '/manifesto';

require __DIR__ . '/views/index.php';