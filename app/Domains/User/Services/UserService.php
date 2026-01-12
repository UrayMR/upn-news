<?php

namespace App\Domains\User\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

abstract class UserService
{
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
