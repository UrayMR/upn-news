<?php

namespace Database\Factories;

use App\Domains\News\Enums\NewsStatus;
use App\Domains\News\Models\Category;
use App\Domains\News\Models\News;
use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<News>
 */
class NewsFactory extends Factory
{
    protected $model = News::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'slug' => $this->faker->unique()->slug(),
            'title' => $this->faker->sentence(6, true),
            'content' => $this->faker->paragraphs(3, true),
            'image_path' => $this->faker->optional()->imageUrl(800, 600, 'news'),
            'views' => $this->faker->numberBetween(0, 10000),
            'status' => $this->faker->randomElement(NewsStatus::values()),
            'published_at' => $this->faker->optional()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
