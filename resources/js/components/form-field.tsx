import InputError from './input-error';
import { Label } from './ui/label';

type FormFieldProps = {
    name: string;
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
};

export function FormField({
    name,
    label,
    error,
    required,
    children,
}: FormFieldProps) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor={name}>
                {label}
                {required && <span className="text-destructive"> *</span>}
            </Label>

            {children}

            <InputError message={error} />
        </div>
    );
}
