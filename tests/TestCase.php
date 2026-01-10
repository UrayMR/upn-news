<?php

namespace Tests;

use App\Domains\User\Enums\UserRole;
use App\Domains\User\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /**
     * Get all user roles.
     *
     * @return UserRole[]
     */
    protected function roles(): array
    {
        return UserRole::cases();
    }

    /**
     * Get all non-admin user roles.
     *
     * @return UserRole[]
     */
    protected function nonAdminRoles(): array
    {
        return array_filter(
            UserRole::cases(),
            fn (UserRole $role) => $role !== UserRole::ADMIN
        );
    }

    /**
     * Act as a user with the given role.
     *
     * @return self
     */
    protected function actingAsRole(UserRole $role)
    {
        $user = User::factory()->create([
            'role' => $role->value,
        ]);

        return $this->actingAs($user);
    }
}
