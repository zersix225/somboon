"use client";

import { useMemo } from "react";
import AnalysisCard from "@/components/cards/anlysis-card";
import { ChartArea } from "@/components/chart/chart-area";
import { DataTable } from "@/components/tables/data-table";
import { useGetRepair } from "@/hooks/api/useRepair";

export default function Dashboard() {
  const { data } = useGetRepair("10");

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
    <div className="@container/main">
      <div className="flex flex-col gap-6 py-4 md:py-6 px-4 lg:px-6">
        <div className="">
          <AnalysisCard />
        </div>
        <ChartArea />
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </div>
  );
}
