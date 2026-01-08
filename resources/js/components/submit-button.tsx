import { Button } from '@/components/ui/button';
import { Spinner } from './ui/spinner';

interface SubmitButtonProps {
    loading?: boolean;
    label?: string;
    loadingLabel?: string;
    disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    loading = false,
    label = 'Simpan',
    loadingLabel = 'Menyimpan...',
    disabled,
}) => {
    return (
        <Button type="submit" disabled={loading || disabled}>
            {loading ? (
                <>
                    <Spinner className="mr-2" />
                    {loadingLabel}
                </>
            ) : (
                label
            )}
        </Button>
    );
};
