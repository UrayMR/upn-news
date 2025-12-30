<?php

namespace Tests\Feature\Auth;

use App\Domains\User\Enums\UserRole;
use App\Domains\User\Enums\UserStatus;
use App\Domains\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
  use RefreshDatabase;

  public function test_admin_can_create_new_user()
  {
    Storage::fake('public');

    $user = User::factory()->create([
      'role' => UserRole::ADMIN->value
    ]);

    $response = $this->actingAs($user)->post(route('users.store'), [
      'name' => 'New User',
      'email' => 'newuser@example.com',
      'password' => 'password123',
      'password_confirmation' => 'password123',
      'role' => UserRole::WRITER->value,
      'phone_number' => '081234567890',
      'status' => UserStatus::ACTIVE->value,
      'profile_picture_file' => UploadedFile::fake()->image('profile.jpg'),
    ]);

    $response->assertCreated();

    $this->assertDatabaseHas('users', [
      'email' => 'newuser@example.com',
    ]);

    $createdUser = User::where('email', 'newuser@example.com')->first();

    $this->assertTrue(
      Storage::disk('public')->exists($createdUser->profile_picture_path),
      'Profile picture file does not exist in storage.'
    );
  }
}
