import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { storageUrl } from '@/utils/storage';
import { useEffect, useMemo } from 'react';

interface PreviewProfilePictureProps {
    name: string;
    profilePictureFile?: File | null;
    profilePicturePath?: string | null;
}

export const PreviewProfilePicture = ({
    name,
    profilePictureFile,
    profilePicturePath,
}: PreviewProfilePictureProps) => {
    const getInitials = useInitials();

    const previewUrl = useMemo(() => {
        if (profilePictureFile instanceof File) {
            return URL.createObjectURL(profilePictureFile);
        }
        if (profilePicturePath) {
            return storageUrl(profilePicturePath);
        }
        return undefined;
    }, [profilePictureFile, profilePicturePath]);

    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div className="my-3">
            <Avatar className="h-20 w-20 overflow-hidden rounded-full">
                <AvatarImage
                    src={previewUrl}
                    alt="Foto Profil"
                    className="object-cover"
                    loading="lazy"
                />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(name)}
                </AvatarFallback>
            </Avatar>
        </div>
    );
};
