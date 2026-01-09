import React, { FC, ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@repo/shadcn/components/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/headers/site-header";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
