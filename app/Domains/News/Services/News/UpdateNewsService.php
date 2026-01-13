<?php

namespace App\Domains\News\Services;

use App\Domains\News\DTOs\News\UpdateNewsDTO;
use App\Domains\News\Helpers\GenerateSlug;
use App\Domains\News\Models\News;
use App\Domains\News\Repositories\News\NewsRepository;

class UpdateNewsService extends NewsService
{
    public function __construct(
        protected NewsRepository $news
    ) {}

    public function execute(UpdateNewsDTO $dto, News $news): News
    {
        $attributes = [
            'category_id' => $dto->category_id,
            'title' => $dto->title,
            'content' => $dto->content,
            'status' => $dto->status->value,
        ];

        if ($dto->image_file) {
            $imagePath = $this->handleUploadNewsPicture($dto->image_file);

            $this->handleDeleteNewsPicture($news->image_path);

            $attributes['image_path'] = $imagePath;
        }

        if ($dto->title !== $news->title) {
            $attributes['slug'] = GenerateSlug::make(News::class, $dto->title, $news->id);
        }

        return $this->news->update($attributes, $news);
    }
}
