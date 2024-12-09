import React from "react";
import { useNavigate } from "react-router-dom";
import DeviceCard from "@/components/DeviceCard";
import VideoAnalysis from "@/components/VideoAnalysis";
import AlertSystem from "@/components/AlertSystem";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Sun, Moon, Video, Bell, Shield, MapPin, FileText } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useDevices, useStreamConnections } from "@/hooks/useSupabase";
import { useBLE } from "@/hooks/useBLE";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { data: devices, isLoading, error } = useDevices();
  const { startScanning, isScanning } = useBLE();
  const { data: streamConnections } = useStreamConnections();

  React.useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading devices",
        description: "Please try again later",
      });
    }
  }, [error]);

  const handleScanBLE = () => {
    if (!isScanning) {
      startScanning();
    }
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Button
          onClick={() => navigate("/alerts")}
          className="flex items-center justify-center gap-2 h-16 bg-primary hover:bg-primary/90"
          variant="default"
        >
          <Bell className="h-5 w-5" />
          Emergency Alerts
        </Button>
        <Button
          onClick={() => navigate("/tracking")}
          className="flex items-center justify-center gap-2 h-16 bg-primary hover:bg-primary/90"
          variant="default"
        >
          <MapPin className="h-5 w-5" />
          Officer Tracking
        </Button>
        <Button
          onClick={() => navigate("/evidence")}
          className="flex items-center justify-center gap-2 h-16 bg-primary hover:bg-primary/90"
          variant="default"
        >
          <FileText className="h-5 w-5" />
          Digital Evidence
        </Button>
        <Button
          onClick={() => navigate("/security")}
          className="flex items-center justify-center gap-2 h-16 bg-primary hover:bg-primary/90"
          variant="default"
        >
          <Shield className="h-5 w-5" />
          Security Center
        </Button>
        <Button
          onClick={() => navigate("/live")}
          className="flex items-center justify-center gap-2 h-16 bg-primary hover:bg-primary/90"
          variant="default"
        >
          <Video className="h-5 w-5" />
          Live Streaming
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Connected Devices</h2>
        <Button onClick={handleScanBLE} disabled={isScanning}>
          {isScanning ? "Scanning..." : "Scan for BLE Devices"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Loading devices...</p>
        ) : devices ? (
          devices.map((device) => (
            <DeviceCard
              key={device.id}
              type={device.type}
              name={device.name}
              status={device.status}
              batteryLevel={device.battery_level}
              signalStrength={device.signal_strength}
              connectionType={device.connection_type}
              streamUrl={device.stream_url}
              bleId={device.ble_id}
            />
          ))
        ) : null}
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
