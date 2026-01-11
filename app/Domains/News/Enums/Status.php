<?php

namespace App\Domains\News\Enums;

enum Status: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';

    /**
     * Returns an array of all possible statuses.
     */
    public static function values(): array
    {
        return [
            self::ACTIVE->value,
            self::INACTIVE->value,
        ];
    }
}
