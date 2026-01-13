<?php

namespace App\Http\Requests\News;

use App\Domains\News\DTOs\News\UpdateNewsDTO;
use App\Domains\News\Enums\NewsStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateNewsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image_file' => ['nullable', 'file', 'image', 'max:2048'], // max 2MB
            'status' => ['required', 'string', Rule::in(NewsStatus::values())],
        ];
    }

    /**
     * Convert the request data to a UpdateNewsDTO.
     */
    public function toDTO(): UpdateNewsDTO
    {
        return new UpdateNewsDTO(
            category_id: $this->input('category_id'),
            title: $this->input('title'),
            content: $this->input('content'),
            image_file: $this->file('image_file'),
            status: NewsStatus::from($this->input('status')),
        );
    }
}
