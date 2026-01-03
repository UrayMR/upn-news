import { DataTable } from '@/components/data-table';
import MainContent from '@/components/main-content';
import { getUserColumns } from '@/components/table/columns/user-column';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import {
    AppProps,
    Auth,
    BreadcrumbItem,
    DataTableProps,
    SearchParams,
    Status,
    User,
} from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface UsersPageProps {
    users: DataTableProps<User>;
    filters: SearchParams;
    auth: Auth;
}

export default function UsersPage() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengguna', href: users.index.url() },
    ];
    const { props } = usePage<AppProps<UsersPageProps>>();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengguna" />
            <MainContent>
                <h2 className="mb-4 text-lg font-semibold">Daftar Pengguna</h2>
                <DataTable<User>
                    route={users.index()}
                    columns={getUserColumns(props.payload.users.meta)}
                    data={props.payload.users.data}
                    meta={props.payload.users.meta}
                    links={props.payload.users.links}
                    filtersSchema={[
                        {
                            key: 'status',
                            label: 'Status',
                            values: [
                                {
                                    label: Status.Active.label,
                                    value: Status.Active.value,
                                },
                                {
                                    label: Status.Inactive.label,
                                    value: Status.Inactive.value,
                                },
                            ],
                        },
                    ]}
                    extraActions={
                        <Button variant="default" asChild>
                            <Link href={users.create()}>
                                <Plus />
                                Tambah
                            </Link>
                        </Button>
                    }
                />
            </MainContent>
        </AppLayout>
    );
}
