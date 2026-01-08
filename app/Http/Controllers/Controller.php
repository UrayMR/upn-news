<?php

namespace App\Http\Controllers;

use App\Utils\FlashResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

abstract class Controller
{
    use AuthorizesRequests;

    /**
     * Render an Inertia response with a standardized payload structure.
     *
     * @param  string  $component  The Inertia component to render.
     * @param  array  $props  Optional props to pass to the component.
     * @return \Inertia\Response
     */
    protected function render(string $component, array $props = [])
    {
        return Inertia::render($component, ['payload' => $props]);
    }

    /**
     * Generate a redirect response to a named route with an optional success flash message.
     *
     * @param  string  $route  The name of the route to redirect to.
     * @param  string|null  $message  Optional success flash message to include in the response.
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function response(string $route, ?string $message = null)
    {
        $response = redirect()->route($route);

        if ($message) {
            $response->with(FlashResponse::success($message));
        }

        return $response;
    }
}
