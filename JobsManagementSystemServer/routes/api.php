<?php

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EngineerController;
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
// Engineer Apis
Route::post('/register', [UserController::class, 'register']);

Route::post('/login', [UserController::class, 'login']);

Route::post('/insertengineer', [EngineerController::class, 'store']);
Route::get('/allengineers', [EngineerController::class, 'index']);
Route::delete('/engineers/{id}', [EngineerController::class, 'destroy']);
Route::put('/engineers/{id}', [EngineerController::class, 'update']);




