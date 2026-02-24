"use client";

import RepairField from "@/components/fields/repair/repair-field";

export default function RepairForm() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col px-4 lg:px-6 py-4 md:py-6">
        <div className="mb-4">
          <h1 className="font-medium">Repair Detail</h1>
          <span className="text-muted-foreground text-sm leading-normal font-normal">
            Enter the required data below this form
          </span>
        </div>
        <RepairField />
      </div>
    </div>
  );
}
