<?php

namespace App\Domains\News\Services\News;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

abstract class NewsService
{
    /**
     * Handle the storage of a news picture file.
     */
    protected function handleUploadNewsPicture(?UploadedFile $file): ?string
    {
        return $file?->store('news_pictures');
    }

    /**
     * Handle the deletion of a news picture file.
     */
    protected function handleDeleteNewsPicture(?string $path): void
    {
        if ($path && Storage::exists($path)) {
            Storage::delete($path);
        }
    }
}
