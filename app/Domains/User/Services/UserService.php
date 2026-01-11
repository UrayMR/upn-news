<?php

namespace App\Domains\User\Services;

use App\Domains\User\Enums\UserRole;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

abstract class UserService
{
    /**
     * Assert that the authenticated user has admin role.
     *
     * @throws \DomainException
     */
    protected function assertAdminRole(): void
    {
        $authenticatedUser = Auth::user();
        if ($authenticatedUser->role !== UserRole::ADMIN) {
            throw new \DomainException('Only admin can perform this action.');
        }
    }

    /**
     * Assert that the given role is valid for assignment.
     *
     * @throws \DomainException
     */
    protected function assertValidTargetRole(UserRole $role): void
    {
        if (! in_array($role, UserRole::creatableByAdmin(), true)) {
            throw new \DomainException('Invalid role to be assigned.');
        }
    }

    /**
     * Handle the storage of a profile picture file.
     */
    protected function handleUploadProfilePicture(?UploadedFile $file): ?string
    {
        return $file?->store('profile_pictures');
    }

    /**
     * Handle the deletion of a profile picture file.
     */
    protected function handleDeleteProfilePicture(?string $path): void
    {
        if ($path && Storage::exists($path)) {
            Storage::delete($path);
        }
    }
}
