interface PowerStatus {
  battery_level: number;
  power_source: string;
}

interface EnvironmentalConditions {
  temperature: number;
  humidity: number;
  box_temperature: number;
}

export interface MotionEventData {
  timestamp: string;
  event_type: string;
  device_id: string;
  location: string;
  motion_detected: boolean;
  media_type: string;
  media_url: string;
  video_duration: null | number;
  video_url: null | string;
  nest_status: string;
  chick_count: number;
  power_status: PowerStatus;
  environmental_conditions: EnvironmentalConditions;
}
