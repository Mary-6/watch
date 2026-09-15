<?php

/**
 * Aurent Laravel entry point for hosts that cannot point the domain
 * directly to the public/ directory. This file forwards the request
 * to public/index.php while keeping the public/ path hidden from URLs.
 *
 * For the safest setup, set the web server DocumentRoot to aurent-laravel/public
 * and delete or ignore this file. If that is not possible, this file will run
 * the application from the repository root.
 */

require __DIR__ . '/public/index.php';
