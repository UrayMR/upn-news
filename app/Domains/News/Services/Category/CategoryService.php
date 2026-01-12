<?php

namespace App\Domains\News\Services\Category;

use App\Domains\News\DTOs\Category\CategoryDTO;
use App\Domains\News\Helpers\GenerateSlug;
use App\Domains\News\Models\Category;
use App\Domains\News\Repositories\Category\CategoryRepository;

class CategoryService
{
    public function __construct(protected CategoryRepository $categories) {}

    public function create(CategoryDTO $dto): Category
    {
        $column = 'slug';
        $slug = GenerateSlug::make($column, $dto->name);

        return $this->categories->store(
            [
                'name' => $dto->name,
                'slug' => $slug,
                'description' => $dto->description,
                'status' => $dto->status,
            ]
        );
    }

    public function update(CategoryDTO $dto, Category $category): Category
    {
        $column = 'slug';
        $slug = GenerateSlug::make($column, $dto->name, $category->id);

        return $this->categories->update(
            [
                'name' => $dto->name,
                'slug' => $slug,
                'description' => $dto->description,
                'status' => $dto->status,
            ],
            $category
        );
    }
}
