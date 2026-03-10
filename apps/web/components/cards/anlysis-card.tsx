import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@repo/shadcn/components/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn/components/card";
import { useGetRecentActivityRepair } from "@/hooks/api/useRepair";

export default function AnalysisCard() {
  const { data } = useGetRecentActivityRepair();
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-1 @5xl/main:grid-cols-3">
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Total Repairs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.total}
          </CardTitle>
          <CardAction>
            {/*<Badge variant="outline">*/}
            {/*  <IconTrendingUp />*/}
            {/*  +12.5%*/}
            {/*</Badge>*/}
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Recent Repairs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.currentRepair}
          </CardTitle>
          <CardAction>
            {/*<Badge variant="outline">*/}
            {/*  <IconTrendingDown />*/}
            {/*  -20%*/}
            {/*</Badge>*/}
          </CardAction>
        </CardHeader>
      </Card>
      {/*<Card className="w-full">*/}
      {/*  <CardHeader>*/}
      {/*    <CardDescription>Total Customers</CardDescription>*/}
      {/*    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">*/}
      {/*      45,678*/}
      {/*    </CardTitle>*/}
      {/*    <CardAction>*/}
      {/*      /!*<Badge variant="outline">*!/*/}
      {/*      /!*  <IconTrendingUp />*!/*/}
      {/*      /!*  +12.5%*!/*/}
      {/*      /!*</Badge>*!/*/}
      {/*    </CardAction>*/}
      {/*  </CardHeader>*/}
      {/*</Card>*/}
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.growthRate}
          </CardTitle>
          <CardAction>
            {/*<Badge variant="outline">*/}
            {/*  <IconTrendingUp />*/}
            {/*  +4.5%*/}
            {/*</Badge>*/}
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
