<?php

use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;
use Lukasmundt\Akquise\Http\Controllers\AkquiseController;
use Lukasmundt\Akquise\Http\Controllers\Controller;


Route::middleware(['web', 'auth', 'verified'])->prefix("akquise")->group(function () {
    Route::get('', [Controller::class, 'dashboard'])->name('akquise.dashboard');

    Route::middleware([])->prefix("akquise")->group(function () {

        Route::get('', [AkquiseController::class, 'index'])->name('akquise.akquise.index');
        Route::get('/create/1', [AkquiseController::class, 'firstCreate'])->name('akquise.akquise.create.1');
        Route::post('/create/2', [AkquiseController::class, 'secondCreate'])->name('akquise.akquise.create2');
        Route::get('/create/3', [AkquiseController::class, 'thirdCreate'])->name('akquise.akquise.create3');
        Route::get('/create/3/{key}', [AkquiseController::class, 'thirdCreate'])->name('akquise.akquise.create3');
        Route::post('', [AkquiseController::class, 'store'])->name('akquise.akquise.store');
        Route::get('/{projekt}/edit', [AkquiseController::class, 'edit'])->name('akquise.akquise.edit');
        Route::post('/{projekt}', [AkquiseController::class, 'update'])->name('akquise.akquise.update');
        Route::get('/{projekt}', [AkquiseController::class, 'show'])->name('akquise.akquise.show');
    });
});
Route::get('/pdf', [Controller::class, 'pdf'])->name('akquise.akquise.pdf');