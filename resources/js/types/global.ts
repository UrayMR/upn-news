export interface SearchParams {
    search?: string;
    filterKey?: string;
    filterValue?: string | number | null;
}

export interface Option {
    id: number;
    name: string;
}
