<?php

namespace App\Domains\User\Services;

use App\Domains\User\DTOs\UpdateUserDTO;
use App\Domains\User\Models\User;
use App\Domains\User\Repositories\UserRepository;

class UpdateUserService extends UserService
{
  public function __construct(
    protected UserRepository $users
  ) {}

  /**
   * Update the specified user in storage.
   * 
   * @param UpdateUserDTO $dto
   * @param User $user
   * @return User
   */
  public function execute(UpdateUserDTO $dto, User $user): User
  {
    $this->assertAdminRole();
    $this->assertValidTargetRole($dto->role);

    $profilePath = $this->handleUploadProfilePicture($dto->profile_picture_file);

    if ($profilePath) {
      $this->handleDeleteProfilePicture($user->profile_picture_path);
    }

    return $this->users->update($dto, $user, $profilePath);
  }
}
