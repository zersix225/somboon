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

type Item = {
  id: number;
};

export default function RepairField() {
  const [item, setItem] = useState<Item[]>([{ id: 0 }]);
  const [nextId, setNextId] = useState(1);

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

  console.log(item);
  return (
    <div className="w-full">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <UploadCard />
                </Field>
                <Field>
                  <CustomerDropdown />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Model Car
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="ex. civic"
                  required
                />
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    Day
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
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
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    Month
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-exp-month-ts6">
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
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    Year
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
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
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
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
                {item.map((t) => (
                  <div key={t.id} className="flex md:gap-3 gap-2 items-center">
                    <Input className="grow" placeholder="Detail" required />
                    <div>:</div>
                    <Input className="w-35" placeholder="Price" required />
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
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Comments
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Clear
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
