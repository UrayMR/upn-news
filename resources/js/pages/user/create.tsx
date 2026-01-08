import { BackButton } from '@/components/back-button';
import { UserFormFields } from '@/components/forms/fields/user-form-fields';
import { MainContent } from '@/components/main-content';
import { SubmitButton } from '@/components/submit-button';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import {
    Status,
    StatusValue,
    UserRole,
    UserRoleValue,
    type BreadcrumbItem,
} from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface CreateUserForm {
    name: string;
    email: string;
    phone_number?: string;
    role: UserRoleValue;
    status: StatusValue;
    password: string;
    password_confirmation: string;
    profile_picture_file?: File | null;
}

export default function CreateUserPage() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengguna', href: users.index.url() },
        { title: 'Tambah Pengguna', href: users.create.url() },
    ];

    const form = useForm<CreateUserForm>({
        name: '',
        email: '',
        phone_number: '',
        role: UserRole.Writer.value,
        status: Status.Active.value,
        profile_picture_file: null,
        password: '',
        password_confirmation: '',
    });

    // const { validate } = useZod(UserSchema);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
