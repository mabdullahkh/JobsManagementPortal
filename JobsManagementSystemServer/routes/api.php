<?php

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EngineerController;
use App\Http\Controllers\InstallerController;
use App\Http\Controllers\Ec04Controller;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
 
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
// Engineer Apis
Route::post('/insertengineer', [EngineerController::class, 'store']);
Route::get('/allengineers', [EngineerController::class, 'index']);
Route::delete('/engineers/{id}', [EngineerController::class, 'destroy']);
Route::put('/engineers/{id}', [EngineerController::class, 'update']);

//Installer Apis

Route::post('/insertinstaller', [InstallerController::class, 'store']);
Route::get('/allinstallers', [InstallerController::class, 'index']);
Route::delete('/installers/{id}', [InstallerController::class, 'destroy']);
Route::put('/installers/{id}', [InstallerController::class, 'update']);

// Ec04 Apis

Route::post('/ec04', [Ec04Controller::class, 'store']);
Route::get('/allec04', [Ec04Controller::class, 'index']);

