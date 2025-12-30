<?php

namespace App\Domains\User\Services;

use App\Domains\User\DTOs\CreateUserDTO;
use App\Domains\User\Models\User;
use App\Domains\User\Enums\UserRole;
use App\Domains\User\Repositories\UserRepository;

class CreateUserService
{
  public function __construct(
    protected UserRepository $users
  ) {}

  public function execute(CreateUserDTO $dto, User $user): User
  {
    if ($user->role !== UserRole::ADMIN) {
      throw new \DomainException('Only admin can create users.');
    }

    if (! in_array($dto->role, UserRole::creatableByAdmin(), true)) {
      throw new \DomainException('Invalid role to be created.');
    }

    $profilePath = null;

    if ($dto->profile_picture_file) {
      $profilePath = $dto->profile_picture_file->store('profile_pictures');
    }

    return $this->users->create($dto, $profilePath);
  }
}
