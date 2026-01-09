import AnalysisCard from "@/components/cards/anlysis-card";
import { ChartArea } from "@/components/chart/chart-area";
import DataTable from "@/components/tables/data-table";
import data from "@/constants/data.json";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <AnalysisCard />
          <div className="px-4 lg:px-6">
            <ChartArea />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
