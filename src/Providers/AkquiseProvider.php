<?php

namespace Lukasmundt\Akquise\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Lukasmundt\Akquise\Commands\Install;
use Lukasmundt\Akquise\Models\Akquise;
use Lukasmundt\Akquise\Policies\AkquisePolicy;

class AkquiseProvider extends ServiceProvider
{
    protected $policies = [
        Akquise::class => AkquisePolicy::class,
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

        // Registering package commands.
        $this->commands([
            // add commands here
        ]);

        Gate::policy(Akquise::class, AkquisePolicy::class);
    }
}