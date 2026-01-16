import { BackButton } from '@/components/buttons/back-button';
import { SubmitButton } from '@/components/buttons/submit-button';
import { NewsFormFields } from '@/components/forms/fields/news-form-fields';
import { MainContent } from '@/components/main-content';
import { useZod } from '@/hooks/use-zod';
import AppLayout from '@/layouts/app-layout';
import news from '@/routes/news';
import { AppProps, NewsStatus, Option, type BreadcrumbItem } from '@/types';
import { NewsFormSchema, NewsSchema } from '@/validations/news/news-schema';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function CreateNewsPage() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Berita', href: news.index.url() },
        { title: 'Tambah Berita', href: news.create.url() },
    ];

    const { payload } = usePage<AppProps>().props;

    const categoryOptions = payload.categoryOptions as Option[];

    const form = useForm<NewsFormSchema>({
        category_id: '',
        title: '',
        content: '',
        image_file: null,
        status: NewsStatus.Draft.value,
    });

    const { guard } = useZod<NewsFormSchema>(NewsSchema);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!guard(form.data, form.setError)) {
            return;
        }

        form.post(news.store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Berita Baru" />
            <MainContent>
                <MainContent.Header
                    title="Tambah Berita Baru"
                    actions={<BackButton href={news.index.url()} />}
                />

                <MainContent.Section>
                    <form onSubmit={handleSubmit}>
                        <NewsFormFields
                            mode="create"
                            data={form.data}
                            errors={form.errors}
                            onChange={form.setData}
                            options={{ categoryOptions }}
                        />

                        <div className="mt-4 flex justify-end">
                            <SubmitButton loading={form.processing} />
                        </div>
                    </form>
                </MainContent.Section>
            </MainContent>
        </AppLayout>
    );
}
