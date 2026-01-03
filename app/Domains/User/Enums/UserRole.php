<?php

namespace App\Domains\User\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case EDITOR = 'editor';
    case WRITER = 'writer';

    /**
     * Returns an array of roles that can be assigned by an admin user.
     */
    public static function creatableByAdmin(): array
    {
        return [
            self::ADMIN,
            self::WRITER,
        ];
    }

    /*
     * Returns an array of values of roles that can be assigned by an admin user.
     */
    public static function creatableByAdminValues(): array
    {
        return array_map(
            fn (self $role) => $role->value,
            self::creatableByAdmin()
        );
    }
}
