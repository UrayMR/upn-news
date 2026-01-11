<?php

namespace App\Domains\News\DTOs\Category;

use App\Domains\News\Enums\Status;

class UpdateCategoryDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $description,
        public readonly Status $status,
        public readonly ?string $slug = null,
    ) {}

    /**
     * Create a new UpdateCategoryDTO with the given slug.
     */
    public function withSlug(string $slug): UpdateCategoryDTO
    {
        return new UpdateCategoryDTO(
            name: $this->name,
            description: $this->description,
            status: $this->status,
            slug: $slug,
        );
    }
}
