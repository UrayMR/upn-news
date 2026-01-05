import { UserFormFields } from '@/components/forms/fields/user-form-fields';
import MainContent from '@/components/main-content';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import {
    IUserShow,
    StatusValue,
    UserRoleValue,
    type BreadcrumbItem,
} from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

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
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Detail Pengguna</h2>

                        <Button variant="secondary" asChild>
                            <Link href={users.index.url()}>Kembali</Link>
                        </Button>
                    </div>

                    <form>
                        <UserFormFields
                            mode="show"
                            data={form.data}
                            errors={form.errors}
                            onChange={form.setData}
                        />
                    </form>
                </MainContent>
            </div>
        </AppLayout>
    );
}
