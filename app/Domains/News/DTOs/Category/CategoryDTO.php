<?php

namespace App\Domains\News\DTOs\Category;

use App\Domains\News\Enums\Status;

class CategoryDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $description,
        public readonly Status $status,
    ) {}
}
