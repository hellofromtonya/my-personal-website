<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><?php echo $title; ?></title>
	<meta name="robots" content="noodp,noydir">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="canonical" href="<?php echo $url; ?>">
	<meta name="description" content="<?php echo $description; ?>">

	<meta property="og:title" name="og:title" content="<?php echo $title; ?>">
	<meta property="og:locale" name="og:locale" content="en_US">
	<meta property="og:type" name="og:type" content="website">
	<meta property="og:url" name="og:url" content="<?php echo $url; ?>">
	<meta property="og:site_name" name="og:site_name" content="hellofromtonya">
	<meta name="og:description" content="<?php echo $description; ?>">
	<meta property="og:image" content="<?php echo $og_image; ?>">
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">

	<meta property="twitter:card" name="twitter:card" content="summary_large_image">
	<meta property="twitter:title" content="<?php echo $title; ?>">
	<meta name="twitter:description" content="<?php echo $description; ?>">
	<meta name="twitter:site" content="@hellofromtonya">
	<meta property="twitter:image" content="<?php echo $twitter_image; ?>">
	<meta property="twitter:creator" name="twitter:creator" content="@hellofromtonya">

	<link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//ssl.google-analytics.com">
	<link rel="dns-prefetch" href="//maxcdn.bootstrapcdn.com">

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair+Display|Oswald|Source+Sans+Pro">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
	<link rel="stylesheet" href="<?php echo get_stylesheet_src(); ?>" type="text/css" media="all">

	<link rel="shortcut icon" href="<?php echo $assets_dir; ?>/images/favicon.jpg">
	<link rel="apple-touch-icon" href="<?php echo $assets_dir; ?>/images/apple-touch-icon.jpg">
	<meta name="google-site-verification" content="D6l_tyM6ACwkToJWQtTuj0HvSjRCoAdLlRemVKz21aA" />
	<?php
	if ( DEV_ENV !== true ) {
		include_once 'fixed-assets/google-analytics.html';
	}
	?>
</head>
<body class="<?php echo $page; ?>">
	<div class="site--container">
		<div class="fixed-assets">
			<?php
			require 'fixed-assets/header.php';
			require 'fixed-assets/menu-container.php';
			?>
		</div>
		<main class="site--content" itemscope itemtype="http://schema.org/CreativeWork">
			<?php require __DIR__ . '/' . $page . '/index.php'; ?>
		</main>
		<?php require $views_dir . '/fixed-assets/sidebar-right.php'; ?>
		<footer class="site--footer">
			<p>&copy 2016-<?php echo date('Y'); ?> Tonya Mork &middot; reach me: hello ( at ) hellofromtonya.com &middot; Be Kind. Excel.</p>
		</footer>
	</div>
	<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
	<script src="<?php echo get_script_src(); ?>"></script>
</body>
</html>