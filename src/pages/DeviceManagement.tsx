import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Device {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected";
}

const DeviceManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>([
    { id: "1", name: "Body Cam 1", type: "Body Camera", status: "connected" },
    { id: "2", name: "Smart Watch 1", type: "Smartwatch", status: "connected" },
  ]);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceType, setNewDeviceType] = useState("");

  const handleAddDevice = () => {
    if (newDeviceName && newDeviceType) {
      if (devices.length >= 10) {
        toast({
          title: "Maximum Devices Reached",
          description: "You can't add more than 10 devices.",
          variant: "destructive",
        });
        return;
      }

      const newDevice: Device = {
        id: (devices.length + 1).toString(),
        name: newDeviceName,
        type: newDeviceType,
        status: "disconnected",
      };

      setDevices([...devices, newDevice]);
      setNewDeviceName("");
      setNewDeviceType("");

      toast({
        title: "Device Added",
        description: `${newDeviceName} has been added successfully.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <h1 className="text-3xl font-bold mb-6">Device Management</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Device</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Device Name"
            value={newDeviceName}
            onChange={(e) => setNewDeviceName(e.target.value)}
          />
          <Select onValueChange={setNewDeviceType} value={newDeviceType}>
            <SelectTrigger>
              <SelectValue placeholder="Device Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Body Camera">Body Camera</SelectItem>
              <SelectItem value="Smartwatch">Smartwatch</SelectItem>
              <SelectItem value="Biometric Sensor">Biometric Sensor</SelectItem>
              <SelectItem value="GPS Tracker">GPS Tracker</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddDevice}>
            <Plus className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </div>
      </Card>

      <div className="grid gap-4">
        {devices.map((device) => (
          <Card
            key={device.id}
            className="p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{device.name}</h3>
              <p className="text-sm text-gray-500">{device.type}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  device.status === "connected"
                    ? "bg-accent animate-pulse"
                    : "bg-gray-300"
                }`}
              />
              <span className="text-sm text-gray-500">{device.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeviceManagement;