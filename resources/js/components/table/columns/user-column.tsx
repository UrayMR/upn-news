import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import users from '@/routes/users';
import { StatusMap, User } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

export const getUserColumns = (): ColumnDef<User>[] => [
    {
        accessorKey: 'No',
        header: 'No',
        cell: ({ row, table }) => {
            const currentPage = table.options.meta?.current_page ?? 1;
            const perPage = table.options.meta?.per_page ?? 10;
            const number = (currentPage - 1) * perPage + (row.index + 1);

            return (
                <div className="flex items-center">
                    <span>{number}</span>
                </div>
            );
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
                    <Button variant="outline" size="sm" asChild>
                        <Link
                            href={users.show.url({
                                user: row.original.id,
                            })}
                        >
                            Lihat
                        </Link>
                    </Button>

                    <Button variant="default" size="sm" asChild>
                        <Link
                            href={users.edit.url({
                                user: row.original.id,
                            })}
                        >
                            Ubah
                        </Link>
                    </Button>

                    {/* <DeleteUserDialog user={row.original} /> */}
                </div>
            );
        },
    },
];
