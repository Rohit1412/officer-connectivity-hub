import { useState, useEffect } from 'react';
import { Device } from '@/types';

export const useDeviceCache = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  // Load devices from localStorage on mount
  useEffect(() => {
    const cachedDevices = localStorage.getItem('connected_devices');
    if (cachedDevices) {
      setDevices(JSON.parse(cachedDevices));
    }
  }, []);

  // Update localStorage whenever devices change
  useEffect(() => {
    localStorage.setItem('connected_devices', JSON.stringify(devices));
  }, [devices]);

  const addDevice = (device: Device) => {
    setDevices(prev => [...prev, device]);
  };

  const removeDevice = (deviceId: string) => {
    setDevices(prev => prev.filter(device => device.id !== deviceId));
  };

  const updateDevice = (deviceId: string, updates: Partial<Device>) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, ...updates } : device
    ));
  };

  return {
    devices,
    addDevice,
    removeDevice,
    updateDevice,
  };
};