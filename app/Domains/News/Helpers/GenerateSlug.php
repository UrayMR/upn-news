<?php

namespace App\Domains\News\Helpers;

use Illuminate\Support\Str;

class GenerateSlug
{
    /**
     * Make a unique slug for the given column.
     *
     * @param  string  $model  The model to check for uniqueness.
     * @param  string  $name  The name to generate the slug from.
     * @param  int|null  $ignoreId  The ID of the model to ignore when checking for uniqueness.
     * @return string The unique slug for the model.
     */
    public static function make(string $model, string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $counter = 1;

        while (
            $model::query()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
