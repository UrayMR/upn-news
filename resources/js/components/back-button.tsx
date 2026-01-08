import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface BackButtonProps {
    href: string;
    title?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
    href,
    title = 'Kembali',
}) => {
    return (
        <Button variant="secondary" asChild>
            <Link href={href}>{title}</Link>
        </Button>
    );
};
