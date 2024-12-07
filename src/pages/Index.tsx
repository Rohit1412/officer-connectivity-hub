import React from "react";
import { useNavigate } from "react-router-dom";
import DeviceCard from "@/components/DeviceCard";
import VideoAnalysis from "@/components/VideoAnalysis";
import AlertSystem from "@/components/AlertSystem";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Database, Brain, Sun, Moon, Video } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const mockDevices = [
  {
    type: "Body Camera",
    name: "BC-001",
    status: "connected" as const,
    batteryLevel: 85,
    signalStrength: 92,
  },
  {
    type: "Smartwatch",
    name: "SW-102",
    status: "connected" as const,
    batteryLevel: 65,
    signalStrength: 88,
  },
  {
    type: "Biometric Sensor",
    name: "BS-304",
    status: "connected" as const,
    batteryLevel: 90,
    signalStrength: 95,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Officer Dashboard</h1>
          <p className="text-secondary">Connected Devices & Vital Signs</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </header>

      <div className="flex gap-4 mb-8 flex-wrap">
        <Button
          onClick={() => navigate("/data")}
          className="flex items-center"
        >
          <Database className="mr-2 h-4 w-4" />
          Manage Data
        </Button>
        <Button
          onClick={() => navigate("/devices")}
          className="flex items-center"
        >
          <Activity className="mr-2 h-4 w-4" />
          Manage Devices
        </Button>
        <Button
          onClick={() => navigate("/analytics")}
          className="flex items-center"
        >
          <Brain className="mr-2 h-4 w-4" />
          ML Analytics
        </Button>
        <Button
          onClick={() => navigate("/live")}
          className="flex items-center"
          variant="secondary"
        >
          <Video className="mr-2 h-4 w-4" />
          Live Streaming
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDevices.map((device, index) => (
          <DeviceCard key={index} {...device} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoAnalysis />
        </div>
        <div>
          <AlertSystem />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold">Vital Signs</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Heart Rate</span>
              <span className="font-medium">75 BPM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Blood Pressure</span>
              <span className="font-medium">120/80</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Stress Level</span>
              <span className="font-medium">Normal</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold">Activity</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Steps</span>
              <span className="font-medium">8,432</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Distance</span>
              <span className="font-medium">3.2 km</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Active Hours</span>
              <span className="font-medium">4.5 hrs</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;