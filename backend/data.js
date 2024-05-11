const response = [
  {
    timestamp: new Date().toISOString(),
    event_type: "motion_detected",
    device_id: "ESP32_CAM_001",
    location: "Campus Bird Nest #1",
    motion_detected: true,
    media_type: "photo",
    media_url:
      "https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_700/MTc1MDE2MDg4ODg1NjAyMDkx/how-to-capture-birds-in-flight-photography-tutorial.webp",
    video_duration: null,
    video_url: null,
    nest_status: "intact",
    chick_count: 4,
    power_status: {
      battery_level: 80,
      power_source: "battery",
    },
    environmental_conditions: {
      temperature: 25.5,
      humidity: 60,
      box_temperature: 28.0,
    },
  },
  {
    timestamp: new Date().toISOString(),
    event_type: "motion_detected",
    device_id: "ESP32_CAM_001",
    location: "Campus Bird Nest #1",
    motion_detected: true,
    media_type: "photo",
    media_url:
      "https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_700/MTc1MDE2MDg4ODg1NjAyMDkx/how-to-capture-birds-in-flight-photography-tutorial.webp",
    video_duration: null,
    video_url: null,
    nest_status: "intact",
    chick_count: 6,
    power_status: {
      battery_level: 34,
      power_source: "battery",
    },
    environmental_conditions: {
      temperature: 35.5,
      humidity: 70,
      box_temperature: 38.0,
    },
  },
];

module.exports = response;
