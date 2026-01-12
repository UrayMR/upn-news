<?php

namespace App\Domains\News\Repositories\Category;

use App\Domains\News\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface CategoryRepository
{
    public function index(array $queryParams = [], int $perPage = 15): LengthAwarePaginator;

    public function store(array $attributes): Category;

    public function update(array $attributes, Category $category): Category;

    public function destroy(Category $category): bool;
}
