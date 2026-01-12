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
     */
    public function execute(UpdateUserDTO $dto, User $user): User
    {
        $attributes = [
            'name' => $dto->name,
            'email' => $dto->email,
            'phone_number' => $dto->phone_number,
            'role' => $dto->role,
            'status' => $dto->status,
        ];

        if (! empty($dto->password)) {
            $attributes['password'] = $dto->password;
        }

        if ($dto->profile_picture_file) {
            $profilePath = $this->handleUploadProfilePicture($dto->profile_picture_file);

            $this->handleDeleteProfilePicture($user->profile_picture_path);

            $attributes['profile_picture_path'] = $profilePath;
        }

        return $this->users->update($attributes, $user);
    }
}
