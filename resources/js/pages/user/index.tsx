import { CreateButton } from '@/components/buttons/create-button';
import { DataTable } from '@/components/data-table';
import { MainContent } from '@/components/main-content';
import { getUserColumns } from '@/components/table/columns/user-column';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import {
    AppProps,
    Auth,
    BreadcrumbItem,
    DataTableProps,
    IUserIndex,
    SearchParams,
    Status,
} from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface UsersPageProps {
    users: DataTableProps<IUserIndex>;
    filters: SearchParams;
    auth: Auth;
}

export default function IndexUserPage() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengguna', href: users.index.url() },
    ];
    const { props } = usePage<AppProps<UsersPageProps>>();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengguna" />
            <MainContent>
                <MainContent.Header title="Daftar Pengguna" />
                <MainContent.Section>
                    <DataTable<IUserIndex>
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
                            <CreateButton href={users.create.url()} />
                        }
                    />
                </MainContent.Section>
            </MainContent>
        </AppLayout>
    );
}
