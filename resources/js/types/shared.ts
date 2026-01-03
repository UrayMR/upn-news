import type { Auth } from './auth';

export interface SharedData {
    name: string;
    quote: {
        message: string;
        author: string;
    };
    auth: Auth;
    sidebarOpen: boolean;
    flashMessage?: FlashMessage;
}

export interface FlashMessage {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
}
