<?php

foreach ( array(
	'intro',
	'me',
	'we',
	'faq',
) as $filename ) {
	include __DIR__ . '/' . $filename . '.php';
}
