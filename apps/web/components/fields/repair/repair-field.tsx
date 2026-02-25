"use client";

import { Button } from "@repo/shadcn/components/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@repo/shadcn/components/field";
import { Input } from "@repo/shadcn/components/input";
import { Textarea } from "@repo/shadcn/components/textarea";
import CustomerDropdown from "@/components/dropdowns/customer-dropdown";
import { useState, useEffect } from "react";
import { useRepairSubmit } from "@/hooks/repairs/use-repair-submit";
import { RepairType } from "@/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RepairUploadCard from "@/components/cards/repair-upload-card";
import { RepairServiceField } from "@/components/fields/repair/repair-service-field";
import { RepairDateField } from "@/components/fields/repair/repair-date-field";
import { useDragUpload } from "@/hooks/repairs/use-drag-upload";

export default function RepairField() {
  const { submit } = useRepairSubmit();
  const dragUpload = useDragUpload();

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<RepairType.CreateRepair>({
    resolver: zodResolver(RepairType.CreateRepairSchema),
  });

  useEffect(() => {
    if (day && month && year) {
      setValue(
        "date_repair",
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
      );
    }
  }, [day, month, year, setValue]);

  const onSubmit: SubmitHandler<RepairType.CreateRepair> = async (data) => {
    await submit(data, dragUpload.file);
    dragUpload.setImage([]);
    setDay("");
    setMonth("");
    setYear("");
    reset();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <RepairUploadCard dragUpload={dragUpload} />
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
                {errors?.model_car && (
                  <FieldError>{errors?.model_car.message}</FieldError>
                )}
              </Field>
              <RepairDateField
                day={day}
                setDay={setDay}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
              />
              <RepairServiceField control={control} register={register} />
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
