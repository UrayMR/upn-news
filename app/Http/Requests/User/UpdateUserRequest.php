<?php

namespace App\Http\Requests\User;

use App\Domains\User\DTOs\UpdateUserDTO;
use App\Domains\User\Enums\UserRole;
use App\Domains\User\Enums\UserStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      'password' => ['nullable', 'string', 'min:8', 'confirmed'],
      'role' => ['required', 'string', Rule::in(UserRole::creatableByAdminValues())],
      'phone_number' => ['nullable', 'string', 'max:20'],
      'profile_picture_file' => ['nullable', 'image', 'max:2048'],
      'status' => ['required', 'string', Rule::in(UserStatus::values())],
    ];
  }

  /**
   * Convert the request data to a CreateUserDTO.
   */
  public function toDTO(): UpdateUserDTO
  {
    return new UpdateUserDTO(
      name: $this->input('name'),
      email: $this->input('email'),
      password: $this->input('password'),
      role: UserRole::from($this->input('role')),
      phone_number: $this->input('phone_number'),
      profile_picture_file: $this->file('profile_picture_file'),
      status: UserStatus::from($this->input('status')),
    );
  }
}
