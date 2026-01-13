<?php

namespace App\Domains\News\Repositories\News;

use App\Domains\News\Models\News;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface NewsRepository
{
    public function index(array $queryParams = [], int $perPage = 15): LengthAwarePaginator;

    public function store(array $attributes): News;

    public function update(array $attributes, News $news): News;

    public function destroy(News $news): bool;
}
