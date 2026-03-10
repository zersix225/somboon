import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { Button } from "@repo/shadcn/components/button";
import { Input } from "@repo/shadcn/components/input";
import { Field, FieldLabel } from "@repo/shadcn/components/field";
import { IconCircleDashedPlus, IconTrash } from "@tabler/icons-react";
import { RepairType } from "@/types";

type RepairServiceFieldProps = {
  control: Control<RepairType.CreateRepair>;
  register: UseFormRegister<RepairType.CreateRepair>;
};

export function RepairServiceField({
  control,
  register,
}: RepairServiceFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "service",
  });

  return (
    <Field>
      <div className="flex justify-between w-full items-center">
        <FieldLabel>Services</FieldLabel>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => append({ detail: "", price: 0 })}
        >
          <IconCircleDashedPlus stroke={2} className="size-5" />
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex md:gap-3 gap-2 items-center">
            <Input
              className="grow"
              placeholder="Detail"
              {...register(`service.${index}.detail`)}
            />

            <div>:</div>

            <Input
              className="w-20"
              type="text"
              placeholder="Price"
              {...register(`service.${index}.price`, {
                valueAsNumber: true,
              })}
            />

            <Button
              type="button"
              variant="destructive"
              className="size-7"
              onClick={() => {
                remove(index);
              }}
            >
              <IconTrash
                stroke={2}
                className="text-destructive-foreground size-4"
              />
            </Button>
          </div>
        ))}
      </div>

      {fields.length === 0 && (
        <div className="text-muted-foreground text-sm mt-2 italic text-center py-4 border border-dashed rounded-lg">
          No services added
        </div>
      )}
    </Field>
  );
}
