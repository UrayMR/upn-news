import { BackButton } from '@/components/buttons/back-button';
import { SubmitButton } from '@/components/buttons/submit-button';
import { UserFormFields } from '@/components/forms/fields/user-form-fields';
import { MainContent } from '@/components/main-content';
import { useZod } from '@/hooks/use-zod';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import { Status, UserRole, type BreadcrumbItem } from '@/types';
import {
    CreateUserFormSchema,
    CreateUserSchema,
} from '@/validations/user/create-user-schema';
import { Head, useForm } from '@inertiajs/react';

export default function CreateUserPage() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengguna', href: users.index.url() },
        { title: 'Tambah Pengguna', href: users.create.url() },
    ];

    const form = useForm<CreateUserFormSchema>({
        name: '',
        email: '',
        phone_number: '',
        role: UserRole.Writer.value,
        status: Status.Active.value,
        profile_picture_file: null,
        password: '',
        password_confirmation: '',
    });

    const { guard } = useZod<CreateUserFormSchema>(CreateUserSchema);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!guard(form.data, form.setError)) {
            return;
        }

        form.post(users.store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pengguna Baru" />
            <MainContent>
                <MainContent.Header
                    title="Tambah Pengguna Baru"
                    actions={<BackButton href={users.index.url()} />}
                />

                <MainContent.Section>
                    <form onSubmit={handleSubmit}>
                        <UserFormFields
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
