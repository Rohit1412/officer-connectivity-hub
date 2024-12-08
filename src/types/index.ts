export interface Officer {
  id: string;
  created_at: string;
  name: string;
  badge_number: string;
  department: string;
}

export interface Device {
  id: string;
  created_at: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  battery_level: number;
  signal_strength: number;
}

export interface Analytics {
  id: string;
  created_at: string;
  object_detection: any;
  activity_recognition: any;
  anomaly_detection: any;
  device_id: string;
  officer_id: string;
}