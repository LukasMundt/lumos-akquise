<?php

namespace Lukasmundt\Akquise\Providers;

use App\Services\NavigationService;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AkquiseProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(Router $router)
    {
        $this->loadRoutesFrom(__DIR__ . '/../routes/web.php');
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'akquise');
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');

        // $this->app->booted(function () {
        //     NavigationService::$navigation
        //     ->add('Akquise', route('akquise.akquise.index'));
        // });
        
    }
}