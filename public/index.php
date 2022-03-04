<?php
use src\App\Lib;

session_start();

define("__ROOT__", dirname(__DIR__));

require_once( __ROOT__ . "/autoloader.php");
require_once( __ROOT__ . "/web.php");

// $jsonStr = file_get_contents( __DIR__ . "/app/words.json" );
// $jsonFile = json_decode($jsonStr);

// echo "<pre>";
// var_dump($jsonFile);
// echo "</pre>";



src\App\Route::init();

