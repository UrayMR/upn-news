import '@tanstack/react-table';

declare module '@tanstack/react-table' {
    interface TableMeta<> {
        current_page: number;
        per_page: number;
        total: number;
    }
}
