<?php

namespace App\Domains\News\Services\Category;

use App\Domains\News\Models\Category;
use App\Domains\User\Enums\UserRole;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

abstract class CategoryService
{
    /**
     * Assert that the authenticated user has admin role.
     *
     * @throws \DomainException
     */
    protected function assertAdminRole(): void
    {
        $authenticatedUser = Auth::user();
        if ($authenticatedUser->role !== UserRole::ADMIN) {
            throw new \DomainException('Hanya Admin yang dapat melakukan aksi ini.');
        }
    }

    /**
     * Assert that the category slug is null.
     *
     * @throws \DomainException
     */
    protected function assertCategorySlugIsNull(?string $slug): void
    {
        if ($slug !== null) {
            throw new \DomainException('Slug tidak boleh diisi manual saat membuat atau mengupdate kategori.');
        }
    }

    /**
     * Generate a unique slug for the category.
     *
     * @param  string  $name  The name of the category.
     * @param  int|null  $ignoreId  The ID of the category to ignore when checking for uniqueness.
     * @return string The unique slug for the category.
     */
    protected function generateCategorySlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $counter = 1;

        while (
            Category::query()
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
