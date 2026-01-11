<?php

namespace App\Http\Requests\Category;

use App\Domains\News\DTOs\Category\StoreCategoryDTO;
use App\Domains\News\Enums\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', Rule::in(Status::values())],
        ];
    }

    /**
     * Convert the request data to a StoreCategoryDTO.
     */
    public function toDTO(): StoreCategoryDTO
    {
        return new StoreCategoryDTO(
            name: $this->input('name'),
            description: $this->input('description'),
            status: Status::from($this->input('status')),
        );
    }
}
