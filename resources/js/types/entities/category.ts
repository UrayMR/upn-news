import { StatusValue } from '../enums/status';

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    status: StatusValue;
    created_at: string;
    updated_at: string;
}

export interface ICategoryIndex {
    id: string;
    name: string;
    slug: string;
    description?: string;
    status: StatusValue;
}

export interface ICategoryShow extends ICategoryIndex {
    slug: string;
    updated_at: string;
    created_at: string;
}

export interface ICategoryEdit extends ICategoryIndex {
    updated_at: string;
    created_at: string;
}
