<?php

foreach ( array(
	'intro',
	'me',
	'we',
) as $filename ) {
	include __DIR__ . '/' . $filename . '.php';
}
