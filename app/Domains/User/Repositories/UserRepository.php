<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserRepository
{
    public function index(array $queryParams = [], int $perPage = 15): LengthAwarePaginator;

    public function store(array $attributes): User;

    public function update(array $attributes, User $user): User;

    public function destroy(User $user): bool;
}
