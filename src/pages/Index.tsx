import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Activity, AlertTriangle, Shield, Camera, Users, MapPin } from "lucide-react";
import { useStreamConnections } from "@/hooks/useSupabase";

const Index = () => {
  const navigate = useNavigate();
  const [activeOfficers, setActiveOfficers] = useState(24);
  const [activeAlerts, setActiveAlerts] = useState(0);
  const [securityStatus, setSecurityStatus] = useState("Normal");
  
  const { data: connections } = useStreamConnections();
  const activeConnections = connections?.filter(conn => conn.is_active)?.length || 0;

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

  const cards = [
    {
      title: "Active Officers",
      value: activeOfficers,
      icon: <Users className="w-4 h-4 text-accent" />,
      onClick: () => navigate("/officers")
    },
    {
      title: "Active Cameras",
      value: activeConnections,
      icon: <Camera className="w-4 h-4 text-accent" />,
      onClick: () => navigate("/camera-streaming")
    },
    {
      title: "Active Alerts",
      value: activeAlerts,
      icon: <AlertTriangle className="w-4 h-4 text-warning" />,
      onClick: () => navigate("/alerts")
    },
    {
      title: "Security Status",
      value: securityStatus,
      icon: <Shield className="w-4 h-4 text-accent" />,
      onClick: () => navigate("/security")
    }
  ];

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cards.map((card, index) => (
                <Card 
                  key={index} 
                  className="p-4 hover:shadow-lg transition-all cursor-pointer"
                  onClick={card.onClick}
                >
                  <div className="flex items-center space-x-2">
                    {card.icon}
                    <span>{card.title}</span>
                  </div>
                  <p className={`text-2xl font-bold mt-2 ${
                    card.title === "Security Status" 
                      ? card.value === "Critical" 
                        ? "text-destructive" 
                        : card.value === "Warning" 
                          ? "text-warning" 
                          : "text-accent"
                      : ""
                  }`}>
                    {card.value}
                  </p>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <Button variant="outline" onClick={() => navigate("/activity")}>
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">No recent activity</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Active Locations</h2>
                  <Button variant="outline" onClick={() => navigate("/locations")}>
                    View Map
                  </Button>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">No active locations</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;