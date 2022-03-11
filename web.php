<?php

use src\App\Route;


Route::get("/", "PageController@main");
Route::get("/wordCheck", "PageController@wordCheck");


Route::post("/dateInsert", "PageController@dateInsert");
