<?php

namespace App\Domains\News\Providers;

use App\Domains\News\Repositories\Category\CategoryRepository;
use App\Domains\News\Repositories\Category\EloquentCategoryRepository;
use Illuminate\Support\ServiceProvider;

class CategoryServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            CategoryRepository::class,
            EloquentCategoryRepository::class
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
