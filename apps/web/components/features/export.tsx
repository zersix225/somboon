"use client";

import { useGetRepairAll } from "@/hooks/api/useRepair";
import { RepairType } from "@/types";
import { exportCSV } from "@/utils/csv-helper";
import { Button } from "@repo/shadcn/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/shadcn/components/collapsible";
import { Card, CardContent } from "@repo/shadcn/components/card";
import { ChevronDown } from "lucide-react";

export default function Export() {
  const { data } = useGetRepairAll();

  function removeKeys<T extends Record<string, unknown>, K extends keyof T>(
    arr: readonly T[] | undefined,
    keysToRemove: readonly K[],
  ): Omit<T, K>[] {
    if (!arr) return [];
    return arr.map((obj) =>
      (Object.keys(obj) as Array<keyof T>)
        .filter(
          (key): key is Exclude<keyof T, K> => !keysToRemove.includes(key as K),
        )
        .reduce(
          (newObj, key) => {
            newObj[key] = obj[key];
            return newObj;
          },
          {} as Omit<T, K>,
        ),
    );
  }

  const exportRepair = removeKeys(data, ["customer", "service"]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col px-4 lg:px-6 py-4 md:py-6">
        <div className="mb-6">
          <h1 className="font-medium">Export File</h1>
          <span className="text-muted-foreground text-sm leading-normal font-normal">
            Export repair records as a CSV file for reporting or backup
          </span>
        </div>
        <Card className="w-full">
          <CardContent>
            <Collapsible className="rounded-md data-[state=open]:bg-muted">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="group w-full">
                  Repair
                  <ChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                <Button
                  onClick={() => {
                    exportCSV<RepairType.Repair>(exportRepair);
                  }}
                  size="sm"
                >
                  Download CSV
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
