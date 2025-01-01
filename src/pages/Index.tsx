import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AlertSystem from "@/components/AlertSystem";
import VehicleMap from "@/components/VehicleMap";
import CrimeHeatmap from "@/components/CrimeHeatmap";
import DispatchList from "@/components/DispatchList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Activity, AlertTriangle, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [activeOfficers, setActiveOfficers] = useState(24);
  const [activeAlerts, setActiveAlerts] = useState(0);
  const [securityStatus, setSecurityStatus] = useState("Normal");

  useEffect(() => {
    const alertInterval = setInterval(() => {
      setActiveAlerts((prev) => {
        const randomChange = Math.random() > 0.5 ? 1 : -1;
        return Math.max(0, prev + randomChange);
      });
    }, 5000);

    return () => clearInterval(alertInterval);
  }, []);

  useEffect(() => {
    if (activeAlerts > 5) {
      setSecurityStatus("Critical");
    } else if (activeAlerts > 2) {
      setSecurityStatus("Warning");
    } else {
      setSecurityStatus("Normal");
    }
  }, [activeAlerts]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 bg-background p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Command Center Dashboard</h1>
                <p className="text-muted-foreground">Real-time monitoring and control</p>
              </div>
              <Badge variant="outline" className="animate-pulse">
                Live System
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-accent" />
                  <span>Active Officers</span>
                </div>
                <p className="text-2xl font-bold mt-2">{activeOfficers}</p>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span>Active Alerts</span>
                </div>
                <p className="text-2xl font-bold mt-2">{activeAlerts}</p>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>Security Status</span>
                </div>
                <p className={`text-2xl font-bold mt-2 ${
                  securityStatus === "Critical" ? "text-destructive" :
                  securityStatus === "Warning" ? "text-warning" :
                  "text-accent"
                }`}>
                  {securityStatus}
                </p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-4">Critical Alerts</h2>
                <AlertSystem />
              </Card>

              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-4">Vehicle Tracking</h2>
                <VehicleMap />
              </Card>

              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-4">Crime Heatmap</h2>
                <CrimeHeatmap />
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Active Dispatches</h2>
                  <Button variant="outline" onClick={() => navigate("/dispatch")}>View All</Button>
                </div>
                <DispatchList />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;