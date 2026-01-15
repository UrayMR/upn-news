<?php

namespace Database\Seeders;

use App\Domains\News\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        News::factory(30)->create();
    }
}
