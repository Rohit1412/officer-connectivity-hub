import React from "react";
import { Bell, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Alert {
  id: string;
  type: "warning" | "critical" | "info";
  message: string;
  timestamp: string;
}

const AlertSystem = () => {
  const { toast } = useToast();
  const [alerts] = React.useState<Alert[]>([
    {
      id: "1",
      type: "critical",
      message: "High heart rate detected - Officer Johnson",
      timestamp: "Just now",
    },
    {
      id: "2",
      type: "warning",
      message: "Low signal strength - Body Camera BC002",
      timestamp: "2m ago",
    },
  ]);

  // Simulate receiving a new alert
  React.useEffect(() => {
    const interval = setInterval(() => {
      toast({
        title: "New Alert",
        description: "Suspicious activity detected in Sector B",
        variant: "destructive",
      });
    }, 30000); // Show alert every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-accent" />
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
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle
                className={`w-4 h-4 ${
                  alert.type === "critical" ? "text-destructive" : "text-warning"
                }`}
              />
              <div>
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertSystem;