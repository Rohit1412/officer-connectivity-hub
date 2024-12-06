import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  batteryLevel: number;
  signalStrength: number;
}

const DeviceManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>([
    { 
      id: "1", 
      name: "Body Cam 1", 
      type: "Body Camera", 
      status: "connected",
      batteryLevel: 85,
      signalStrength: 92
    },
    { 
      id: "2", 
      name: "Smart Watch 1", 
      type: "Smartwatch", 
      status: "connected",
      batteryLevel: 75,
      signalStrength: 88
    },
  ]);

  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceType, setNewDeviceType] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

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
        batteryLevel: 100,
        signalStrength: 0
      };

      setDevices([...devices, newDevice]);
      setNewDeviceName("");
      setNewDeviceType("");
      setDialogOpen(false);

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

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Device Management</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Device</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input
                  placeholder="Device Name"
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Select onValueChange={setNewDeviceType} value={newDeviceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Device Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Body Camera">Body Camera</SelectItem>
                    <SelectItem value="Smartwatch">Smartwatch</SelectItem>
                    <SelectItem value="Biometric Sensor">Biometric Sensor</SelectItem>
                    <SelectItem value="GPS Tracker">GPS Tracker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddDevice}>Add Device</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {devices.map((device) => (
          <Card
            key={device.id}
            className="p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300"
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