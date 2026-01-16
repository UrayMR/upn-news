import { BackButton } from '@/components/buttons/back-button';
import { SubmitButton } from '@/components/buttons/submit-button';
import { UserFormFields } from '@/components/forms/fields/user-form-fields';
import { MainContent } from '@/components/main-content';
import { useZod } from '@/hooks/use-zod';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import { AppProps, IUserEdit, type BreadcrumbItem } from '@/types';
import {
    EditUserFormSchema,
    EditUserSchema,
} from '@/validations/user/edit-user-schema';
import { Head, useForm } from '@inertiajs/react';

interface EditUserPageProps {
    user: IUserEdit;
}

export default function EditUserPage({ payload }: AppProps<EditUserPageProps>) {
    const { user } = payload;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengguna', href: users.index.url() },
        { title: 'Edit Pengguna', href: users.edit.url(user.id) },
    ];

    const form = useForm<EditUserFormSchema>({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number ?? null,
        role: user.role,
        status: user.status,
        password: undefined,
        password_confirmation: undefined,
        profile_picture_file: null,
        profile_picture_path: user.profile_picture_path ?? null,
    });

    const { guard } = useZod<EditUserFormSchema>(EditUserSchema);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!guard(form.data, form.setError)) {
            return;
        }

        form.put(users.update.url(user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Pengguna" />
            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <MainContent.Header
                        title="Edit Pengguna"
                        actions={<BackButton href={users.index.url()} />}
                    />

                    <MainContent.Section>
                        <form onSubmit={handleSubmit}>
                            <UserFormFields
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
