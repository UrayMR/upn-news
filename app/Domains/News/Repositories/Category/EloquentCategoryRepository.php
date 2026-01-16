<?php

namespace App\Domains\News\Repositories\Category;

use App\Domains\News\Models\Category;
use App\Shared\DTOs\OptionDTO;
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
                $q->where('name', 'like', "%$search%");
            });
        }

        // Filter by status
        if (! empty($queryParams['filters']['status'])) {
            $query->where('status', $queryParams['filters']['status']);
        }

        return $query->orderByDesc('updated_at')->paginate($perPage);
    }

    public function store(array $attributes): Category
    {
        return Category::create($attributes);
    }

    /**
     * @param  Category  $category  (to be updated)
     */
    public function update(array $attributes, Category $category): Category
    {
        $category->update($attributes);

        return $category;
    }

    /**
     * @param  Category  $category  (to be deleted)
     */
    public function destroy(Category $category): bool
    {
        return $category->delete();
    }

    /**
     * Get category options that returns an array of ['label' => '', 'value' => '']
     */
    public function getOptions(): array
    {
        return Category::query()
            ->select('id', 'name')
            ->orderByDesc('updated_at')
            ->get()
            ->map(
                fn ($category) => OptionDTO::from(
                    label: $category->name,
                    value: $category->id,
                )->toArray()
            )
            ->toArray();
    }
}
