"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@repo/shadcn/components/card";
import { Button } from "@repo/shadcn/components/button";
import { usePathname } from "next/navigation";
import { useGetRepairById } from "@/hooks/api/useRepair";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/shadcn/components/avatar";
import { FieldDescription, FieldLabel } from "@repo/shadcn/components/field";
import * as React from "react";
import { DataTable } from "@/components/tables/data-table";
import { useMemo } from "react";

export default function RepairDetail() {
  const pathname = usePathname().split("/");
  const id = pathname[3]?.toString();
  const { data } = useGetRepairById(id);

  const formatDate = (date: string | undefined) => {
    if (!date) return;
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "detail",
        header: "Detail",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
    ],
    [],
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col px-4 lg:px-6 py-4 md:py-6 gap-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="font-medium">Repair Detail</h1>
            <span className="text-muted-foreground text-sm leading-normal font-normal">
              Enter the required data below this form
            </span>
          </div>
          <Button>Edit</Button>
        </div>
        <Card>
          <CardHeader>
            <div>
              <CardDescription>Repair Order</CardDescription>
              <h1 className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                #{data?.id}
              </h1>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-4">
              <div className="mt-6">
                <CardDescription>Created</CardDescription>
                <p>{formatDate(data?.date_repair)}</p>
              </div>
              <div className="mt-6">
                <CardDescription>Repair Date</CardDescription>
                <p>{formatDate(data?.created_at)}</p>
              </div>
              <div className="mt-6">
                <CardDescription>Vehicle</CardDescription>
                <p>{data?.model_car}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <FieldLabel>
                  {data?.customer.first_name} {data?.customer.last_name}
                </FieldLabel>
                <FieldDescription>ID {data?.customer.id}</FieldDescription>
              </div>
            </div>
            {/*<div className="grid grid-rows-1 gap-3 mt-3">*/}
            {/*</div>*/}
          </CardContent>
        </Card>
        <DataTable columns={columns} data={data?.service ?? []} />
      </div>
    </div>
  );
}
