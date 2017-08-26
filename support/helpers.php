<?php

function get_stylesheet_src() {
	global $root_dir, $version, $site_url;

	if ( ! is_in_debug_mode() ) {
		return sprintf(
			'%s/assets/dist/%s/css/style.min.css',
			$site_url,
			$version
		);
	}

	$file =  '/assets/dist/css/style.css';

	return sprintf(
		'%s?=ver=%s',
		$file,
		filemtime( $root_dir . $file )
	);
}

function get_script_src() {
	global $root_dir, $version, $site_url;

	if ( ! is_in_debug_mode() ) {
		return sprintf(
			'%s/assets/dist/%s/js/jquery.project.min.js',
			$site_url,
			$version
		);
	}

	$file =  '/assets/dist/js/jquery.project.js';

	return sprintf(
		'%s?=ver=%s',
		$file,
		filemtime( $root_dir . $file )
	);
}

function is_in_debug_mode() {
	return defined('DEV_ENV') && DEV_ENV === true;
}
