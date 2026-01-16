import { BackButton } from '@/components/buttons/back-button';
import { CategoryFormFields } from '@/components/forms/fields/category-form-fields';
import { MainContent } from '@/components/main-content';
import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import {
    AppProps,
    ICategoryShow,
    StatusValue,
    type BreadcrumbItem,
} from '@/types';
import { Head } from '@inertiajs/react';

interface ShowUserForm {
    name: string;
    description?: string | null;
    slug: string;
    status: StatusValue;
    updated_at: string;
    created_at: string;
}

interface ShowCategoryPageProps {
    category: ICategoryShow;
}

export default function ShowCategoryPage({
    payload,
}: AppProps<ShowCategoryPageProps>) {
    const { category } = payload;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Kategori', href: categories.index.url() },
        { title: 'Detail Kategori', href: categories.show.url(category.slug) },
    ];

    const data: ShowUserForm = {
        name: category.name,
        description: category.description ?? null,
        slug: category.slug,
        status: category.status,
        updated_at: category.updated_at,
        created_at: category.created_at,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Kategori" />
            <MainContent>
                <MainContent.Header
                    title="Detail Kategori"
                    actions={<BackButton href={categories.index.url()} />}
                />
                <MainContent.Section>
                    <CategoryFormFields
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
