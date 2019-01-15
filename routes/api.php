<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->group(function ($router) {
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('user', 'AuthController@me');
    
    Route::post('busStops', 'ScheduleController@getBusStops')->name('bus-stops');
    Route::post('busStop/{id}', 'ScheduleController@getBusStopSchedule')->name('bus-stop');
    Route::post('bus/add', 'ScheduleController@addBusToStop')->name('add-bus');
});

Route::post('login', 'AuthController@login')->name('login');
