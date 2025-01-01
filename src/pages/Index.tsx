import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AlertSystem from "@/components/AlertSystem";
import DeviceCard from "@/components/DeviceCard";
import VehicleMap from "@/components/VehicleMap";
import CrimeHeatmap from "@/components/CrimeHeatmap";
import DispatchList from "@/components/DispatchList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Activity, AlertTriangle, Camera, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [activeOfficers, setActiveOfficers] = useState(24);
  const [liveFeeds, setLiveFeeds] = useState(0);
  const [activeAlerts, setActiveAlerts] = useState(0);
  const [securityStatus, setSecurityStatus] = useState("Normal");

  // Query for initial live feeds count
  const { data: devices } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  // Subscribe to real-time updates for stream connections
  useEffect(() => {
    const channel = supabase
      .channel('stream-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stream_connections'
        },
        (payload) => {
          // Update live feeds count
          supabase
            .from('stream_connections')
            .select('*', { count: 'exact' })
            .eq('is_active', true)
            .then(({ count }) => {
              setLiveFeeds(count || 0);
            });
        }
      )
      .subscribe();

    // Initial count of live feeds
    supabase
      .from('stream_connections')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .then(({ count }) => {
        setLiveFeeds(count || 0);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Simulate real-time alerts
  useEffect(() => {
    const alertInterval = setInterval(() => {
      setActiveAlerts((prev) => {
        const randomChange = Math.random() > 0.5 ? 1 : -1;
        return Math.max(0, prev + randomChange);
      });
    }, 5000);

    return () => clearInterval(alertInterval);
  }, []);

  // Update security status based on active alerts
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
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Command Center Dashboard</h1>
                <p className="text-muted-foreground">Real-time monitoring and control</p>
              </div>
              <Badge variant="outline" className="animate-pulse">
                Live System
              </Badge>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-accent" />
                  <span>Active Officers</span>
                </div>
                <p className="text-2xl font-bold mt-2">{activeOfficers}</p>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-accent" />
                  <span>Live Feeds</span>
                </div>
                <p className="text-2xl font-bold mt-2">{liveFeeds}</p>
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

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Alerts */}
              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-4">Critical Alerts</h2>
                <AlertSystem />
              </Card>

              {/* Vehicle Tracking */}
              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-4">Vehicle Tracking</h2>
                <VehicleMap />
              </Card>

              {/* Crime Heatmap */}
              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-4">Crime Heatmap</h2>
                <CrimeHeatmap />
              </Card>

              {/* Connected Devices */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Connected Devices</h2>
                  <Button variant="outline" onClick={() => navigate("/devices")}>View All</Button>
                </div>
                <div className="space-y-4">
                  {devices?.map((device) => (
                    <DeviceCard
                      key={device.id}
                      type={device.type}
                      name={device.name}
                      status={device.status as "connected" | "disconnected"}
                      batteryLevel={device.battery_level || 0}
                      signalStrength={device.signal_strength || 0}
                      connectionType={device.connection_type as "ble" | "url" | "direct"}
                      streamUrl={device.stream_url}
                      bleId={device.ble_id}
                    />
                  ))}
                </div>
              </Card>

              {/* Active Dispatches */}
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