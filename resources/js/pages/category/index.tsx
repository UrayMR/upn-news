import { CreateButton } from '@/components/buttons/create-button';
import { DataTable } from '@/components/data-table';
import { MainContent } from '@/components/main-content';
import { getCategoryColumns } from '@/components/table/columns/category-column';
import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import {
    AppProps,
    Auth,
    BreadcrumbItem,
    DataTableProps,
    ICategoryIndex,
    SearchParams,
    Status,
} from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface CategoriesPageProps {
    categories: DataTableProps<ICategoryIndex>;
    filters: SearchParams;
    auth: Auth;
}

export default function IndexCategoryPage() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Kategori', href: categories.index.url() },
    ];
    const { props } = usePage<AppProps<CategoriesPageProps>>();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori" />
            <MainContent>
                <MainContent.Header title="Daftar Kategori" />
                <MainContent.Section>
                    <DataTable<ICategoryIndex>
                        route={categories.index()}
                        columns={getCategoryColumns(
                            props.payload.categories.meta,
                        )}
                        data={props.payload.categories.data}
                        meta={props.payload.categories.meta}
                        links={props.payload.categories.links}
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
                            <CreateButton href={categories.create.url()} />
                        }
                    />
                </MainContent.Section>
            </MainContent>
        </AppLayout>
    );
}
