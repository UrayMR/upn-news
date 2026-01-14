import { DeleteDialogButton } from '@/components/buttons/delete-dialog-button';
import { EditButton } from '@/components/buttons/edit-button';
import { ShowButton } from '@/components/buttons/show-button';
import { Badge } from '@/components/ui/badge';
import news from '@/routes/news';
import { INewsIndex, NewsStatusMap } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

interface PaginationMeta {
    current_page: number;
    per_page: number;
}

export const getNewsColumns = (
    meta: PaginationMeta,
): ColumnDef<INewsIndex>[] => [
    {
        accessorKey: 'No',
        header: 'No',
        cell: ({ row }) => {
            const number =
                (meta.current_page - 1) * meta.per_page + (row.index + 1);

            return <div className="flex items-center">{number}</div>;
        },
    },
    {
        accessorKey: 'category',
        header: 'Kategori',
    },
    {
        accessorKey: 'author',
        header: 'Penulis',
    },
    {
        accessorKey: 'title',
        header: 'Judul',
        cell: ({ row }) => {
            const title = row.original.title;
            return title.length > 20 ? `${title.substring(0, 20)}...` : title;
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            const statusObj = NewsStatusMap[status] ?? {
                value: status,
                label: status,
            };
            const variant: 'default' | 'destructive' =
                statusObj.value === 'inactive' ? 'destructive' : 'default';
            return (
                <div className="flex items-center">
                    <Badge
                        variant={variant}
                        className="inline-flex h-6 w-18 items-center justify-center capitalize"
                    >
                        {statusObj.label}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: 'published_at',
        header: 'Dipublikasikan Pada',
        cell: ({ row }) => {
            const publishedAt = row.original.published_at;
            return publishedAt ?? 'Belum Dipublikasikan';
        },
    },
    {
        header: 'Aksi',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <ShowButton
                        href={news.show.url({
                            news: row.original.slug,
                        })}
                    />

                    <EditButton
                        href={news.edit.url({
                            news: row.original.slug,
                        })}
                    />

                    <DeleteDialogButton
                        title="Hapus Berita"
                        description={`Apakah Anda yakin ingin menghapus berita ${row.original.title}? Tindakan ini tidak dapat dibatalkan.`}
                        url={news.destroy.url({
                            news: row.original.slug,
                        })}
                    />
                </div>
            );
        },
    },
];
