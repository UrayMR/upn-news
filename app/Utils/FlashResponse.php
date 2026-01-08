<?php

namespace App\Utils;

class FlashResponse
{
    protected static function make(string $type, string $message): array
    {
        return [
            'flash' => [
                'type' => $type,
                'message' => $message,
            ],
        ];
    }

    public static function success(string $message): array
    {
        return static::make('success', $message);
    }

    public static function error(string $message): array
    {
        return static::make('error', $message);
    }

    public static function info(string $message): array
    {
        return static::make('info', $message);
    }

    public static function warning(string $message): array
    {
        return static::make('warning', $message);
    }
}
