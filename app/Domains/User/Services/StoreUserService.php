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
        $profilePath = $this->handleUploadProfilePicture($dto->profile_picture_file);

        return $this->users->store([
            'name' => $dto->name,
            'email' => $dto->email,
            'password' => $dto->password,
            'role' => $dto->role,
            'phone_number' => $dto->phone_number,
            'profile_picture_path' => $profilePath,
            'status' => $dto->status,
        ]);
    }
}
