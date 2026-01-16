<?php

namespace App\Shared\DTOs;

class OptionDTO
{
    public function __construct(
        public readonly string $label,
        public readonly string $value,
    ) {}

    public static function from(
        string $label,
        int|string $value
    ): self {
        return new self(
            label: $label,
            value: (string) $value,
        );
    }

    public function toArray(): array
    {
        return [
            'label' => $this->label,
            'value' => $this->value,
        ];
    }
}
