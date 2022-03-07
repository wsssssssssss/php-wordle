<?php

use src\App\Route;


Route::get("/", "PageController@main");
Route::post("/", "PageController@wordSearch");
