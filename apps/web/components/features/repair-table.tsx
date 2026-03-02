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
        accessorKey: "model_car",
        header: "Model",
      },
      {
        accessorKey: "customer.first_name",
        header: "Firstname",
      },
      {
        accessorKey: "customer.last_name",
        header: "Lastname",
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
