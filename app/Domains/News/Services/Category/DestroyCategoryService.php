<?php

namespace App\Domains\News\Services\Category;

use App\Domains\News\Models\Category;
use App\Domains\News\Repositories\Category\CategoryRepository;

class DestroyCategoryService extends CategoryService
{
    public function __construct(
        protected CategoryRepository $categories
    ) {}

    public function execute(Category $category): bool
    {
        $this->assertAdminRole();

        return $this->categories->destroy($category);
    }
}
