<?php

namespace App\Domains\News\Repositories\Category;

use App\Domains\News\DTOs\Category\StoreCategoryDTO;
use App\Domains\News\DTOs\Category\UpdateCategoryDTO;
use App\Domains\News\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentCategoryRepository implements CategoryRepository
{
    /**
     * @param  array  $queryParams  (optional: ['search' => '', 'filters' => ['status' => '']])
     * @param  int  $perPage  (optional, default 15)
     */
    public function index(array $queryParams = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Category::query();

        // Searching
        if (! empty($queryParams['search'])) {
            $search = $queryParams['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%")
                    ->orWhere('phone_number', 'like', "%$search%");
            });
        }

        // Filter by status
        if (! empty($queryParams['filters']['status'])) {
            $query->where('status', $queryParams['filters']['status']);
        }

        return $query->orderByDesc('updated_at')->paginate($perPage);
    }

    public function store(StoreCategoryDTO $dto): Category
    {
        return Category::create([
            'name' => $dto->name,
            'slug' => $dto->slug,
            'description' => $dto->description,
            'status' => $dto->status,
        ]);
    }

    /**
     * @param  Category  $category  (to be updated)
     */
    public function update(UpdateCategoryDTO $dto, Category $category): Category
    {
        $data = [
            'name' => $dto->name,
            'slug' => $dto->slug,
            'description' => $dto->description,
            'status' => $dto->status,
        ];

        $category->update($data);

        return $category;
    }

    /**
     * @param  Category  $category  (to be deleted)
     */
    public function destroy(Category $category): bool
    {
        return $category->delete();
    }
}
