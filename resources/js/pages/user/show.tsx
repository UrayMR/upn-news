import { BackButton } from '@/components/buttons/back-button';
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
import { Head } from '@inertiajs/react';

interface ShowUserForm {
    name: string;
    email: string;
    phone_number?: string | null;
    role: UserRoleValue;
    status: StatusValue;
    profile_picture_path?: string | null;
    email_verified_at?: string | null;
    updated_at: string;
    created_at: string;
}

export default function ShowUserPage({ user }: { user: IUserShow }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengguna', href: users.index.url() },
        { title: 'Detail Pengguna', href: users.show.url(user.id) },
    ];

    const data: ShowUserForm = {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number ?? null,
        role: user.role,
        status: user.status,
        profile_picture_path: user.profile_picture_path ?? null,
        email_verified_at: user.email_verified_at ?? null,
        updated_at: user.updated_at,
        created_at: user.created_at,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Pengguna" />
            <MainContent>
                <MainContent.Header
                    title="Detail Pengguna"
                    actions={<BackButton href={users.index.url()} />}
                />
                <MainContent.Section>
                    <UserFormFields
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
