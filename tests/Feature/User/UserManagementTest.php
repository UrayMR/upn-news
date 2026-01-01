<?php

namespace Tests\Feature\Auth;

use App\Domains\User\Enums\UserRole;
use App\Domains\User\Enums\UserStatus;
use App\Domains\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class UserManagementTest extends TestCase
{
  use RefreshDatabase;

  public function test_admin_can_index_users_with_filters()
  {
    $user = User::factory()->create([
      'role' => UserRole::ADMIN->value
    ]);

    User::factory()->count(5)->create();

    $response = $this->actingAs($user)->get(route('users.index'));

    logger()->info($response->json());

    $response->assertOk();
    $response->assertInertia(
      fn(Assert $page) =>
      $page
        ->component('User/Index')
        ->has('users.data', 6)
    );
  }

  public function test_admin_can_store_new_user()
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

  public function test_admin_can_update_new_user()
  {
    Storage::fake('public');

    $user = User::factory()->create([
      'role' => UserRole::ADMIN->value
    ]);

    $createdUser = User::factory()->create([
      'role' => UserRole::WRITER->value,
      'email' => 'newuser@example.com',
    ]);

    $response = $this->actingAs($user)->put(route('users.update', $createdUser->id), [
      'name' => 'New User',
      'email' => 'newuser2@example.com',
      'password' => 'password123',
      'password_confirmation' => 'password123',
      'role' => UserRole::WRITER->value,
      'phone_number' => '081234567890',
      'status' => UserStatus::ACTIVE->value,
      'profile_picture_file' => UploadedFile::fake()->image('profile.jpg'),
    ]);

    $response->assertCreated();

    $this->assertDatabaseHas('users', [
      'email' => 'newuser2@example.com',
    ]);

    $createdUser = User::where('email', 'newuser2@example.com')->first();

    $this->assertTrue(
      Storage::disk('public')->exists($createdUser->profile_picture_path),
      'Profile picture file does not exist in storage.'
    );
  }

  public function test_admin_can_destroy_new_user()
  {
    Storage::fake('public');

    $user = User::factory()->create([
      'role' => UserRole::ADMIN->value
    ]);

    $createdUser = User::factory()->create([
      'role' => UserRole::WRITER->value,
      'email' => 'newuser@example.com',
    ]);

    $createdUserProfilePicturePath = $createdUser->profile_picture_path;

    $response = $this->actingAs($user)->delete(route('users.destroy', $createdUser->id));

    $response->assertNoContent();

    $this->assertDatabaseMissing('users', [
      'email' => 'newuser@example.com',
    ]);

    $this->assertFalse(
      Storage::disk('public')->exists($createdUserProfilePicturePath),
      'Profile picture file still exists in storage after deletion.'
    );
  }
}
