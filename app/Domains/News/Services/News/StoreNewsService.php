<?php

namespace App\Domains\News\Services;

use App\Domains\News\DTOs\News\StoreNewsDTO;
use App\Domains\News\Helpers\GenerateSlug;
use App\Domains\News\Models\News;
use App\Domains\News\Repositories\News\NewsRepository;

class StoreNewsService extends NewsService
{
    public function __construct(
        protected NewsRepository $news
    ) {}

    public function execute(StoreNewsDTO $dto): News
    {
        $imagePath = $this->handleUploadNewsPicture($dto->image_file);

        $slug = GenerateSlug::make(News::class, $dto->title);

        return $this->news->store([
            'user_id' => $dto->user_id,
            'category_id' => $dto->category_id,
            'title' => $dto->title,
            'slug' => $slug,
            'content' => $dto->content,
            'image_path' => $imagePath,
            'status' => $dto->status,
        ]);
    }
}
