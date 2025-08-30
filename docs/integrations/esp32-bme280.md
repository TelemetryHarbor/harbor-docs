---
sidebar_position: 3
title: ESP32 BME280 Environmental Monitor
description: Build an ESP32-based environmental sensor to send temperature, humidity, and pressure data to Telemetry Harbor.
---

# ESP32 BME280 Environmental Monitor

This guide will walk you through building a **low-power ESP32-based environmental monitor** using a BME280 sensor. The device uses **deep sleep mode** to conserve power, waking up at set intervals to collect a full set of environmental data and send it to your Telemetry Harbor instance for visualization and analysis.

***Repo Link:*** [https://github.com/TelemetryHarbor/harbor-esp32-bme280](https://github.com/TelemetryHarbor/harbor-esp32-bme280)

-----

## Hardware Requirements

| Component | Description | Approximate Cost |
| :--- | :--- | :--- |
| ESP32 | Development board (NodeMCU ESP32, WROOM, etc.) | $3.82 (AliExpress) / $9.90 (Amazon US) |
| BME280 | Temperature, humidity, and pressure sensor module | $4.20 (AliExpress) / $8.99 (Amazon US) |
| Jumper wires | For connecting components | $0.42 (AliExpress) / $5.49 (Amazon US) |
| Micro USB cable | For power & programming | $3.00 (AliExpress) / $5.00 (Amazon US) |
| **Battery** | For long-term standalone, low-power deployment | (Cost varies) |

-----

## Software Requirements

  - Arduino IDE (1.8.13 or newer) or PlatformIO
  - ESP32 board support package
  - Required libraries:
      - Adafruit BME280 Library
      - Adafruit Unified Sensor
      - **Telemetry Harbor SDK** (available via Library Manager)
      - WiFi Library (built into ESP32 core)
  - [Telemetry Harbor](https://telemetryharbor.com) account (free tier available)

-----

## Wiring Diagram

Connect the BME280 sensor to the ESP32 using I2C:

| BME280 Pin | ESP32 Pin | Function |
| :--- | :--- | :--- |
| VCC | 3.3V | Power |
| GND | GND | Ground |
| SDA | GPIO 21 | Data |
| SCL | GPIO 22 | Clock |

-----

## Setup

### 1\. Hardware Assembly

1.  Connect the BME280 sensor to the ESP32 according to the wiring diagram.
2.  Connect the ESP32 to your computer via USB.

### 2\. Software Setup

1.  Install the Arduino IDE.
2.  Add ESP32 board support by adding this URL in Preferences \> Additional Boards Manager URLs:
    ```
    https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
    ```
3.  Install the required libraries via the Library Manager:
      - Adafruit BME280 Library
      - Adafruit Unified Sensor
      - **Telemetry Harbor SDK** (Search for "TelemetryHarborSDK")

### 3\. Telemetry Harbor Configuration

1.  Create a [Telemetry Harbor](https://telemetryharbor.com) account.
2.  Create a new Harbor called "ESP32\_Environmental\_Monitor" (or your preferred name).
3.  Select "General" harbor type and "Free" specification.
4.  Copy your **API ENDPOINT** and **API Key** from the Harbor details page.

### 4\. Configure and Upload the Code

1.  Open the `ESP32_BME280_Telemetry.ino` file in the Arduino IDE.
2.  Update the following variables at the top of the file:
      - WiFi SSID and password
      - Telemetry Harbor API Endpoint URL and API Key
      - Adjust the `shipId` to your desired name (e.g., "Living Room").
3.  Select your ESP32 board model from Tools \> Board.
4.  Select the correct COM port from Tools \> Port.
5.  Upload the code.

### 5\. Visualize Your Data

1.  Access your Telemetry Harbor account.
2.  Navigate to the Harbor details page and copy your Grafana password.
3.  Access the Grafana dashboard using the provided endpoint.
4.  Log in with your Telemetry Harbor email and the Grafana password.
5.  Navigate to Dashboards and select the Comprehensive Telemetry Dashboard to see your data.

-----

## Customization

### Sleep Interval

To change how frequently the ESP32 wakes up and sends data, modify the `SLEEP_INTERVAL_SEC` variable in the code. The default is 5 minutes (300 seconds).

```cpp
const int SLEEP_INTERVAL_SEC = 5 * 60; // 5 minutes
```

### Sensor Calibration

You can adjust the sensor offsets for more accurate readings.

```cpp
const float TEMP_OFFSET = 0.0;     // Adjust temperature by degrees Celsius
const float HUMIDITY_OFFSET = 0.0; // Adjust humidity by percentage
const float PRESSURE_OFFSET = 0.0; // Adjust pressure by hPa
```

-----

## Troubleshooting

### Common Issues

  - **BME280 not found**: Double-check your wiring or try the alternate I2C address (0x76 or 0x77).
  - **WiFi connection failure**: Verify your credentials. The device will automatically go back to sleep if it can't connect, so wait for the next wakeup cycle.
  - **Data not appearing in Telemetry Harbor**: Verify your API key and API Endpoint URL are correct.

### Debug Mode

The new code has minimal serial output to save power. All of the core logic runs within the `setup()` function before the device goes to sleep. The `loop()` function is empty. To debug, add `Serial.println()` statements within the `setup()` function before the `esp_deep_sleep_start()` call. Monitor the serial output at **115200 baud**.
