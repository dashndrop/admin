import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  CreditCard,
  Gift,
  BarChart3,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Vendors", url: "/vendors", icon: Store },
  { title: "Users", url: "/users", icon: Users },
  { title: "Orders & Deliveries", url: "/orders", icon: Package },
  { title: "Support Tickets", url: "/support", icon: HelpCircle },
  { title: "Payment & Finances", url: "/payments", icon: CreditCard },
  { title: "Loyalty & Rewards", url: "/loyalty", icon: Gift },
  { title: "Analytics & Reports", url: "/analytics", icon: BarChart3 },
  { title: "System & Security", url: "/security", icon: Shield },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) =>
    isActive(path)
      ? "bg-primary text-primary-foreground font-medium"
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            {!collapsed && (
              <span className="font-bold text-xl text-foreground">
                Dash<span className="text-primary">Drop</span>
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-4 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sign Out */}
        <div className="mt-auto p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="text-sm">Sign out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}