<?php
use src\App\Lib;

session_start();

date_default_timezone_set("Asia/Seoul");

define("__ROOT__", dirname(__DIR__));
define("__HT__", __DIR__);


require_once( __ROOT__ . "/autoloader.php");
require_once( __ROOT__ . "/web.php");


src\App\Route::init();

