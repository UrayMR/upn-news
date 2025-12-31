<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\DTOs\StoreUserDTO;
use App\Domains\User\DTOs\UpdateUserDTO;
use App\Domains\User\Models\User;

interface UserRepository
{
  public function store(StoreUserDTO $dto, ?string $profilePath = null): User;
  public function update(UpdateUserDTO $dto, User $user, ?string $profilePath = null): User;
}
