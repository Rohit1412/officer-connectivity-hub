import React, { useState, useEffect } from "react";
import { Bell, AlertTriangle, Shield, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
  location?: string;
  status: "active" | "acknowledged";
}

const AlertSystem = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "critical",
      message: "High heart rate detected - Officer Johnson",
      timestamp: "Just now",
      location: "Sector A",
      status: "active",
    },
    {
      id: "2",
      type: "warning",
      message: "Low signal strength - Body Camera BC002",
      timestamp: "2m ago",
      location: "Sector B",
      status: "active",
    },
    {
      id: "3",
      type: "info",
      message: "Shift change notification",
      timestamp: "5m ago",
      status: "acknowledged",
    },
  ]);

  useEffect(() => {
    // Simulate receiving new alerts
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? "critical" : Math.random() > 0.5 ? "warning" : "info",
        message: "Suspicious activity detected",
        timestamp: "Just now",
        location: `Sector ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
        status: "active",
      } as Alert;

      setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
      
      if (newAlert.type === "critical") {
        toast({
          title: "Critical Alert",
          description: newAlert.message,
          variant: "destructive",
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [toast]);

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: "acknowledged" } : alert
      )
    );
    toast({
      title: "Alert Acknowledged",
      description: "The alert has been marked as acknowledged.",
    });
  };

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <Bell className="w-4 h-4 text-warning" />;
      case "info":
        return <Info className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold">Real-time Alerts</h2>
        </div>
        <Badge variant="outline" className="animate-pulse">
          Live
        </Badge>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg ${
              alert.status === "active" ? "border-l-4 border-accent" : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              {getAlertIcon(alert.type)}
              <div>
                <p className="text-sm font-medium">{alert.message}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{alert.timestamp}</span>
                  {alert.location && (
                    <>
                      <span>•</span>
                      <span>{alert.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {alert.status === "active" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => acknowledgeAlert(alert.id)}
              >
                Acknowledge
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertSystem;