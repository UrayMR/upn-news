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
        public readonly ?string $password,
        public readonly UserRole $role,
        public readonly ?string $phone_number,
        public readonly ?UploadedFile $profile_picture_file,
        public readonly UserStatus $status,
    ) {}
}
