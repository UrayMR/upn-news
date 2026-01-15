import { storageUrl } from '@/utils/storage';
import { useEffect, useMemo } from 'react';

interface PreviewImageProps {
    imageFile?: File | null;
    imagePath?: string | null;
}

export const PreviewImage = ({ imageFile, imagePath }: PreviewImageProps) => {
    const previewUrl = useMemo(() => {
        if (imageFile instanceof File) {
            return URL.createObjectURL(imageFile);
        }
        if (imagePath) {
            return storageUrl(imagePath);
        }
        return undefined;
    }, [imageFile, imagePath]);

    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div className="my-3">
            <img
                src={previewUrl}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-md"
            />
        </div>
    );
};
