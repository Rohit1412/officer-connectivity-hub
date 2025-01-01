import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ConnectionHeader from "./ConnectionHeader";
import ConnectionForm from "./ConnectionForm";
import ConnectionActions from "./ConnectionActions";

interface ConnectionBlockProps {
  connection?: {
    id: string;
    url: string;
    protocol: string;
    status: string;
    is_active: boolean;
    connection_name: string;
  };
  onSave?: () => void;
}

const ConnectionBlock = ({ connection, onSave }: ConnectionBlockProps) => {
  const [url, setUrl] = useState(connection?.url || "");
  const [protocol, setProtocol] = useState(connection?.protocol || "http");
  const [name, setName] = useState(connection?.connection_name || "");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (protocol === 'usb') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setUrl('usb://local');
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to access USB camera",
          variant: "destructive",
        });
        return;
      }
    } else if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      const { error } = await supabase
        .from("stream_connections")
        .upsert({
          url: protocol === 'usb' ? 'usb://local' : url,
          protocol,
          connection_name: name,
          status: "connected",
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Camera connected successfully",
      });
      
      if (onSave) onSave();
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to camera",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!connection?.id) return;

    try {
      const { error } = await supabase
        .from("stream_connections")
        .update({
          status: "disconnected",
          is_active: false,
        })
        .eq("id", connection.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Camera disconnected successfully",
      });
      
      if (onSave) onSave();
    } catch (error) {
      console.error("Disconnection error:", error);
      toast({
        title: "Error",
        description: "Failed to disconnect camera",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <ConnectionHeader 
        isActive={connection?.is_active} 
        protocol={protocol}
      />
      <ConnectionForm
        url={url}
        protocol={protocol}
        name={name}
        onUrlChange={setUrl}
        onProtocolChange={setProtocol}
        onNameChange={setName}
      />
      <ConnectionActions
        isActive={connection?.is_active}
        isConnecting={isConnecting}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        onSave={handleConnect}
      />
    </Card>
  );
};

export default ConnectionBlock;