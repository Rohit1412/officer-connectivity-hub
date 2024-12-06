import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Battery, Signal } from "lucide-react";

interface DeviceCardProps {
  type: string;
  name: string;
  status: "connected" | "disconnected";
  batteryLevel: number;
  signalStrength: number;
}

const DeviceCard = ({
  type,
  name,
  status,
  batteryLevel,
  signalStrength,
}: DeviceCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <Badge
            variant="secondary"
            className="mb-2 text-xs font-medium"
          >
            {type}
          </Badge>
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                status === "connected" ? "bg-accent animate-pulse" : "bg-warning"
              }`}
            />
            <span className="text-sm text-secondary-foreground">
              {status}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-1">
            <Battery className="w-4 h-4" />
            <span className="text-sm">{batteryLevel}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Signal className="w-4 h-4" />
            <span className="text-sm">{signalStrength}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DeviceCard;