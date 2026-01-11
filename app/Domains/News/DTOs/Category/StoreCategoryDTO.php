<?php

namespace App\Domains\News\DTOs\Category;

use App\Domains\News\Enums\Status;

class StoreCategoryDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $description,
        public readonly Status $status,
        public readonly ?string $slug = null,
    ) {}

    /**
     * Create a new StoreCategoryDTO with the given slug.
     */
    public function withSlug(string $slug): StoreCategoryDTO
    {
        return new StoreCategoryDTO(
            name: $this->name,
            description: $this->description,
            status: $this->status,
            slug: $slug,
        );
    }
}
