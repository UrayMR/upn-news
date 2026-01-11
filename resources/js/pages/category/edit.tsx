import { BackButton } from '@/components/buttons/back-button';
import { SubmitButton } from '@/components/buttons/submit-button';
import { CategoryFormFields } from '@/components/forms/fields/category-form-fields';
import { MainContent } from '@/components/main-content';
import { useZod } from '@/hooks/use-zod';
import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import { ICategoryEdit, type BreadcrumbItem } from '@/types';
import {
    CategoryFormSchema,
    CategorySchema,
} from '@/validations/category/category-schema';
import { Head, useForm } from '@inertiajs/react';

export default function EditCategoryPage({
    category,
}: {
    category: ICategoryEdit;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Kategori', href: categories.index.url() },
        { title: 'Edit Kategori', href: categories.edit.url(category.id) },
    ];

    const form = useForm<CategoryFormSchema>({
        name: category.name,
        description: category.description ?? '',
        status: category.status,
    });

    const { guard } = useZod<CategoryFormSchema>(CategorySchema);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!guard(form.data, form.setError)) {
            return;
        }

        form.put(categories.update.url(category.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Kategori" />
            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <MainContent.Header
                        title="Edit Kategori"
                        actions={<BackButton href={categories.index.url()} />}
                    />

                    <MainContent.Section>
                        <form onSubmit={handleSubmit}>
                            <CategoryFormFields
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
