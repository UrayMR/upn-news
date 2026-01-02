import { SearchInput as Search } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { UnifiedFilter } from '@/components/unified-filter';
import { cn } from '@/lib/utils';
import { DataTableLinks, DataTableMeta } from '@/types';
import { RouteDefinition } from '@/wayfinder';
import { router, useForm } from '@inertiajs/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { Loader2, RotateCcw, Search as SearchIcon } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

type FilterOption = {
    key: string;
    label: string;
    values: { label: string; value: string | number }[];
};

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

type DataTableProps<TData, TValue> = {
    route: RouteDefinition<Method>;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    meta: DataTableMeta;
    links: DataTableLinks;
    filtersSchema?: FilterOption[];
    extraActions?: React.ReactNode;
};

export function DataTable<TData, TValue = unknown>({
    route,
    columns,
    data,
    meta,
    links,
    filtersSchema = [],
    extraActions,
}: DataTableProps<TData, TValue>) {
    const pageCount = useMemo(
        () => Math.max(1, Math.ceil(meta.total / meta.per_page)),
        [meta.total, meta.per_page],
    );
    const [sorting, setSorting] = useState<SortingState>([]);

    const [isLoading, setIsLoading] = useState(false);

    const { data: form, setData } = useForm<{
        search: string;
        filters: Record<string, string | number | null>;
        page: number;
    }>({
        search: '',
        filters: {},
        page: meta.current_page,
    });

    // Sync form state with URL params on mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const filters: Record<string, string | number | null> = {};
        urlParams.forEach((value, key) => {
            const match = key.match(/^filters\[(.+)\]$/);
            if (match) {
                filters[match[1]] = value;
            }
        });
        const hasSearch = !!searchParam && searchParam.length > 0;
        const hasFilters = Object.keys(filters).length > 0;
        if (hasSearch || hasFilters) {
            setData((prev) => ({
                ...prev,
                search: searchParam || '',
                filters: filters,
            }));
        }
    }, [setData]);

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount,
        meta: {
            current_page: meta.current_page,
            per_page: meta.per_page,
        },
    });

    // Pagination: use provided links URLs
    const handlePageChangeByUrl = (url: string | null) => {
        if (!url || isLoading) return;
        setIsLoading(true);
        router.get(
            url,
            {},
            {
                preserveState: true,
                replace: true,
                onFinish: () => setIsLoading(false),
            },
        );
    };

    // Search/filter submit: always reset to page 1
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        router.get(
            route.url,
            { ...form, page: 1 },
            {
                preserveState: true,
                replace: true,
                onFinish: () => setIsLoading(false),
            },
        );
    };

    // Reset search & filters & page
    const handleReset = () => {
        setIsLoading(true);
        setData({
            search: '',
            filters: {},
            page: 1,
        });
        router.get(
            route.url,
            { search: '', filters: {}, page: 1 },
            {
                preserveState: true,
                replace: true,
                onFinish: () => setIsLoading(false),
            },
        );
    };

    // Determine if Reset button should show
    const shouldShowReset =
        (!!form.search && form.search !== '') ||
        Object.values(form.filters ?? {}).some((v) => v !== null && v !== '');

    return (
        <div className="space-y-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
                {/* Search & Filters */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 md:flex-row"
                >
                    <Search
                        value={form.search ?? ''}
                        onChange={(val) => setData('search', val)}
                        disabled={isLoading}
                    />
                    {filtersSchema.length > 0 && (
                        <UnifiedFilter
                            columns={filtersSchema}
                            selectedFilters={form.filters}
                            onChange={(filters) => setData('filters', filters)}
                            disabled={isLoading}
                        />
                    )}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        variant="default"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Mencari...
                            </span>
                        ) : (
                            <>
                                <SearchIcon />
                                Cari
                            </>
                        )}
                    </Button>
                    {shouldShowReset && (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleReset}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Reset
                                </span>
                            ) : (
                                <>
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Reset
                                </>
                            )}
                        </Button>
                    )}
                </form>
                {extraActions && (
                    <div className="flex justify-end">{extraActions}</div>
                )}
            </div>
            {/* Table with overlay */}
            <div className="relative overflow-x-auto rounded-md border">
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Memuat data...
                        </div>
                    </div>
                )}
                <Table className="table-auto">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="py-6 text-center text-muted-foreground"
                                >
                                    Tidak ada data ditemukan.
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination using links */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className={cn(
                                !links.prev || isLoading
                                    ? 'hidden'
                                    : 'cursor-pointer',
                            )}
                            onClick={() => handlePageChangeByUrl(links.prev)}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="px-2 text-sm text-muted-foreground">
                            {pageCount === 1
                                ? ``
                                : `Halaman ke ${meta.current_page} dari ${pageCount}`}
                        </span>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            className={cn(
                                !links.next || isLoading
                                    ? 'hidden'
                                    : 'cursor-pointer',
                            )}
                            onClick={() => handlePageChangeByUrl(links.next)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
