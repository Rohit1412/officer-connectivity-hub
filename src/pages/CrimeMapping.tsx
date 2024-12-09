import React from "react";
import { Card } from "@/components/ui/card";
import CrimeHeatmap from "@/components/CrimeHeatmap";
import ReportIncident from "@/components/ReportIncident";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const CrimeMapping = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 bg-background p-6">
          <div className="grid gap-6">
            <h1 className="text-3xl font-bold">Crime Mapping & Community Reports</h1>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Crime Heatmap</h2>
                <CrimeHeatmap />
              </Card>
              
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Report an Incident</h2>
                <ReportIncident />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CrimeMapping;