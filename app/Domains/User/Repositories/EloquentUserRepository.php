<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\DTOs\StoreUserDTO;
use App\Domains\User\DTOs\UpdateUserDTO;
use App\Domains\User\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class EloquentUserRepository implements UserRepository
{
  /**
   * @param array $filters (optional: ['search' => '', 'role' => '', 'status' => ''])
   * @param int $perPage (optional, default 15)
   * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
   */
  public function index(array $filters = [], int $perPage = 15): LengthAwarePaginator
  {
    $query = User::query();

    // Searching
    if (!empty($filters['search'])) {
      $search = $filters['search'];
      $query->where(function ($q) use ($search) {
        $q->where('name', 'like', "%$search%")
          ->orWhere('email', 'like', "%$search%")
          ->orWhere('phone_number', 'like', "%$search%")
        ;
      });
    }

    // Filter by role
    if (!empty($filters['role'])) {
      $query->where('role', $filters['role']);
    }

    // Filter by status
    if (!empty($filters['status'])) {
      $query->where('status', $filters['status']);
    }

    return $query->orderByDesc('updated_at')->paginate($perPage);
  }

  /**
   * @param StoreUserDTO $dto
   * @param string|null $profilePath
   * @return User
   */
  public function store(StoreUserDTO $dto, ?string $profilePath = null): User
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

  /**
   * @param UpdateUserDTO $dto
   * @param User $user (to be updated)
   * @param string|null $profilePath
   * @return User
   */
  public function update(UpdateUserDTO $dto, User $user, ?string $profilePath = null): User
  {
    $data = [
      'name' => $dto->name,
      'email' => $dto->email,
      'role' => $dto->role,
      'status' => $dto->status,
    ];

    if ($dto->password) {
      $data['password'] = Hash::make($dto->password);
    }

    if (!is_null($dto->phone_number)) {
      $data['phone_number'] = $dto->phone_number;
    }

    if (!is_null($profilePath)) {
      $data['profile_picture_path'] = $profilePath;
    }

    $user->update($data);

    return $user;
  }

  /**
   * @param User $user (to be deleted)
   * @return bool
   */
  public function destroy(User $user): bool
  {
    return $user->delete();
  }
}
