<?php

namespace Tests\Feature\User;

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

    public function test_non_admin_cannot_access_user_management_routes()
    {
        foreach ($this->nonAdminRoles() as $role) {
            $response = $this->actingAsRole($role)->get(route('users.index'));

            $response->assertForbidden();
        }
    }

    public function test_admin_can_view_user_index()
    {
        $response = $this->actingAsRole(UserRole::ADMIN)->get(route('users.index'));

        $response->assertOk();
    }

    public function test_admin_can_view_create_user_form()
    {
        $response = $this->actingAsRole(UserRole::ADMIN)->get(route('users.create'));

        $response->assertOk();
    }

    public function test_admin_can_store_new_user()
    {
        Storage::fake('public');

        $response = $this->actingAsRole(UserRole::ADMIN)->post(route('users.store'), [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => UserRole::WRITER->value,
            'phone_number' => '081234567890',
            'status' => UserStatus::ACTIVE->value,
            'profile_picture_file' => UploadedFile::fake()->image('profile.jpg'),
        ]);

        $response->assertRedirect(route('users.index'));

        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com',
        ]);

        $createdUser = User::where('email', 'newuser@example.com')->first();

        $this->assertTrue(
            Storage::disk('public')->exists($createdUser->profile_picture_path),
            'Profile picture file does not exist in storage.'
        );
    }

    public function test_admin_can_view_user_show()
    {
        $createdUser = User::factory()->create([
            'role' => UserRole::WRITER->value,
            'email' => 'newuser@example.com',
        ]);

        $response = $this->actingAsRole(UserRole::ADMIN)->get(route('users.show', $createdUser->id));

        $response->assertOk();
    }

    public function test_admin_can_view_edit_user_form()
    {
        $createdUser = User::factory()->create([
            'role' => UserRole::WRITER->value,
            'email' => 'newuser@example.com',
        ]);

        $response = $this->actingAsRole(UserRole::ADMIN)->get(route('users.edit', $createdUser->id));

        $response->assertOk();
    }

    public function test_admin_can_update_user()
    {
        Storage::fake('public');

        $createdUser = User::factory()->create([
            'role' => UserRole::WRITER->value,
            'email' => 'newuser@example.com',
        ]);

        $response = $this->actingAsRole(UserRole::ADMIN)->put(route('users.update', $createdUser->id), [
            'name' => 'New User',
            'email' => 'newuser2@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => UserRole::WRITER->value,
            'phone_number' => '081234567890',
            'status' => UserStatus::ACTIVE->value,
            'profile_picture_file' => UploadedFile::fake()->image('profile.jpg'),
        ]);

        $response->assertRedirect(route('users.index'));

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

        $createdUser = User::factory()->create([
            'role' => UserRole::WRITER->value,
            'email' => 'newuser@example.com',
        ]);

        $createdUserProfilePicturePath = $createdUser->profile_picture_path;

        $response = $this->actingAsRole(UserRole::ADMIN)->delete(route('users.destroy', $createdUser->id));

        $response->assertRedirect(route('users.index'));

        $this->assertDatabaseMissing('users', [
            'email' => 'newuser@example.com',
        ]);

        $this->assertFalse(
            Storage::disk('public')->exists($createdUserProfilePicturePath),
            'Profile picture file still exists in storage after deletion.'
        );
    }
}
