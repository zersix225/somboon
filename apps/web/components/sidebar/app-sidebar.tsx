import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@repo/shadcn/components/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>Somboon AutoAir</SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          {/*<SidebarGroupContent>*/}
          {/*    */}
          {/*</SidebarGroupContent>*/}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
