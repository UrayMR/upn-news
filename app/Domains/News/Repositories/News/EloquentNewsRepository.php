<?php

namespace App\Domains\News\Repositories\News;

use App\Domains\News\Models\News;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentNewsRepository implements NewsRepository
{
    /**
     * @param  array  $queryParams  (optional: ['search' => '', 'filters' => ['status' => '']])
     * @param  int  $perPage  (optional, default 15)
     */
    public function index(array $queryParams = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = News::query();

        // Searching
        if (! empty($queryParams['search'])) {
            $search = $queryParams['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%");
            });
        }

        // Filter by status
        if (! empty($queryParams['filters']['status'])) {
            $query->where('status', $queryParams['filters']['status']);
        }

        return $query->orderByDesc('updated_at')->paginate($perPage);
    }

    public function store(array $attributes): News
    {
        return News::create($attributes);
    }

    /**
     * @param  News  $news  (to be updated)
     */
    public function update(array $attributes, News $news): News
    {
        $news->update($attributes);

        return $news;
    }

    /**
     * @param  News  $news  (to be deleted)
     */
    public function destroy(News $news): bool
    {
        return $news->delete();
    }
}
