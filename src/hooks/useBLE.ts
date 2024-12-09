import { useState, useEffect } from 'react';
import { BLEDevice } from '@/types';
import { useToast } from '@/components/ui/use-toast';

export const useBLE = () => {
  const [devices, setDevices] = useState<BLEDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const startScanning = async () => {
    if (!navigator.bluetooth) {
      toast({
        title: "Bluetooth Not Supported",
        description: "Your browser doesn't support Bluetooth functionality.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsScanning(true);
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service']
      });

      if (device) {
        setDevices(prev => [...prev, {
          id: device.id,
          name: device.name || 'Unknown Device',
          rssi: -1 // RSSI not available immediately
        }]);
      }
    } catch (error) {
      toast({
        title: "Scanning Error",
        description: error instanceof Error ? error.message : "Failed to scan for devices",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };

  return {
    devices,
    isScanning,
    startScanning
  };
};