import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoImg from "/img/Frame 624.png";
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
  // { title: "Dashboard", url: "/" },
  { title: "Vendors", url: "/vendors" },
  { title: "Users", url: "/users" },
  { title: "Riders", url: "/riders" },
  { title: "Orders & Deliveries", url: "/orders" },
  { title: "Support Tickets", url: "/support" },
  { title: "Payment & Finances", url: "/payments" },
  { title: "Loyalty & Rewards", url: "/loyalty" },
  { title: "Analytics & Reports", url: "/analytics" },
  { title: "System & Security", url: "/security" },
  { title: "Notifications", url: "/notifications" },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) =>
    isActive(path)
      ? "relative flex items-center py-4 pl-8 text-[#F28C28] font-medium"
      : "relative flex items-center py-4 pl-8 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="DashDrop" className="h-8" />
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-4 py-10">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-5">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      {isActive(item.url) && (
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-[#F28C28]" />
                      )}
                      {!collapsed && <span className="text-base">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sign Out */}
        <div className="mt-auto p-6 border-t">
          <Button
            variant="outline"
            className=" justify-start h-10 rounded-md"
            style={{ borderColor: '#FF5A3C', color: '#FF5A3C' }}
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="text-base">Sign out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}