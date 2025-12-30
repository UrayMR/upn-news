<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\DTOs\CreateUserDTO;
use App\Domains\User\Models\User;

interface UserRepository
{
  public function create(CreateUserDTO $dto, ?string $profilePath = null): User;
}
