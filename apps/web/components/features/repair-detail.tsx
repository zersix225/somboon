"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@repo/shadcn/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@repo/shadcn/components/dialog";
import { RepairType } from "@/types";
import { Field, FieldGroup } from "@repo/shadcn/components/field";
import { Input } from "@repo/shadcn/components/input";
import { Label } from "@repo/shadcn/components/label";
import { Button } from "@repo/shadcn/components/button";
import { usePathname } from "next/navigation";
import { useGetRepairById, useUpdateRepair } from "@/hooks/api/useRepair";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/shadcn/components/avatar";
import { FieldDescription, FieldLabel } from "@repo/shadcn/components/field";
import * as React from "react";
import { DataTable } from "@/components/tables/data-table";
import { useEffect, useMemo, useState } from "react";
import { Separator } from "@repo/shadcn/components/separator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RepairDateField } from "@/components/fields/repair/repair-date-field";

export default function RepairDetail() {
  const pathname = usePathname().split("/");
  const id = pathname[3]?.toString();
  const { data } = useGetRepairById(id);
  const { mutate: updateRepair } = useUpdateRepair();

  const [day, setDay] = useState<string | undefined>(undefined);
  const [month, setMonth] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

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

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RepairType.UpdateRepair>({
    resolver: zodResolver(RepairType.UpdateRepairSchema),
    defaultValues: {
      id: Number(id),
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        id: Number(id),
        model_car: data.model_car,
        date_repair: data.date_repair,
        comment: data.comment,
      });

      if (data?.date_repair) {
        const date = new Date(data.date_repair);
        setDay(String(date.getDate()));
        setMonth(String(date.getMonth() + 1));
        setYear(String(date.getFullYear()));
      }
    }
  }, [data, id, reset]);

  useEffect(() => {
    if (day && month && year) {
      setValue(
        "date_repair",
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
      );
    }
  }, [day, month, year, setValue]);

  const resetAll = () => {
    reset();
    if (data?.date_repair) {
      const date = new Date(data.date_repair);
      setDay(String(date.getDate()));
      setMonth(String(date.getMonth() + 1));
      setYear(String(date.getFullYear()));
    }
  };

  const onSubmit: SubmitHandler<RepairType.UpdateRepair> = async (data) => {
    console.log("data", data);
    updateRepair(data, {
      onSuccess: () => {
        resetAll();
        setOpen(false);
      },
    });
  };

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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Edit repair</DialogTitle>
                <DialogDescription>
                  Modify the repair information and save the changes
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} id="repair-update">
                <FieldGroup>
                  <Input className="hidden" {...register("id")} />
                  <Field>
                    <Label>Vehicle</Label>
                    <Input {...register("model_car")} />
                  </Field>
                  <Field>
                    <Label>Comment</Label>
                    <Input {...register("comment")} />
                  </Field>
                  <RepairDateField
                    day={day}
                    setDay={setDay}
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                  />
                </FieldGroup>
              </form>
              <DialogFooter>
                <Button variant="outline" onClick={() => resetAll()}>
                  Clear
                </Button>
                <Button type="submit" form="repair-update">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardHeader>
            <div>
              <CardDescription>Repair Order</CardDescription>
              <h1 className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                #{data?.id}
              </h1>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="mt-6">
                <CardDescription>Created</CardDescription>
                <p>{formatDate(data?.created_at)}</p>
              </div>
              <div className="mt-6">
                <CardDescription>Repair Date</CardDescription>
                <p>{formatDate(data?.date_repair)}</p>
              </div>
              <div className="mt-6">
                <CardDescription>Vehicle</CardDescription>
                <p>{data?.model_car}</p>
              </div>
              <div className="mt-6">
                <CardDescription>Comment</CardDescription>
                <p>{data?.comment}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-y-3 gap-x-6">
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
              <Separator orientation="horizontal" className="md:hidden" />
              <Separator
                orientation="vertical"
                className="hidden md:block mx-2 data-[orientation=vertical]:h-8"
              />
              <div>
                <FieldLabel>Phone</FieldLabel>
                <FieldDescription>{data?.customer.phone}</FieldDescription>
              </div>
              <Separator orientation="horizontal" className="md:hidden" />
              <Separator
                orientation="vertical"
                className="hidden md:block mx-2 data-[orientation=vertical]:h-8"
              />
              <div>
                <FieldLabel>Email</FieldLabel>
                <FieldDescription>{data?.customer.email}</FieldDescription>
              </div>
            </div>
          </CardContent>
        </Card>
        <DataTable columns={columns} data={data?.service ?? []} />
      </div>
    </div>
  );
}
