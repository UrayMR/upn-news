<?php

namespace Tests\Feature\News;

use App\Domains\News\Models\News;
use App\Domains\User\Enums\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_cannot_access_news_management_routes()
    {
        foreach ($this->nonAdminRoles() as $role) {
            $news = News::factory()->create();
            $routes = [
                route('news.index'),
                route('news.create'),
                route('news.store'),
                route('news.show', $news->slug),
                route('news.edit', $news->slug),
                route('news.update', $news->slug),
                route('news.destroy', $news->slug),
            ];
            foreach ($routes as $route) {
                $response = $this->actingAsRole($role)->get($route);
                $response->assertForbidden();
            }
        }
    }

    public function test_admin_can_view_news_index()
    {
        $response = $this->actingAsRole(UserRole::ADMIN)->get(route('news.index'));
        $response->assertOk();
    }

    public function test_admin_can_view_create_news_form()
    {
        $response = $this->actingAsRole(UserRole::ADMIN)->get(route('news.create'));
        $response->assertOk();
    }

    public function test_admin_can_view_news_show()
    {
        $news = News::factory()->create([
            'slug' => 'new-news',
        ]);
        $response = $this->actingAsRole(UserRole::ADMIN)->get(route('news.show', $news->slug));
        $response->assertOk();
    }

    public function test_admin_can_view_edit_news_form()
    {
        $news = News::factory()->create([
            'slug' => 'new-news',
        ]);
        $response = $this->actingAsRole(UserRole::ADMIN)->get(route('news.edit', $news->slug));
        $response->assertOk();
    }
}
