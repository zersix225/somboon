"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

import { Button } from "@repo/shadcn/components/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/shadcn/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/*<SidebarMenu>*/}
        {/*  <SidebarMenuItem className="flex items-center gap-2">*/}
        {/*    <SidebarMenuButton*/}
        {/*      tooltip="Quick Create"*/}
        {/*      className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"*/}
        {/*    >*/}
        {/*      <IconCirclePlusFilled />*/}
        {/*      <span>Quick Create</span>*/}
        {/*    </SidebarMenuButton>*/}
        {/*  </SidebarMenuItem>*/}
        {/*</SidebarMenu>*/}
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathname === item.url || pathname.startsWith(`${item.url}/`);

            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    data-active={isActive}
                    // className={
                    //   isActive
                    //       ? "font-semibold text-blue-700"
                    //       : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    // }
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
