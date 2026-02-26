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

export function SiteHeader() {
  const pathname = usePathname();
  const pathSplit = pathname.split("/")[1] || pathname;
  const pathFormat = pathSplit?.charAt(0).toUpperCase() + pathSplit?.slice(1);
  console.log(pathSplit);

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
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{pathFormat}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
