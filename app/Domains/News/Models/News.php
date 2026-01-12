<?php

namespace App\Domains\News\Models;

use App\Domains\News\Enums\Status;
use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    /** @use HasFactory<\Database\Factories\NewsFactory> */
    use HasFactory, HasUuids;

    /**
     * The factory class for the model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Factories\Factory>
     */
    protected static $factory = \Database\Factories\NewsFactory::class;

    /**
     * Get the route key name for Laravel route model binding.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'slug',
        'title',
        'content',
        'image_path',
        'views',
        'status',
        'published_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'user_id' => 'string',
            'category_id' => 'string',
            'status' => Status::class,
            'published_at' => 'datetime',
            'views' => 'integer',
        ];
    }

    /**
     * Get the user that owns the news article.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that the news article belongs to.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
