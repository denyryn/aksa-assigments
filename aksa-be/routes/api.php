<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthenticatedSessionController,
    DivisionController,
    EmployeeController
};

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::resource('/divisions', DivisionController::class);
    Route::resource('/employees', EmployeeController::class);
});