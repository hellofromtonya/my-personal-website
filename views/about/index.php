<?php

$filenames = array(
	'intro',
	'elevator-speech',
	'attributes',
	'think',
	'twist',
	'buzz',
);

foreach ( $filenames as $filename ) {
	include( __DIR__ . '/' . $filename . '.php' );
}
