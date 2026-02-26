import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@repo/shadcn/components/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn/components/card";

export default function AnalysisCard() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle>$1,250.00</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle>1,234</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle>45,678</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle>4.5%</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
