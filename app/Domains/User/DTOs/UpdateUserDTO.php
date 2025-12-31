<?php

namespace App\Domains\User\DTOs;

use App\Domains\User\Enums\UserRole;
use App\Domains\User\Enums\UserStatus;
use Illuminate\Http\UploadedFile;

class UpdateUserDTO
{
  public function __construct(
    public readonly string $name,
    public readonly string $email,
    public readonly ?string $password = null,
    public readonly UserRole $role,
    public readonly ?string $phone_number = null,
    public readonly ?UploadedFile $profile_picture_file = null,
    public readonly UserStatus $status,
  ) {}
}
