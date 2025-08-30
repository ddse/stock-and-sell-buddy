import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  CreditCard,
  ShoppingCart,
  AlertCircle,
  DollarSign,
  Receipt,
  FolderOpen,
  Package,
  Package2,
  Users,
  UserCheck,
  Banknote,
  Calculator,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "POS", url: "/pos", icon: CreditCard },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Due Payments", url: "/due-payments", icon: AlertCircle },
  { title: "Settle Due Amount", url: "/settle-due", icon: DollarSign },
  { title: "Transactions", url: "/transactions", icon: Receipt },
  { title: "Categories", url: "/categories", icon: FolderOpen },
  { title: "Unit Types", url: "/unit-types", icon: Package },
  { title: "Products", url: "/products", icon: Package2 },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Employee", url: "/employees", icon: UserCheck },
  { title: "Salary", url: "/salary", icon: Banknote },
  { title: "Expenses", url: "/expenses", icon: Calculator },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent ${
                          navIsActive || isActive(item.url)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}