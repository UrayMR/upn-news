import type { SharedData } from './shared';

export interface AppProps<T = Record<string, unknown>> extends SharedData {
    payload: T;
    [key: string]: unknown;
}
