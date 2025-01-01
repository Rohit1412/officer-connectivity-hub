import React from "react";
import { Button } from "@/components/ui/button";
import { Power, Plug, Save } from "lucide-react";

interface ConnectionActionsProps {
  isActive?: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onSave: () => void;
}

const ConnectionActions = ({
  isActive,
  isConnecting,
  onConnect,
  onDisconnect,
  onSave,
}: ConnectionActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      {isActive ? (
        <Button
          variant="destructive"
          onClick={onDisconnect}
          disabled={isConnecting}
        >
          <Power className="h-4 w-4 mr-2" />
          Disconnect
        </Button>
      ) : (
        <Button
          variant="default"
          onClick={onConnect}
          disabled={isConnecting}
        >
          <Plug className="h-4 w-4 mr-2" />
          Connect
        </Button>
      )}
      <Button variant="outline" onClick={onSave}>
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
    </div>
  );
};

export default ConnectionActions;