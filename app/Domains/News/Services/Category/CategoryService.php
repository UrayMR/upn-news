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
        $slug = GenerateSlug::make(Category::class, $dto->name);

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
        $attributes = [
            'name' => $dto->name,
            'description' => $dto->description,
            'status' => $dto->status,
        ];

        if ($dto->name !== $category->name) {
            $attributes['slug'] = GenerateSlug::make(Category::class, $dto->name, $category->id);
        }

        return $this->categories->update($attributes, $category);
    }
}
