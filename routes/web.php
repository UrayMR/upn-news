<?php

use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\News\NewsController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', UserController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('news', NewsController::class);
});

require __DIR__.'/settings.php';
