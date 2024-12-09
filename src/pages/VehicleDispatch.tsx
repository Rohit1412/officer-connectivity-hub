import React from "react";
import { Card } from "@/components/ui/card";
import VehicleMap from "@/components/VehicleMap";
import DispatchList from "@/components/DispatchList";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const VehicleDispatch = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 bg-background p-6">
          <div className="grid gap-6">
            <h1 className="text-3xl font-bold">Vehicle Dispatch Monitoring</h1>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Live Vehicle Tracking</h2>
                  <VehicleMap />
                </Card>
              </div>
              
              <div>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Active Dispatches</h2>
                  <DispatchList />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default VehicleDispatch;