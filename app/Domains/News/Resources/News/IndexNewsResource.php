<?php

namespace App\Domains\News\Resources\News;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexNewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => ['id' => $this->category->id, 'name' => $this->category->name],
            'author' => ['id' => $this->user->id, 'name' => $this->user->name],
            'title' => $this->title,
            'slug' => $this->slug,
            'status' => $this->status,
            'published_at' => $this->published_at?->toDateTimeString(),
        ];
    }
}
