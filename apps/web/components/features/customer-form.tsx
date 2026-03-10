"use client";
import CustomerField from "@/components/fields/customer/customer-field";

export default function CustomerForm() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col px-4 lg:px-6 py-4 md:py-6">
        <div className="mb-6">
          <h1 className="font-medium">Create Customer</h1>
          <span className="text-muted-foreground text-sm leading-normal font-normal">
            Fill in the details below to create a new customer record.
          </span>
        </div>
        <CustomerField />
      </div>
    </div>
  );
}
