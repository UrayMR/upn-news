import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import React, { useEffect, useMemo } from 'react';

interface PreviewProfilePictureProps {
    name: string;
    profilePictureFile?: File | null;
    profilePicturePath?: string;
    createMode?: boolean;
}

export const PreviewProfilePicture: React.FC<PreviewProfilePictureProps> = ({
    name,
    profilePictureFile,
    profilePicturePath,
    createMode = false,
}) => {
    const getInitials = useInitials();

    const previewUrl = useMemo(() => {
        if (profilePictureFile instanceof File) {
            return URL.createObjectURL(profilePictureFile);
        }
        if (!createMode && profilePicturePath) {
            return profilePicturePath;
        }
        return null;
    }, [profilePictureFile, profilePicturePath, createMode]);

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
                    src={previewUrl ?? undefined}
                    alt="Foto Profil"
                    className="object-cover"
                />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(name)}
                </AvatarFallback>
            </Avatar>
        </div>
    );
};
