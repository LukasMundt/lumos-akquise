<?php

namespace Lukasmundt\Akquise\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use Lukasmundt\Akquise\Models\Akquise;
use Lukasmundt\Akquise\Policies\AkquisePolicy;

class AkquiseProvider extends ServiceProvider
{
    protected $policies = [
        // Akquise::class => AkquisePolicy::class,
    ];

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
    }
}