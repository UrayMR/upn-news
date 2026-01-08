import { DeleteDialogButton } from '@/components/buttons/delete-dialog-button';
import { EditButton } from '@/components/buttons/edit-button';
import { ShowButton } from '@/components/buttons/show-button';
import { Badge } from '@/components/ui/badge';
import users from '@/routes/users';
import { IUserIndex, StatusMap } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

interface PaginationMeta {
    current_page: number;
    per_page: number;
}

export const getUserColumns = (
    meta: PaginationMeta,
): ColumnDef<IUserIndex>[] => [
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
        accessorKey: 'name',
        header: 'Nama',
        cell: ({ row }) => {
            const name = row.original.name;
            return name.length > 20 ? `${name.substring(0, 20)}...` : name;
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Hak Akses',
        cell: ({ row }) => {
            const role = row.original.role;
            return role.charAt(0).toUpperCase() + role.slice(1);
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            const statusObj = StatusMap[status] ?? {
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
        header: 'Aksi',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <ShowButton
                        href={users.show.url({
                            user: row.original.id,
                        })}
                    />

                    <EditButton
                        href={users.edit.url({
                            user: row.original.id,
                        })}
                    />

                    <DeleteDialogButton
                        title="Hapus Pengguna"
                        description={`Apakah Anda yakin ingin menghapus pengguna ${row.original.name}? Tindakan ini tidak dapat dibatalkan.`}
                        url={users.destroy.url({
                            user: row.original.id,
                        })}
                    />
                </div>
            );
        },
    },
];
