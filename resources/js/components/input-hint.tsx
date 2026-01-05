import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export default function InputHint({
    hint,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { hint?: string }) {
    return hint ? (
        <p
            {...props}
            className={cn('text-xs text-muted-foreground', className)}
        >
            {hint}
        </p>
    ) : null;
}
