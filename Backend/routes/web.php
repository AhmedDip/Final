<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/login');
});
Route::get('/login', "loginController@index")->name("login.login");
Route::get('/login/logout', "loginController@logout")->name("logout");
Route::post('/login', "loginController@loginVarify");


Route::get('/login/registration', "loginController@signUP")->name("registration.register");
Route::post('/login/registration', "registrationcontroller@registration");


//-----------------------------Session Check-------------------------------------
Route::group(['middleware' => ['sessionCheck']], function () {
    Route::group(['middleware' => ['adminCheck']], function () {
        Route::get('/dashbord', "loginController@dashbord")->name("user.dashbord");

        Route::get('/dashbord/userList', "userController@userList")->name("user.user_list");
    

        Route::get('/dashbord/addUser', "userController@addUser")->name("user.add_user");
        Route::post('/dashbord/addUser', "userController@insertUser");

        Route::get('/dashbord/deleteUser', "userController@deleteUser")->name("user.delete_user");
        Route::post('/dashbord/deleteUser', "userController@destroy");

        Route::get('/dashbord/editUser', "userController@editUser")->name("user.edit_user");
        Route::get('/dashbord/completeEdit/{id}', "userController@completeEdit")->name("completeEdit");
        Route::post('/dashbord/completeEdit/{id}', "userController@editingOparetion");


        Route::get('/dashbord/blockUser', "userController@blockUser")->name("user.block_user");
        Route::post('/dashbord/blockUser', "userController@blockUserOparetion")->name("user.block_user");


     

       

        
    });
  


    });

     
    



    







