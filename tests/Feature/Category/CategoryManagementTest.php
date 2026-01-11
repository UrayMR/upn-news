<?php

namespace Tests\Feature\Category;

use App\Domains\News\Models\Category;
use App\Domains\User\Enums\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_cannot_access_category_management_routes()
    {
        foreach ($this->nonAdminRoles() as $role) {
            $response = $this->actingAsRole($role)->get(route('categories.index'));

            $response->assertForbidden();
        }
    }

    public function test_admin_can_view_category_index()
    {
        $response = $this->actingAsRole(UserRole::ADMIN)->get(route('categories.index'));
        $response->assertOk();
    }

    public function test_admin_can_view_create_category_form()
    {
        $response = $this->actingAsRole(UserRole::ADMIN)->get(route('categories.create'));

        $response->assertOk();
    }

    public function test_admin_can_store_new_category()
    {
        $response = $this->actingAsRole(UserRole::ADMIN)->post(route('categories.store'), [
            'name' => 'New Category',
            'description' => 'New Category Description',
            'status' => 'active',
        ]);

        $response->assertRedirect(route('categories.index'));

        $this->assertDatabaseHas('categories', [
            'name' => 'New Category',
        ]);
    }

    public function test_admin_can_view_category_show()
    {
        $actorRole = $this->actingAsRole(UserRole::ADMIN);

        $actorRole->post(route('categories.store'), [
            'name' => 'New Category',
            'description' => 'New Category Description',
            'status' => 'active',
        ]);

        $createdCategory = Category::where('name', 'New Category')->first();

        $response = $actorRole->get(route('categories.show', $createdCategory->slug));

        $response->assertOk();
    }

    public function test_admin_can_view_edit_category_form()
    {
        $actorRole = $this->actingAsRole(UserRole::ADMIN);

        $actorRole->post(route('categories.store'), [
            'name' => 'New Category',
            'description' => 'New Category Description',
            'status' => 'active',
        ]);

        $createdCategory = Category::where('name', 'New Category')->first();

        $response = $actorRole->get(route('categories.edit', $createdCategory->slug));

        $response->assertOk();
    }

    public function test_admin_can_update_category()
    {
        $actorRole = $this->actingAsRole(UserRole::ADMIN);

        $actorRole->post(route('categories.store'), [
            'name' => 'New Category',
            'description' => 'New Category Description',
            'status' => 'active',
        ]);

        $createdCategory = Category::where('name', 'New Category')->first();

        $response = $actorRole->put(route('categories.update', $createdCategory->slug), [
            'name' => 'Updated Category',
            'description' => 'Updated Category Description',
            'status' => 'inactive',
        ]);

        $response->assertRedirect(route('categories.index'));

        $this->assertDatabaseHas('categories', [
            'name' => 'Updated Category',
            'description' => 'Updated Category Description',
            'status' => 'inactive',
        ]);
    }

    public function test_admin_can_destroy_new_category()
    {
        $actorRole = $this->actingAsRole(UserRole::ADMIN);

        $actorRole->post(route('categories.store'), [
            'name' => 'New Category',
            'description' => 'New Category Description',
            'status' => 'active',
        ]);
        $createdCategory = Category::where('name', 'New Category')->first();

        $response = $actorRole->delete(route('categories.destroy', $createdCategory->slug));

        $response->assertRedirect(route('categories.index'));

        $this->assertDatabaseMissing('categories', [
            'name' => 'New Category',
        ]);
    }
}
