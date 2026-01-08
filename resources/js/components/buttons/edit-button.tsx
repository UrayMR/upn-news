import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface EditButtonProps {
    href: string;
    label?: string;
    disabled?: boolean;
}

export const EditButton = ({
    href,
    label = 'Ubah',
    disabled = false,
}: EditButtonProps) => {
    return (
        <Button variant="default" size="sm" asChild disabled={disabled}>
            <Link href={href} className="flex items-center gap-2">
                {label}
            </Link>
        </Button>
    );
};
