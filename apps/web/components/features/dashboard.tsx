"use client";

import { Suspense, useMemo } from "react";
import AnalysisCard from "@/components/cards/anlysis-card";
import { ChartArea } from "@/components/chart/chart-area";
import { DataTable } from "@/components/tables/data-table";
import { useGetRepair } from "@/hooks/api/useRepair";

export default function Dashboard() {
  const { data } = useGetRepair("10");
  // console.log(data)
  //   const dataArray = data ? [data] : [];

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
    <div className="@container/main">
      <div className="flex flex-col gap-6 py-4 md:py-6 px-4 lg:px-6">
        <div className="">
          <AnalysisCard />
        </div>
        <ChartArea />
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={data ?? []} />
        </Suspense>
      </div>
    </div>
  );
}
