import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface ShowButtonProps {
    href: string;
    label?: string;
    disabled?: boolean;
}

export const ShowButton = ({
    href,
    label = 'Lihat',
    disabled = false,
}: ShowButtonProps) => {
    return (
        <Button variant="outline" size="sm" asChild>
            <Link href={href} disabled={disabled}>
                {label}
            </Link>
        </Button>
    );
};
