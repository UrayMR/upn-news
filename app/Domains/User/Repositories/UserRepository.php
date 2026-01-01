<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\DTOs\StoreUserDTO;
use App\Domains\User\DTOs\UpdateUserDTO;
use App\Domains\User\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserRepository
{
  public function index(array $filters = [], int $perPage = 15): LengthAwarePaginator;
  public function store(StoreUserDTO $dto, ?string $profilePath = null): User;
  public function update(UpdateUserDTO $dto, User $user, ?string $profilePath = null): User;
  public function destroy(User $user): bool;
}
