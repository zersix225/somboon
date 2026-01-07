import MainLayout from "@/components/layouts/main-layout";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
