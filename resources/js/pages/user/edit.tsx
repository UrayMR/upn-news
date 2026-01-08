import { BackButton } from '@/components/buttons/back-button';
import { SubmitButton } from '@/components/buttons/submit-button';
import { UserFormFields } from '@/components/forms/fields/user-form-fields';
import { MainContent } from '@/components/main-content';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import {
    IUserEdit,
    StatusValue,
    UserRoleValue,
    type BreadcrumbItem,
} from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface EditUserForm {
    name: string;
    email: string;
    phone_number?: string;
    role: UserRoleValue;
    status: StatusValue;
    password?: string;
    password_confirmation?: string;
    profile_picture_file?: File | null;
    profile_picture_path?: string;
}

export default function EditUserPage({ user }: { user: IUserEdit }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengguna', href: users.index.url() },
        { title: 'Edit Pengguna', href: users.edit.url(user.id) },
    ];

    const form = useForm<EditUserForm>({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        status: user.status,
        password: undefined,
        password_confirmation: undefined,
        profile_picture_file: null,
        profile_picture_path: user.profile_picture_path ?? '',
    });

    // const { validate } = useZod(UserSchema);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
