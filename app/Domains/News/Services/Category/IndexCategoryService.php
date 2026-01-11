<?php

namespace App\Domains\News\Services\Category;

use App\Domains\News\Repositories\Category\CategoryRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class IndexCategoryService extends CategoryService
{
    public function __construct(
        protected CategoryRepository $categories
    ) {}

    public function execute(array $queryParams = []): LengthAwarePaginator
    {
        $this->assertAdminRole();

        return $this->categories->index($queryParams);
    }
}
