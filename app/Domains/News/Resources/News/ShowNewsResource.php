<?php

namespace App\Domains\News\Resources\News;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowNewsResource extends JsonResource
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
            'category' => $this->category->name,
            'author' => $this->user->name,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'image_path' => $this->image_path,
            'status' => $this->status,
            'views' => $this->views,
            'published_at' => $this->published_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
