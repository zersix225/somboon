import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn/components/select";
import { Field, FieldLabel } from "@repo/shadcn/components/field";
import { useMemo } from "react";

type DateProps = {
  day: string | undefined;
  setDay: (v: string) => void;
  month: string | undefined;
  setMonth: (v: string) => void;
  year: string | undefined;
  setYear: (v: string) => void;
};

export function RepairDateField({
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
}: DateProps) {
  const handleValueDM = (limit: number) =>
    Array.from({ length: limit }, (_, i) => i + 1);
  const yearArray = useMemo(() => {
    let year = Number(JSON.stringify(new Date()).slice(1, 5));
    const result: Array<number> = [];

    for (let i = 0; i < 5; i++) {
      result.push(year);
      year++;
    }
    return result;
  }, []);

  return (
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
  );
}
