import React from "react";
import { Badge } from "@/components/ui/badge";
import { Camera, Usb } from "lucide-react";

interface ConnectionHeaderProps {
  isActive?: boolean;
  protocol?: string;
}

const ConnectionHeader = ({ isActive, protocol }: ConnectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {protocol === 'usb' ? (
          <Usb className="h-5 w-5" />
        ) : (
          <Camera className="h-5 w-5" />
        )}
        <h3 className="font-medium">Camera Connection</h3>
      </div>
      <Badge
        variant={isActive ? "default" : "secondary"}
        className={isActive ? "bg-green-500" : ""}
      >
        {isActive ? "Connected" : "Disconnected"}
      </Badge>
    </div>
  );
};

export default ConnectionHeader;