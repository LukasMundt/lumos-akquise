<?php

use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;
use Lukasmundt\Akquise\Http\Controllers\AkquiseController;
use Lukasmundt\Akquise\Http\Controllers\Controller;
use Lukasmundt\Akquise\Http\Controllers\PersonController;


Route::middleware(['web', 'auth', 'verified'])->prefix("/{domain}/akquise")->group(function () {
    Route::get('', [Controller::class, 'dashboard'])->name('akquise.dashboard');

    Route::middleware([])->prefix("akquise")->group(function () {
        // Karte
        Route::get('/map',[AkquiseController::class, 'map'])->name('akquise.akquise.map');
        
        Route::get('/{projekt}/notiz/{notiz}', [AkquiseController::class, 'show'])->name('akquise.akquise.showMitNotiz');
        Route::get('/{projekt}', [AkquiseController::class, 'show'])->name('akquise.akquise.show');
        Route::post('/{projekt}', [AkquiseController::class, 'update'])->name('akquise.akquise.update');
        
        
        Route::get('', [AkquiseController::class, 'index'])->name('akquise.akquise.index');
        Route::get('/create/1', [AkquiseController::class, 'firstCreate'])->name('akquise.akquise.create.1');
        Route::post('/create/2', [AkquiseController::class, 'secondCreate'])->name('akquise.akquise.create2');
        Route::get('/create/3', [AkquiseController::class, 'thirdCreate'])->name('akquise.akquise.create3');
        Route::get('/create/3/{key}', [AkquiseController::class, 'thirdCreate'])->name('akquise.akquise.create3');
        Route::post('', [AkquiseController::class, 'store'])->name('akquise.akquise.store');
        Route::get('/{projekt}/edit', [AkquiseController::class, 'edit'])->name('akquise.akquise.edit');
        

        // Routen fuer Personen
        Route::get('/{projekt}/personen/associate', [PersonController::class, 'associate'])->name('akquise.akquise.personen.associate');
        Route::post('/{projekt}/personen/associate', [PersonController::class, 'storeAssociation'])->name('akquise.akquise.personen.storeAssociation');
    });
});
// Route::get('/pdf', [Controller::class, 'pdf'])->name('akquise.akquise.pdf');