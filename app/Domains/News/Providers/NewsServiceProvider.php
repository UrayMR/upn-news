<?php

namespace App\Domains\News\Providers;

use App\Domains\News\Repositories\News\EloquentNewsRepository;
use App\Domains\News\Repositories\News\NewsRepository;
use Illuminate\Support\ServiceProvider;

class NewsServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            NewsRepository::class,
            EloquentNewsRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
