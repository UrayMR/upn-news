<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\DTOs\CreateUserDTO;
use App\Domains\User\Models\User;
use Illuminate\Support\Facades\Hash;

class EloquentUserRepository implements UserRepository
{
  public function create(CreateUserDTO $dto, ?string $profilePath = null): User
  {
    return User::create([
      'name' => $dto->name,
      'email' => $dto->email,
      'password' => Hash::make($dto->password),
      'role' => $dto->role,
      'phone_number' => $dto->phone_number,
      'profile_picture_path' => $profilePath,
      'status' => $dto->status,
    ]);
  }
}
