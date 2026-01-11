<?php

namespace App\Domains\News\Services\Category;

use App\Domains\News\DTOs\Category\UpdateCategoryDTO;
use App\Domains\News\Models\Category;
use App\Domains\News\Repositories\Category\CategoryRepository;

class UpdateCategoryService extends CategoryService
{
    public function __construct(
        protected CategoryRepository $categories
    ) {}

    public function execute(UpdateCategoryDTO $dto, Category $category): Category
    {
        $this->assertAdminRole();
        $this->assertCategorySlugIsNull($dto->slug);

        return $this->categories->update(
            $dto->withSlug(
                $this->generateCategorySlug($dto->name, $category->id)
            ),
            $category
        );
    }
}
