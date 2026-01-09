import { AppProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

/**
 * A hook to display flash messages using sonner toast notifications.
 * It listens for flash messages in the Inertia page props and shows them as toast notifications.
 *
 * @returns void
 */
export const useFlash = () => {
    // Get flash messages from Inertia page props
    const { flash } = usePage<AppProps>().props;

    // Show toast notification when flash message changes
    useEffect(() => {
        if (!flash?.message) return;

        // Display the toast notification based on the flash type
        toast[flash.type](flash.message);
    }, [flash]);
};
