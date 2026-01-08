import { AppProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useFlash = () => {
    const { flash } = usePage<AppProps>().props;

    useEffect(() => {
        if (!flash?.message) return;

        const type = flash.type;

        toast[type](flash.message);
    }, [flash]);
};
