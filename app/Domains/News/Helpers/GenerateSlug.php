<?php

namespace App\Domains\News\Helpers;

use App\Domains\News\Models\Category;
use Illuminate\Support\Str;

class GenerateSlug
{
    /**
     * Make a unique slug for the given column.
     *
     * @param  string  $column  The column to check for uniqueness.
     * @param  string  $name  The name to generate the slug from.
     * @param  int|null  $ignoreId  The ID of the model to ignore when checking for uniqueness.
     * @return string The unique slug for the model.
     */
    public static function make(string $column, string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $counter = 1;

        while (
            Category::query()
                ->where($column, $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
