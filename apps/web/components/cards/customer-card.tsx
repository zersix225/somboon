import { IconTrendingUp } from "@tabler/icons-react";
import { Label } from "@repo/shadcn/components/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn/components/card";
import * as React from "react";
import { Input } from "@repo/shadcn/components/input";

export default function CustomerCard() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 pb-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Customer Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="grid gap-2">
            <Label htmlFor="firstname">Firstname</Label>
            <Input id="firstname" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Lastname</Label>
            <Input id="lastname" type="text" />
          </div>
        </div>
        <div className="grid gap-2 mb-4 md:mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            className="text-sm"
            placeholder="@gmail.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="text" className="text-sm" placeholder="66+" />
        </div>
      </CardContent>
    </Card>
  );
}
