<?php

namespace App\Domains\News\Services\Category;

use App\Domains\News\DTOs\Category\StoreCategoryDTO;
use App\Domains\News\Models\Category;
use App\Domains\News\Repositories\Category\CategoryRepository;

class StoreCategoryService extends CategoryService
{
    public function __construct(
        protected CategoryRepository $categories
    ) {}

    public function execute(StoreCategoryDTO $dto): Category
    {
        $this->assertAdminRole();
        $this->assertCategorySlugIsNull($dto->slug);

        return $this->categories->store(
            $dto->withSlug(
                $this->generateCategorySlug($dto->name)
            )
        );
    }
}
