export interface SearchParams {
    search?: string;
    filterKey?: string;
    filterValue?: string | number | null;
}

export interface Option {
    label: string;
    value: string;
}

export interface Relations {
    id: string;
    name: string;
}
