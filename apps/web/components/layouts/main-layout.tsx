import React, { FC, ReactNode } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@repo/shadcn/components/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
