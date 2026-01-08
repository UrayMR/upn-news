import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface BackButtonProps {
    href: string;
    title?: string;
}

export const BackButton = ({ href, title = 'Kembali' }: BackButtonProps) => {
    return (
        <Button variant="secondary" asChild>
            <Link href={href}>{title}</Link>
        </Button>
    );
};
