import { BackButton } from '@/components/buttons/back-button';
import { NewsFormFields } from '@/components/forms/fields/news-form-fields';
import { MainContent } from '@/components/main-content';
import AppLayout from '@/layouts/app-layout';
import * as NewsRoutes from '@/routes/news';
import {
    AppProps,
    INewsShow,
    NewsStatusValue,
    type BreadcrumbItem,
} from '@/types';
import { Head } from '@inertiajs/react';

interface ShowNewsForm {
    author_name: string;
    category_id: string;
    category_name: string;
    title: string;
    content: string;
    status: NewsStatusValue;
    image_path?: string | null;
    published_at?: string | null;
    updated_at: string;
    created_at: string;
}

interface ShowNewsPageProps {
    news: INewsShow;
}

export default function ShowNewsPage({ payload }: AppProps<ShowNewsPageProps>) {
    const { news } = payload;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Berita', href: NewsRoutes.index.url() },
        { title: 'Detail Berita', href: NewsRoutes.show.url(news.id) },
    ];

    const data: ShowNewsForm = {
        author_name: news.author.name,
        category_id: news.category.id,
        category_name: news.category.name,
        title: news.title,
        content: news.content,
        status: news.status,
        image_path: news.image_path ?? null,
        published_at: news.published_at ?? null,
        updated_at: news.updated_at,
        created_at: news.created_at,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Berita" />
            <MainContent>
                <MainContent.Header
                    title="Detail Berita"
                    actions={<BackButton href={NewsRoutes.index.url()} />}
                />
                <MainContent.Section>
                    <NewsFormFields
                        mode="show"
                        data={data}
                        errors={{}}
                        onChange={() => {}}
                    />
                </MainContent.Section>
            </MainContent>
        </AppLayout>
    );
}
