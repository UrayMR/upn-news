<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

abstract class Controller
{
    use AuthorizesRequests;

    protected function render(string $component, array $props = [])
    {
        return Inertia::render($component, ['payload' => $props]);
    }
}
