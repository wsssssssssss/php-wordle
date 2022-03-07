<?php

use src\App\Route;


Route::get("/", "PageController@main");

Route::post("/wordSearch", "PageController@wordSearch");
Route::post("/dateInsert", "PageController@dateInsert");
