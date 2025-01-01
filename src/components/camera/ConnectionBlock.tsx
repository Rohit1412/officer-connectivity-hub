import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Plug, Power, Save, Usb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
          variant={connection?.is_active ? "default" : "secondary"}
          className={connection?.is_active ? "bg-green-500" : ""}
        >
          {connection?.is_active ? "Connected" : "Disconnected"}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Connection Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <Select value={protocol} onValueChange={setProtocol}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Protocol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rtsp">RTSP</SelectItem>
              <SelectItem value="http">HTTP</SelectItem>
              <SelectItem value="https">HTTPS</SelectItem>
              <SelectItem value="rtmp">RTMP</SelectItem>
              <SelectItem value="hls">HLS</SelectItem>
              <SelectItem value="webrtc">WebRTC</SelectItem>
              <SelectItem value="usb">USB Camera</SelectItem>
            </SelectContent>
          </Select>
          {protocol !== 'usb' && (
            <Input
              placeholder="Stream URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
          )}
        </div>

        <div className="flex justify-end space-x-2">
          {connection?.is_active ? (
            <Button
              variant="destructive"
              onClick={handleDisconnect}
              disabled={isConnecting}
            >
              <Power className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              <Plug className="h-4 w-4 mr-2" />
              Connect
            </Button>
          )}
          <Button variant="outline" onClick={handleConnect}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ConnectionBlock;