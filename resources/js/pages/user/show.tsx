import { BackButton } from '@/components/back-button';
import { UserFormFields } from '@/components/forms/fields/user-form-fields';
import { MainContent } from '@/components/main-content';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import {
    IUserShow,
    StatusValue,
    UserRoleValue,
    type BreadcrumbItem,
} from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface ShowUserForm {
    name: string;
    email: string;
    phone_number?: string;
    role: UserRoleValue;
    status: StatusValue;
    profile_picture_path?: string;
    email_verified_at?: string;
    updated_at: string;
    created_at: string;
}

export default function ShowUserPage({ user }: { user: IUserShow }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengguna', href: users.index.url() },
        { title: 'Detail Pengguna', href: users.show.url(user.id) },
    ];

    const form = useForm<ShowUserForm>({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number ?? '',
        role: user.role,
        status: user.status,
        profile_picture_path: user.profile_picture_path ?? '',
        email_verified_at: user.email_verified_at ?? '',
        updated_at: user.updated_at,
        created_at: user.created_at,
    });

    // const { validate } = useZod(UserSchema);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Pengguna" />
            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <MainContent.Header
                        title="Detail Pengguna"
                        actions={<BackButton href={users.index.url()} />}
                    />
                    <MainContent.Section>
                        <form>
                            <UserFormFields
                                mode="show"
                                data={form.data}
                                errors={form.errors}
                                onChange={form.setData}
                            />
                        </form>
                    </MainContent.Section>
                </MainContent>
            </div>
        </AppLayout>
    );
}
