<?php

function myLoader(string $name) {
    require_once( __ROOT__ . '/' . str_replace('\\', '/', $name) . '.php' );
}

spl_autoload_register("myLoader");

