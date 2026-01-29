"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/shadcn/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@repo/shadcn/components/field";
import { Input } from "@repo/shadcn/components/input";
import * as React from "react";
import { Card, CardContent } from "@repo/shadcn/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/shadcn/components/avatar";
import { toast } from "sonner";
import { Spinner } from "@repo/shadcn/components/spinner";
import { CustomerType } from "@/types";
import useCustomer from "@/hooks/api/useCustomer";
import { useShallow } from "zustand/react/shallow";

export default function CustomerField() {
  const { postCustomer, loading, success, error } = useCustomer(
    useShallow((state) => {
      return {
        postCustomer: state.post,
        loading: state.loading,
        success: state.success,
        error: state.error,
      };
    }),
  );
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CustomerType.CreateCustomer>({
    resolver: zodResolver(CustomerType.CreateCustomerSchema),
  });
  const [firstName, lastName] = watch(["first_name", "last_name"]);
  const onSubmit: SubmitHandler<CustomerType.CreateCustomer> = async (data) => {
    await postCustomer(data);
    if (!success) {
      reset();
      toast.success("Customer created successfully.");
    } else {
      toast.error(`${error}`);
    }
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <Field>
              <Card className="w-full">
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <FieldDescription>
                      {firstName || lastName
                        ? `${firstName ?? ""} ${lastName ?? ""}`
                        : "John Doe"}
                    </FieldDescription>
                  </div>
                </CardContent>
              </Card>
            </Field>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="firstname">Firstname</FieldLabel>
                <Input id="firstname" type="text" {...register("first_name")} />
                {errors?.first_name && (
                  <FieldError>{errors.first_name.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="lastname">Lastname</FieldLabel>
                <Input id="lastname" type="text" {...register("last_name")} />
                {errors?.last_name && (
                  <FieldError>{errors.last_name.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  className="text-sm"
                  placeholder="@gmail.com"
                  {...register("email")}
                />
                {errors?.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  type="text"
                  className="text-sm"
                  placeholder="66+"
                  {...register("phone")}
                />
                {errors?.phone && (
                  <FieldError>{errors.phone.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Submit"}
            </Button>
            <Button variant="outline" type="button" onClick={() => reset()}>
              Clear
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
