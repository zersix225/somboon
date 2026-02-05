"use client";

import { Button } from "@repo/shadcn/components/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@repo/shadcn/components/field";
import { Input } from "@repo/shadcn/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn/components/select";
import { Textarea } from "@repo/shadcn/components/textarea";
import { IconCircleDashedPlus, IconTrash } from "@tabler/icons-react";
import CustomerDropdown from "@/components/dropdowns/customer-dropdown";
import UploadCard from "@/components/cards/upload-card";
import { useEffect, useMemo, useState } from "react";
import { usePostRepair } from "@/hooks/api/useRepair";
import { RepairType } from "@/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Item = {
  id: number;
};

export default function RepairField() {
  const postRepair = usePostRepair();
  const [item, setItem] = useState<Item[]>([{ id: 0 }]);
  const [nextId, setNextId] = useState(1);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const yearArray = useMemo(() => {
    let year = Number(JSON.stringify(new Date()).slice(1, 5));
    const result: Array<number> = [];

    for (let i = 0; i < 5; i++) {
      result.push(year);
      year++;
    }
    return result;
  }, []);

  const handleValueDM = (limit: number) => {
    const value: Array<number> = [];
    for (let i = 1; i <= limit; i++) {
      value.push(i);
    }
    return value;
  };

  const handleAddClick = () => {
    setItem((prev) => [...prev, { id: nextId }]);
    setNextId((prev) => prev + 1);
  };
  const handleRemoveClick = (id: number) => {
    if (id === 0) return;
    const remainingItem = item.filter((t) => t.id !== id);
    setItem(remainingItem);
  };

  useEffect(() => {
    localStorage.setItem("item_key", JSON.stringify(item));
  }, [item]);

  useEffect(() => {
    const getLocal = localStorage.getItem("item_key");
    if (getLocal) {
      const parse: Item[] = JSON.parse(getLocal);
      setItem(parse);

      const maxId = parse.reduce((max, t) => Math.max(max, t.id), 0);
      setNextId(maxId + 1);
    }
  }, []);

  const { register, handleSubmit, reset, setValue, control } =
    useForm<RepairType.CreateRepair>();

  useEffect(() => {
    if (day && month && year) {
      setValue(
        "date_repair",
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
      );
    }
  }, [day, month, year, setValue]);

  const onSubmit: SubmitHandler<RepairType.CreateRepair> = async (data) => {
    postRepair.mutate(data, {
      onSuccess: () => {
        reset();
        setDay("");
        setMonth("");
        setYear("");
        setItem([{ id: 0 }]);
        setNextId(1);
        localStorage.removeItem("item_key");
        toast.success("Repair created");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <UploadCard />
                </Field>
                <Field>
                  <Controller
                    name="customer_id"
                    control={control}
                    render={({ field }) => (
                      <CustomerDropdown onChange={field.onChange} />
                    )}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Model Car</FieldLabel>
                <Input placeholder="ex. civic" {...register("model_car")} />
              </Field>
              <div className="grid grid-cols-3 gap-2">
                <Field>
                  <FieldLabel htmlFor="day">Day</FieldLabel>
                  <Select onValueChange={setDay} value={day}>
                    <SelectTrigger>
                      <SelectValue placeholder="DD" />
                    </SelectTrigger>
                    <SelectContent>
                      {handleValueDM(31).map((v, index) => (
                        <SelectItem key={index} value={`${v.toString()}`}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="month">Month</FieldLabel>
                  <Select onValueChange={setMonth} value={month}>
                    <SelectTrigger>
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {handleValueDM(12).map((v, index) => (
                        <SelectItem key={index} value={`${v.toString()}`}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="year">Year</FieldLabel>
                  <Select onValueChange={setYear} value={year}>
                    <SelectTrigger>
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearArray.map((y, index) => (
                        <SelectItem key={index} value={y.toString()}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="service">
                  <div className="flex justify-between w-full items-center">
                    <span>Services</span>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={handleAddClick}
                    >
                      <IconCircleDashedPlus stroke={2} className="size-5" />
                    </Button>
                  </div>
                </FieldLabel>
                {item.map((t, index) => (
                  <div key={t.id} className="flex md:gap-3 gap-2 items-center">
                    <Input
                      className="grow"
                      placeholder="Detail"
                      {...register(`service.${index}.detail`)}
                    />
                    <div>:</div>
                    <Input
                      className="w-35"
                      placeholder="Price"
                      {...register(`service.${index}.price`, {
                        valueAsNumber: true,
                      })}
                    />
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => handleRemoveClick(t.id)}
                    >
                      <IconTrash
                        stroke={2}
                        className="text-destructive-foreground size-5"
                      />
                    </Button>
                  </div>
                ))}
                {/*<div className="flex">*/}
                {/*  <Button type="button">*/}
                {/*    Add Detail*/}
                {/*  </Button>*/}
                {/*</div>*/}
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="comment">Comments</FieldLabel>
                <Textarea
                  placeholder="Add any additional comments"
                  className="resize-none"
                  {...register("comment")}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                reset();
                setDay("");
                setMonth("");
                setYear("");
                setItem([{ id: 0 }]);
                setNextId(1);
                localStorage.removeItem("item_key");
              }}
            >
              Clear
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
