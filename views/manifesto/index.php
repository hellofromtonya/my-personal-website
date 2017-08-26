<?php

foreach ( array(
	'intro',
	'overview',
	'human',
	'professional',
	'leadership',
) as $filename ) {
	include __DIR__ . '/' . $filename . '.php';
}

