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
    Route::get('', [AkquiseController::class, 'dashboard'])->name('akquise.index');
    

    Route::middleware([])->prefix("akquise")->group(function () {
        Route::get('', [AdressenController::class, 'index'])->name('akquise.akquise.index');
        Route::get('/create/1', [AkquiseController::class,'firstCreate'])->name('akquise.akquise.create.1');
        // Route::get('/create/2', [AkquiseController::class,'secondCreate'])->name('akquise.akquise.create.2');
        Route::post('/create/2', [AkquiseController::class,'secondCreate'])->name('akquise.akquise.create2');
        Route::get('/create/3', [AkquiseController::class,'thirdCreate'])->name('akquise.akquise.create3');
        Route::get('/create/3/{key}', [AkquiseController::class,'thirdCreate'])->name('akquise.akquise.create3');
        // Route::get('/create', [AkquiseController::class,'create'])->name('akquise.akquise.create');
        Route::post('', [AkquiseController::class, 'store'])->name('akquise.akquise.store');
        Route::get('/{akquise}/edit', [AkquiseController::class, 'edit'])->name('akquise.akquise.edit');
        Route::post('/{akquise}', [AkquiseController::class, 'update'])->name('akquise.akquise.update');
        Route::get('/{projekt}', [AkquiseController::class, 'show'])->name('akquise.akquise.show');
        Route::get('/pdf', [AkquiseController::class, 'pdf'])->name('akquise.akquise.pdf');

        // Route::patch('{transaction}/status', [TransactionController::class, 'status'])->name('finances.transactions.status');
    });
});