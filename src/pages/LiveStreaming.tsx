import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Plus, Video, Wifi, Bluetooth } from "lucide-react";

interface StreamDevice {
  id: string;
  name: string;
  type: "camera" | "bluetooth" | "ble" | "api";
  status: "connected" | "disconnected";
  url?: string;
}

const LiveStreaming = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [devices, setDevices] = useState<StreamDevice[]>([
    {
      id: "cam1",
      name: "Security Camera 1",
      type: "camera",
      status: "connected",
      url: "mock-stream-url-1",
    },
  ]);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceType, setNewDeviceType] = useState<string>("");
  const [newDeviceUrl, setNewDeviceUrl] = useState("");

  const handleAddDevice = async () => {
    if (!newDeviceName || !newDeviceType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newDevice: StreamDevice = {
      id: `device-${devices.length + 1}`,
      name: newDeviceName,
      type: newDeviceType as StreamDevice["type"],
      status: "disconnected",
      url: newDeviceUrl,
    };

    setDevices([...devices, newDevice]);
    setNewDeviceName("");
    setNewDeviceType("");
    setNewDeviceUrl("");

    toast({
      title: "Success",
      description: "Device added successfully",
    });
  };

  const handleConnect = async (deviceId: string) => {
    // Mock connection logic
    setDevices(
      devices.map((device) =>
        device.id === deviceId
          ? { ...device, status: "connected" }
          : device
      )
    );

    toast({
      title: "Connected",
      description: "Device connected successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Live Streaming</h1>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Device</h2>
          <div className="grid gap-4">
            <Input
              placeholder="Device Name"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
            />
            <Select onValueChange={setNewDeviceType} value={newDeviceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Device Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="camera">Camera</SelectItem>
                <SelectItem value="bluetooth">Bluetooth</SelectItem>
                <SelectItem value="ble">BLE</SelectItem>
                <SelectItem value="api">API</SelectItem>
              </SelectContent>
            </Select>
            {(newDeviceType === "camera" || newDeviceType === "api") && (
              <Input
                placeholder="Stream URL or API Endpoint"
                value={newDeviceUrl}
                onChange={(e) => setNewDeviceUrl(e.target.value)}
              />
            )}
            <Button onClick={handleAddDevice}>
              <Plus className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          {devices.map((device) => (
            <Card key={device.id} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">{device.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Type: {device.type}
                  </p>
                </div>
                {device.status === "connected" ? (
                  <div className="flex items-center text-accent">
                    <Wifi className="h-4 w-4 mr-1" />
                    <span className="text-sm">Connected</span>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleConnect(device.id)}
                  >
                    Connect
                  </Button>
                )}
              </div>
              {device.type === "camera" && device.status === "connected" && (
                <div className="bg-black aspect-video rounded-lg flex items-center justify-center">
                  <Video className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveStreaming;