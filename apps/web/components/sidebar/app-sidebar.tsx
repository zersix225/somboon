"use client";

import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";

import NavDocuments from "@/components/nav/nav-documents";
import NavMain from "@/components/nav/nav-main";
import NavSecondary from "@/components/nav/nav-secondary";
import NavUser from "@/components/nav/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/shadcn/components/sidebar";
import { nav } from "@/constants/nav";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Somboon Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav.navMain} />
        <NavDocuments items={nav.documents} />
        <NavSecondary items={nav.navSecondary} />
      </SidebarContent>
      {/*<SidebarFooter>*/}
      {/*  <NavUser user={data.user} />*/}
      {/*</SidebarFooter>*/}
    </Sidebar>
  );
}
