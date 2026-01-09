"use client";

import RepairField from "@/components/fields/repair-feild";

export default function Form() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 md:gap-6 px-4 lg:px-6 py-4 md:py-6">
        <div>
          <h1 className="font-medium">Repair Detail</h1>
          <span className="text-muted-foreground text-sm leading-normal font-normal">
            Enter the required data below this form
          </span>
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex flex-2 flex-col">
            <RepairField />
          </div>
          {/*<div className="flex flex-1 flex-col gap-2 min-h-[100vh] hidden lg:block">*/}
          {/*  <h1 className="font-medium">Attachment files</h1>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}
