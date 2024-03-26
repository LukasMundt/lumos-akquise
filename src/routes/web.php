<?php

use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;
use Lukasmundt\Akquise\Http\Controllers\AkquiseController;
use Lukasmundt\Akquise\Http\Controllers\Controller;
use Lukasmundt\Akquise\Http\Controllers\PersonController;
use Lukasmundt\Akquise\Http\Controllers\ToolController;


Route::middleware(['web', 'auth', 'verified'])->prefix("/{domain}/akquise")->group(function () {
    Route::get('', [Controller::class, 'dashboard'])->name('akquise.dashboard');

    Route::get('/tools/fixbauantrag2link', [ToolController::class, 'fixBauantrag2LinkView'])->name('akquise.tools.fixBauantrag2LinkView');
    Route::post('/tools/fixbauantrag2link', [ToolController::class, 'fixBauantrag2Link'])->name('akquise.tools.fixBauantrag2Link');

    Route::get('/creatables/list', [AkquiseController::class, 'listCreatables'])->name('akquise.akquise.listcreatables');
    Route::get('/creatables/details', [AkquiseController::class, 'detailsByCoordinates'])->name('akquise.akquise.detailsOfCreatable');

    Route::middleware([])->prefix("projects")->group(function () {
        // Karte
        Route::get('/map',[AkquiseController::class, 'map'])->name('akquise.akquise.map');
        
        Route::get('/{projekt}/notiz/{notiz}', [AkquiseController::class, 'show'])->name('akquise.akquise.showMitNotiz');
        Route::get('/{projekt}', [AkquiseController::class, 'show'])->name('akquise.akquise.show');
        Route::post('/{projekt}', [AkquiseController::class, 'update'])->name('akquise.akquise.update');
        
        
        Route::get('', [AkquiseController::class, 'index'])->name('akquise.akquise.index');
        Route::get('/create/1', [AkquiseController::class, 'create'])->name('akquise.akquise.create');
        Route::post('', [AkquiseController::class, 'store'])->name('akquise.akquise.store');
        Route::get('/{projekt}/edit', [AkquiseController::class, 'edit'])->name('akquise.akquise.edit');
        

        // Routen fuer Personen
        Route::get('/{projekt}/personen/associate', [PersonController::class, 'associate'])->name('akquise.akquise.personen.associate');
        Route::post('/{projekt}/personen/associate', [PersonController::class, 'storeAssociation'])->name('akquise.akquise.personen.storeAssociation');
    });
});
// Route::get('/pdf', [Controller::class, 'pdf'])->name('akquise.akquise.pdf');