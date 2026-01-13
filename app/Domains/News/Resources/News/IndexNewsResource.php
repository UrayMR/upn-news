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
            'category' => $this->category->name,
            'author' => $this->user->name,
            'title' => $this->title,
            'slug' => $this->slug,
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
