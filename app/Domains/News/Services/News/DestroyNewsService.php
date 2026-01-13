<?php

namespace App\Domains\News\Services\News;

use App\Domains\News\Models\News;
use App\Domains\News\Repositories\News\NewsRepository;

class DestroyNewsService extends NewsService
{
    public function __construct(
        protected NewsRepository $news
    ) {}

    public function execute(News $news): bool
    {
        if ($news->image_path) {
            $this->handleDeleteNewsPicture($news->image_path);
        }

        return $this->news->destroy($news);
    }
}
