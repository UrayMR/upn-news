import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Option } from '@/types';

type ComboboxSelectProps = {
    items: Option[];
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
};

export function ComboboxSelect({
    items,
    value,
    onChange,
    placeholder = 'Select...',
    className,
    disabled = false,
    required = false,
}: ComboboxSelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const selected = useMemo(
        () => items.find((item) => item.value === value) ?? null,
        [items, value],
    );

    const filteredItems = useMemo(() => {
        if (!search) return items;

        const keyword = search.toLowerCase();
        return items.filter((item) =>
            item.label.toLowerCase().includes(keyword),
        );
    }, [items, search]);

    return (
        <div className="relative w-full">
            <Popover
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) setSearch('');
                }}
            >
                <PopoverTrigger asChild>
                    <div className="relative w-full">
                        <Input
                            readOnly
                            disabled={disabled}
                            value={selected?.label ?? ''}
                            placeholder={placeholder}
                            title={selected?.label ?? placeholder}
                            aria-required={required}
                            onClick={() => !disabled && setOpen((o) => !o)}
                            className={cn(
                                'cursor-pointer truncate',
                                disabled && 'cursor-not-allowed opacity-50',
                                className,
                            )}
                        />
                        {!disabled && (
                            <ChevronsUpDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 opacity-50" />
                        )}
                    </div>
                </PopoverTrigger>

                {!disabled && (
                    <PopoverContent
                        className="min-w-(--radix-popover-trigger-width) p-0"
                        align="start"
                        sideOffset={4}
                    >
                        <Command>
                            <CommandInput
                                placeholder="Cari..."
                                value={search}
                                onValueChange={setSearch}
                            />
                            <CommandEmpty>Tidak ada hasil.</CommandEmpty>

                            <CommandGroup className="max-h-60 overflow-y-auto">
                                {filteredItems.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={() => {
                                            onChange(item.value);
                                            setOpen(false);
                                            setSearch('');
                                        }}
                                        className="flex items-center"
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                item.value === value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                        {item.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                )}
            </Popover>
        </div>
    );
}
