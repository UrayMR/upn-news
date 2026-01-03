import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MainContentProps {
    children: ReactNode;
    className?: string;
}

function MainContent({ children, className }: MainContentProps) {
    return (
        <div className={cn(className, 'flex flex-col gap-4 p-4')}>
            {children}
        </div>
    );
}

export default MainContent;
