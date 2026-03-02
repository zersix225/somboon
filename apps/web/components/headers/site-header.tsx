"use client";

import { Separator } from "@repo/shadcn/components/separator";
import { SidebarTrigger } from "@repo/shadcn/components/sidebar";
import { usePathname } from "next/dist/client/components/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@repo/shadcn/components/breadcrumb";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "@repo/shadcn/components/button";

export function SiteHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const pathSplit = segments[segments.length - 1] || "Dashboard";
  const pathFormat = pathSplit.charAt(0).toUpperCase() + pathSplit.slice(1);

  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  function handleToggle() {
    const next = !isDark;
    setIsDark(next);
    setTheme(next ? "dark" : "light");
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{pathFormat}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto">
          <Button variant="outline" size="icon" onClick={handleToggle}>
            {!isDark ? (
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            ) : (
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
