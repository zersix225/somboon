"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@repo/shadcn/lib/utils";
import { Button } from "@repo/shadcn/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/shadcn/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/shadcn/components/popover";
import { useRouter } from "next/navigation";
import { useGetCustomer } from "@/hooks/api/useCustomer";

type CustomerDropdownProps = {
  onChange?: (customerId: number) => void;
};

export default function CustomerDropdown({ onChange }: CustomerDropdownProps) {
  const { data, isLoading, error } = useGetCustomer();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(null);

  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="grow justify-between"
          >
            {value
              ? data?.find((customer) => customer.id === value)?.first_name
              : "Select Customer"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          side="bottom"
        >
          <Command>
            <CommandInput placeholder="Search Customer..." className="h-9" />
            <CommandList>
              <CommandEmpty>No customer found.</CommandEmpty>
              <CommandGroup>
                {data?.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={`${customer.first_name} ${customer.last_name}`}
                    onSelect={() => {
                      setValue(customer.id);
                      onChange?.(customer.id);
                      setOpen(false);
                    }}
                  >
                    {customer.first_name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === customer.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        type="button"
        className="flex-none"
        onClick={() => router.push("/form/customer")}
      >
        Add Customer
      </Button>
    </div>
  );
}
