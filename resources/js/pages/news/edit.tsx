import { BackButton } from '@/components/buttons/back-button';
import { SubmitButton } from '@/components/buttons/submit-button';
import { NewsFormFields } from '@/components/forms/fields/news-form-fields';
import { MainContent } from '@/components/main-content';
import { useZod } from '@/hooks/use-zod';
import AppLayout from '@/layouts/app-layout';
import * as NewsRoutes from '@/routes/news';
import { AppProps, INewsEdit, type BreadcrumbItem } from '@/types';
import { NewsFormSchema, NewsSchema } from '@/validations/news/news-schema';
import { Head, useForm } from '@inertiajs/react';

interface EditNewsPageProps {
    news: INewsEdit;
}

export default function EditNewsPage({ payload }: AppProps<EditNewsPageProps>) {
    const { news } = payload;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Berita', href: NewsRoutes.index.url() },
        { title: 'Edit Berita', href: NewsRoutes.edit.url(news.slug) },
    ];

    const form = useForm<NewsFormSchema>({
        category_id: news.category.id,
        title: news.title,
        content: news.content,
        status: news.status,
        image_file: null,
        image_path: news.image_path ?? '',
    });

    const { guard } = useZod<NewsFormSchema>(NewsSchema);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!guard(form.data, form.setError)) {
            return;
        }

        form.put(NewsRoutes.update.url(news.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Berita" />
            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <MainContent.Header
                        title="Edit Berita"
                        actions={<BackButton href={NewsRoutes.index.url()} />}
                    />

                    <MainContent.Section>
                        <form onSubmit={handleSubmit}>
                            <NewsFormFields
                                mode="edit"
                                data={form.data}
                                errors={form.errors}
                                onChange={form.setData}
                            />

                            <div className="mt-4 flex justify-end">
                                <SubmitButton loading={form.processing} />
                            </div>
                        </form>
                    </MainContent.Section>
                </MainContent>
            </div>
        </AppLayout>
    );
}
