import { NewsStatusValue } from '../enums/news-status';

export interface News {
    id: string;
    category: string;
    author: string;
    title: string;
    content: string;
    image_path?: string;
    status: NewsStatusValue;
    views: number;
    slug: string;
    created_at: string;
    updated_at: string;
    published_at: string | null;
}

export interface INewsIndex {
    id: string;
    category: string;
    author: string;
    title: string;
    slug: string;
    status: NewsStatusValue;
    published_at: string | null;
}

export interface INewsShow extends INewsIndex {
    content: string;
    image_path?: string;
    views: number;
    created_at: string;
    updated_at: string;
}

export interface INewsEdit extends INewsIndex {
    content: string;
    image_path?: string;
}
