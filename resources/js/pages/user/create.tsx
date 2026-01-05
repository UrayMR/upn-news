import { UserFormFields } from '@/components/forms/fields/user-form-fields';
import MainContent from '@/components/main-content';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import { Status, UserRole, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface CreateUserForm {
    name: string;
    email: string;
    phone_number?: string;
    role: string;
    status: string;
    password: string;
    password_confirmation: string;
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
            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                            Tambah Pengguna Baru
                        </h2>

                        <Button variant="secondary" asChild>
                            <Link href={users.index.url()}>Kembali</Link>
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <UserFormFields
                            data={form.data}
                            errors={form.errors}
                            onChange={form.setData}
                        />

                        <div className="mt-4 flex justify-end">
                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </MainContent>
            </div>
        </AppLayout>
    );
}
