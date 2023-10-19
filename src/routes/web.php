<?php

use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Lukasmundt\Akquise\Http\Controllers\AdressenController;
use Lukasmundt\Akquise\Http\Controllers\AkquiseController;

// Route::group(['middleware' => ['web', 'auth']], function () {
//     Route::get('inspire', [AkquiseController::class, 'index'])->name('akquise.index');
// });

Route::middleware(['web','auth', 'verified'])->prefix("akquise")->group(function () {
    Route::get('', [AkquiseController::class, 'index'])->name('akquise.index');
    

    Route::middleware([])->prefix("adressen")->group(function () {
        Route::get('', [AdressenController::class, 'index'])->name('akquise.adressen.index');
        // Route::patch('{transaction}/status', [TransactionController::class, 'status'])->name('finances.transactions.status');
    });
});