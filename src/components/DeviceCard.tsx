import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Battery, Signal, Bluetooth, Globe } from "lucide-react";

interface DeviceCardProps {
  type: string;
  name: string;
  status: "connected" | "disconnected";
  batteryLevel: number;
  signalStrength: number;
  connectionType: 'ble' | 'url' | 'direct';
  streamUrl?: string;
  bleId?: string;
}

const DeviceCard = ({
  type,
  name,
  status,
  batteryLevel,
  signalStrength,
  connectionType,
  streamUrl,
  bleId,
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
          {connectionType === 'ble' && bleId && (
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Bluetooth className="w-4 h-4 mr-1" />
              <span>BLE ID: {bleId}</span>
            </div>
          )}
          {connectionType === 'url' && streamUrl && (
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4 mr-1" />
              <span className="truncate max-w-[200px]">{streamUrl}</span>
            </div>
          )}
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