import { BackButton } from '@/components/buttons/back-button';
import { SubmitButton } from '@/components/buttons/submit-button';
import { CategoryFormFields } from '@/components/forms/fields/category-form-fields';
import { MainContent } from '@/components/main-content';
import { useZod } from '@/hooks/use-zod';
import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import { Status, type BreadcrumbItem } from '@/types';
import {
    CategoryFormSchema,
    CategorySchema,
} from '@/validations/category/category-schema';
import { Head, useForm } from '@inertiajs/react';

export default function CreateCategoryPage() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Kategori', href: categories.index.url() },
        { title: 'Tambah Kategori', href: categories.create.url() },
    ];

    const form = useForm<CategoryFormSchema>({
        name: '',
        description: '',
        status: Status.Active.value,
    });

    const { guard } = useZod<CategoryFormSchema>(CategorySchema);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!guard(form.data, form.setError)) {
            return;
        }

        form.post(categories.store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Kategori Baru" />
            <MainContent>
                <MainContent.Header
                    title="Tambah Kategori Baru"
                    actions={<BackButton href={categories.index.url()} />}
                />

                <MainContent.Section>
                    <form onSubmit={handleSubmit}>
                        <CategoryFormFields
                            mode="create"
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
        </AppLayout>
    );
}
