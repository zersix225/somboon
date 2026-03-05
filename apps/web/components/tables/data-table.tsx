"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  IconArrowNarrowRight,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn/components/table";
import { useMemo } from "react";
import Link from "next/link";
import { Label } from "@repo/shadcn/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn/components/select";
import { Button } from "@repo/shadcn/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/shadcn/components/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: readonly TData[];
  totalPages?: number;
  totalCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPages,
  totalCount,
}: DataTableProps<TData, TValue>) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1") - 1;
  const pageSize = Number(searchParams.get("pageSize") ?? "10");

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams({
      page: String(page + 1),
      pageSize: String(pageSize),
      ...updates,
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const table = useReactTable({
    data: useMemo(() => [...data], [data]),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    rowCount: totalCount,
    state: {
      pagination: { pageIndex: page, pageSize },
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: page, pageSize })
          : updater;
      updateParams({
        page: String(next.pageIndex + 1),
        pageSize: String(next.pageSize),
      });
    },
  });

  return (
    <div className="space-y-4">
      {pathname === "/repair" ||
        (pathname === "/dashboard" && (
          <div className="mb-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="font-medium">Repair Detail</h1>
            </div>
            <Link
              href={"/repair"}
              className="group text-sm flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              View All
              <IconArrowNarrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        ))}

      <div className="overflow-hidden rounded-xl border border-border/60 shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/50 hover:bg-muted/50 border-b border-border/60"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 h-10 px-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
                <TableHead className="w-10" />
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group border-b border-border/40 last:border-0 transition-colors duration-100 hover:bg-muted/30 data-[state=selected]:bg-primary/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onClick={() => {
                        if (pathname === "/repair") {
                          router.push(`/repair/detail/${row.original.id}`);
                        }
                      }}
                      className="px-4 py-3 text-sm text-foreground/80"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  {pathname === "/repair" && (
                    <TableCell className="px-2 py-3 w-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <IconDotsVertical stroke={2} className="size-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-40 text-sm"
                        >
                          <DropdownMenuItem
                            onClick={() => {
                              if (pathname === "/repair") {
                                router.push(
                                  `/repair/detail/${row.original.id}`,
                                );
                              }
                            }}
                          >
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-sm">No results found</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pathname === "/repair" && (
        <div className="flex items-center justify-between px-1 pt-2">
          <div className="text-muted-foreground hidden flex-1 text-xs lg:flex">
            <span className="font-medium text-foreground">{totalCount}</span>
            &nbsp;row(s) total
          </div>
          <div className="flex w-full items-center gap-6 lg:w-fit">
            <div className="hidden items-center gap-2.5 lg:flex">
              <Label
                htmlFor="rows-per-page"
                className="text-xs font-medium text-muted-foreground"
              >
                Rows per page
              </Label>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) =>
                  updateParams({ page: "1", pageSize: value })
                }
              >
                <SelectTrigger
                  size="sm"
                  className="w-20 h-8 text-xs border-border/60 bg-background"
                  id="rows-per-page"
                >
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((size) => (
                    <SelectItem
                      key={size}
                      value={`${size}`}
                      className="text-xs"
                    >
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-fit items-center justify-center text-xs font-medium text-muted-foreground">
              Page{" "}
              <span className="mx-1 font-semibold text-foreground">
                {table.getState().pagination.pageIndex + 1}
              </span>{" "}
              of{" "}
              <span className="ml-1 font-semibold text-foreground">
                {table.getPageCount()}
              </span>
            </div>

            <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex border-border/60 hover:bg-muted/50 transition-colors"
                onClick={() => updateParams({ page: "1" })}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft className="size-3.5" />
              </Button>
              <Button
                variant="outline"
                className="size-8 border-border/60 hover:bg-muted/50 transition-colors"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft className="size-3.5" />
              </Button>
              <Button
                variant="outline"
                className="size-8 border-border/60 hover:bg-muted/50 transition-colors"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight className="size-3.5" />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex border-border/60 hover:bg-muted/50 transition-colors"
                size="icon"
                onClick={() =>
                  updateParams({ page: String(table.getPageCount()) })
                }
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
