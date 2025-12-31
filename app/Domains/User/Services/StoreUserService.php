<?php

namespace App\Domains\User\Services;

use App\Domains\User\DTOs\StoreUserDTO;
use App\Domains\User\Models\User;
use App\Domains\User\Repositories\UserRepository;

class StoreUserService extends UserService
{
  public function __construct(
    protected UserRepository $users
  ) {}

  public function execute(StoreUserDTO $dto): User
  {
    $this->assertAdminRole();
    $this->assertValidTargetRole($dto->role);

    $profilePath = $this->handleUploadProfilePicture($dto->profile_picture_file);

    return $this->users->store($dto, $profilePath);
  }
}
