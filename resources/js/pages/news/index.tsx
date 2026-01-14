import { CreateButton } from '@/components/buttons/create-button';
import { DataTable } from '@/components/data-table';
import { MainContent } from '@/components/main-content';
import { getNewsColumns } from '@/components/table/columns/news-column';
import AppLayout from '@/layouts/app-layout';
import news from '@/routes/news';
import {
    AppProps,
    Auth,
    BreadcrumbItem,
    DataTableProps,
    INewsIndex,
    SearchParams,
    Status,
} from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface NewsPageProps {
    news: DataTableProps<INewsIndex>;
    filters: SearchParams;
    auth: Auth;
}

export default function IndexNewsPage() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Berita', href: news.index.url() },
    ];
    const { props } = usePage<AppProps<NewsPageProps>>();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Berita" />
            <MainContent>
                <MainContent.Header title="Daftar Berita" />
                <MainContent.Section>
                    <DataTable<INewsIndex>
                        route={news.index()}
                        columns={getNewsColumns(props.payload.news.meta)}
                        data={props.payload.news.data}
                        meta={props.payload.news.meta}
                        links={props.payload.news.links}
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
                        extraActions={<CreateButton href={news.create.url()} />}
                    />
                </MainContent.Section>
            </MainContent>
        </AppLayout>
    );
}
