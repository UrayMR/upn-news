<?php

namespace App\Domains\User\Services;

use App\Domains\User\DTOs\StoreUserDTO;
use App\Domains\User\Models\User;
use App\Domains\User\Repositories\UserRepository;

class DestroyUserService extends UserService
{
  public function __construct(
    protected UserRepository $users
  ) {}

  public function execute(User $user): bool
  {
    $this->assertAdminRole();
    $this->handleDeleteProfilePicture($user->profile_picture_path);

    return $this->users->destroy($user);
  }
}
