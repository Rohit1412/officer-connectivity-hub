import React from "react";
import AlertSystem from "@/components/AlertSystem";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Alerts = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 bg-background p-6">
          <div className="grid gap-6">
            <h1 className="text-3xl font-bold">Emergency Alerts</h1>
            <AlertSystem />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Alerts;