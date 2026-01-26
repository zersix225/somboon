import { Button } from "@repo/shadcn/components/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
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
import { honoClient } from "@repo/api/client";

export default function CustomerField() {
  const client = honoClient("http://localhost:3000");
  const res = client.customers.$get();

  return (
    <div className="w-full">
      <form>
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
                    <FieldDescription>John Doe</FieldDescription>
                  </div>
                </CardContent>
              </Card>
            </Field>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="firstname">Firstname</FieldLabel>
                <Input id="firstname" type="text" />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastname">Lastname</FieldLabel>
                <Input id="lastname" type="text" />
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
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  type="text"
                  className="text-sm"
                  placeholder="66+"
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
