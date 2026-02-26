"use client";

import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/shadcn/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  title: string;
  url: string;
  icon?: Icon;
  items?: {
    title: string;
    url: string;
  }[];
};

export default function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild data-active={isActive}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>

                {/*{item.items?.length ? (*/}
                {/*  <SidebarMenuSub>*/}
                {/*    {item.items.map((sub) => {*/}
                {/*      const isSubActive =*/}
                {/*        pathname === sub.url ||*/}
                {/*        pathname.startsWith(sub.url + "/");*/}

                {/*      return (*/}
                {/*        <SidebarMenuSubItem key={sub.title}>*/}
                {/*          <SidebarMenuSubButton*/}
                {/*            asChild*/}
                {/*            data-active={isSubActive}*/}
                {/*          >*/}
                {/*            <Link href={sub.url}>{sub.title}</Link>*/}
                {/*          </SidebarMenuSubButton>*/}
                {/*        </SidebarMenuSubItem>*/}
                {/*      );*/}
                {/*    })}*/}
                {/*  </SidebarMenuSub>*/}
                {/*) : null}*/}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
