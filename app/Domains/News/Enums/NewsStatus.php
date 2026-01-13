<?php

namespace App\Domains\News\Enums;

enum NewsStatus: string
{
    case PUBLISHED = 'published';
    case INACTIVE = 'inactive';
    case DRAFT = 'draft';

    /**
     * Returns an array of all possible statuses.
     */
    public static function values(): array
    {
        return [
            self::PUBLISHED->value,
            self::INACTIVE->value,
            self::DRAFT->value,
        ];
    }
}
