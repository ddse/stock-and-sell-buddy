import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card flex items-center px-4">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-foreground">
                Inventory & Sales Management
              </h1>
            </div>
          </header>
          <main className="flex-1 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}