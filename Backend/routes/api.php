<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', "adminAPI@insertUser");
Route::post('/signin', "adminAPI@loginVarify");
Route::post('/adduser', "adminAPI@insertUser");
Route::get('/userlist', "adminAPI@userList");

Route::post('/edituseroparation/{id}', "adminAPI@editingOparetion");
Route::post('/blockUserOparetion/{id}', "adminAPI@blockUserOparetion");
Route::post('/unblockOperation/{id}', "adminAPI@unblockOperation");
Route::post('/destroy/{id}', "adminAPI@destroy");
Route::post('/pendingUserOparation/{id}', "adminAPI@pendingUserOparation");






