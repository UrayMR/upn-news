<?php

namespace Database\Seeders;

use App\Domains\User\Enums\UserRole;
use App\Domains\User\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'role' => UserRole::ADMIN->value,
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        User::factory(30)->create();
    }
}
