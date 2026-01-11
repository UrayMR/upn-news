<?php

namespace App\Domains\News\Repositories\Category;

use App\Domains\News\DTOs\Category\StoreCategoryDTO;
use App\Domains\News\DTOs\Category\UpdateCategoryDTO;
use App\Domains\News\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface CategoryRepository
{
    public function index(array $queryParams = [], int $perPage = 15): LengthAwarePaginator;

    public function store(StoreCategoryDTO $dto): Category;

    public function update(UpdateCategoryDTO $dto, Category $category): Category;

    public function destroy(Category $category): bool;
}
