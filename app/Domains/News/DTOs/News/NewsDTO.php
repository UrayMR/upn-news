<?php

namespace App\Domains\News\DTOs\News;

use App\Domains\News\Enums\NewsStatus;
use Illuminate\Http\UploadedFile;

class NewsDTO
{
    public function __construct(
        public readonly string $category_id,
        public readonly string $title,
        public readonly string $content,
        public readonly ?UploadedFile $image_file,
        public readonly NewsStatus $status,
    ) {}
}
