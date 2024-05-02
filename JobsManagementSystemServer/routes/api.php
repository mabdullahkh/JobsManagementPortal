<?php

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EngineerController;
use App\Http\Controllers\InstallerController;
use App\Http\Controllers\Ec04Controller;
use App\Http\Controllers\PrivateJobController;
use App\Http\Controllers\EpcRatingController;
use App\Http\Controllers\JobTypesController;
use App\Http\Controllers\DataMatchController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AbsFieldController;

use App\Http\Controllers\AuthController;



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
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

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
Route::delete('/allec04/{id}', [Ec04Controller::class, 'destroy']); // Delete a job
Route::post('/ec04update/{id}', [Ec04Controller::class, 'update']);

// Private Job API
Route::post('/privatejob', [PrivateJobController::class, 'store']);
Route::get('/allprivatejob', [PrivateJobController::class, 'index']);
Route::delete('/allprivatejob/{id}', [PrivateJobController::class, 'destroy']); // Delete a job
Route::post('/privatejobupdate/{id}', [PrivateJobController::class, 'update']);

//EPC Rating API

Route::get('/epc-ratings', [EpcRatingController::class, 'index']);

// Job Type Api

Route::get('/job-types', [JobTypesController::class, 'index']);

// Data Match APi

Route::get('/datamatches', [DataMatchController::class, 'index']);

// Abs feild api

Route::get('/abs-fields', [AbsFieldController::class, 'index']);
