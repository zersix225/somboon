"use client";

import { useGetRepairPagination } from "@/hooks/api/useRepair";
import { DataTable } from "@/components/tables/data-table";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function RepairForm() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "10";

  const { data } = useGetRepairPagination(page, pageSize);

  const columns = useMemo(
    () => [
      {
        id: "full_name",
        header: "Name",
        cell: ({ row }: any) => {
          const first = row.original?.customer?.first_name ?? "";
          const last = row.original?.customer?.last_name ?? "";
          const email = row.original?.customer?.email ?? "";
          return (
            <div>
              <div className="font-bold">
                {first}&nbsp;&nbsp;{last}
              </div>
              <div>
                <span className="text-sm text-muted-foreground">{email}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "model_car",
        header: "Model",
      },
      {
        accessorKey: "customer.phone",
        header: "Phone",
      },
      {
        accessorKey: "date_repair",
        header: "Repair Date",
        cell: ({ getValue }: any) => {
          const date = getValue();
          const newFormat = date
            ? new Date(date).toLocaleDateString("en-En", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "-";
          return newFormat;
        },
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ getValue }: any) => {
          const time = getValue();
          const date = new Date(time);

          return date.toLocaleTimeString("th-TH", { timeZone: "Asia/Bangkok" });
        },
      },
    ],
    [],
  );
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col px-4 lg:px-6 py-4 md:py-6">
        <div className="mb-4">
          <h1 className="font-medium">Repair Detail</h1>
          <span className="text-muted-foreground text-sm leading-normal font-normal">
            Enter the required data below this form
          </span>
        </div>
        <DataTable
          columns={columns}
          data={data?.items ?? []}
          totalPages={data?.totalPages}
          totalCount={data?.totalCount}
        />
      </div>
    </div>
  );
}
