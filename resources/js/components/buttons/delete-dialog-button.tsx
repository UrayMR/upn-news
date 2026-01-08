import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface ConfirmDeleteDialogProps {
    url: string;
    title?: string;
    description?: string;
    disabled?: boolean;
}

export const DeleteDialogButton = ({
    url,
    title = 'Hapus Data?',
    description = 'Data ini akan dihapus secara permanen dan tidak dapat dikembalikan.',
    disabled = false,
}: ConfirmDeleteDialogProps) => {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        setProcessing(true);

        router.delete(url, {
            onFinish: () => {
                setProcessing(false);
                setOpen(false);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild disabled={disabled}>
                <Button variant="destructive" size="sm" disabled={disabled}>
                    Hapus
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>
                        Batal
                    </AlertDialogCancel>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <Spinner className="mr-2" />
                                Menghapus
                            </>
                        ) : (
                            'Hapus'
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
