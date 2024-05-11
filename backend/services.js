const data = require("./data");
const INTERVAL_TIME = 5000;

const randomIntFromInterval = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomizer = () => {
  setInterval(() => {
    const batteryPower = randomIntFromInterval();
    const chickCount = randomIntFromInterval(1, 20);

    const temperature = randomIntFromInterval(0, 50);
    const boxTemperature = randomIntFromInterval(0, 50);
    const humidity = randomIntFromInterval(0, 100);

    data.push({
      timestamp: new Date().toISOString(),
      event_type: "motion_detected",
      device_id: "ESP32_CAM_001",
      location: "Campus Bird Nest #1",
      motion_detected: true,
      media_type: "photo",
      media_url: "https://picsum.photos/200/300",
      video_duration: null,
      video_url: null,
      nest_status: batteryPower < 20 ? "damaged" : "intact",
      chick_count: chickCount,
      power_status: {
        battery_level: batteryPower,
        power_source: "battery",
      },
      environmental_conditions: {
        temperature: temperature,
        humidity: humidity,
        box_temperature: boxTemperature,
      },
    });
  }, INTERVAL_TIME);
};

module.exports = {
  randomizer,
};