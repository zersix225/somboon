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
        header: "First Name",
      },
      {
        accessorKey: "customer.last_name",
        header: "Lastname Name",
      },
      {
        accessorKey: "customer.phone",
        header: "Phone",
      },
      {
        accessorKey: "comment",
        header: "Comment",
      },
      {
        accessorKey: "date_repair",
        header: "Repair Date",
      },
    ],
    [],
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <AnalysisCard />
          <ChartArea />
          <DataTable columns={columns} data={data ?? []} />
        </div>
      </div>
    </div>
  );
}
