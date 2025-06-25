---
sidebar_position: 6
title: iPhone Location Tracking
description: Detailed guide for setting up iPhone Location Tracking with iOS Shortcuts for Telemetry Harbor
---

# iPhone Location Tracking Agent

Easily collect and visualize location data from your iPhone using **iOS Shortcuts** with **Telemetry Harbor** and **Grafana**.

**_Repo Link:_** https://routinehub.co/shortcut/22659/

## Features
- Collect GPS coordinates (latitude and longitude) from your iPhone
- Real-time location tracking with timestamp data
- One-tap manual location logging
- Automated location triggers based on time, location, or activities
- Customizable device identification
- Interactive iOS Shortcuts interface
- No additional hardware required - works with any iPhone
- Professional-grade location monitoring and visualization

## Prerequisites

Before starting, ensure you have:
- An **iPhone** running **iOS 14 or later**
- **iOS Shortcuts app** (pre-installed on modern iOS)
- An active **internet connection** (WiFi or cellular)
- **Location Services** enabled on your iPhone
- Basic knowledge of iOS Shortcuts configuration

## Setup
### 1. Create a Telemetry Harbor Account
1. **Sign up** at [Telemetry Harbor](https://telemetryharbor.com/)
2. **Verify** your email and log in
3. **Create a Harbor**:
   - Click **Create Harbor** on your dashboard
   - Choose a **name** like "iPhone_Location_Tracker" and select **General** as the type
   - Select the **Free** plan (or upgrade for more data capacity)
   - Click **Create**

4. **Retrieve your credentials**:
   - After creation, go to **View Details**
   - Note down:
     - `API Endpoint` (single data point endpoint)
     - `API Key`
     - `Grafana Endpoint`
     - `Grafana Username`
     - `Grafana Password`

### 2. Install the iPhone Location Shortcut
1. **Download the shortcut**:
   - On your iPhone, visit the RoutineHub link
   - Tap **Get Shortcut** to download the automation
   - When prompted, tap **Add Shortcut** to install it to your Shortcuts library

2. **Configure the shortcut**:
   - Open the **Shortcuts app** on your iPhone
   - Find the "iPhone Location Tracker - Telemetry Harbor" shortcut
   - Tap the **three dots (⋯)** to edit the shortcut workflow

3. **Update API settings**:
   - Look for the **Get Contents of URL** actions (there are two - one for latitude, one for longitude)
   - In each action, update:
     - **URL field**: Replace `https://YOUR_ENDPOINT/` with your Telemetry Harbor API endpoint
     - **Headers section**: Replace `API-KEY-HERE` with your actual API key
     - **Request Body**: Customize the `ship_id` value to identify your device

### 3. Configuration During Setup

During shortcut configuration, you'll need to:

1. **Enter your Telemetry Harbor API details**:
   - API Endpoint URL
   - API Key

2. **Configure device identification**:
   - Set a unique `ship_id` to identify your iPhone
   - Choose descriptive names for easy identification in Grafana

3. **Grant necessary permissions**:
   - Allow location access when prompted
   - Enable location services for the Shortcuts app

## Available Metrics

The iPhone location tracking shortcut collects the following metrics:

| Metric | Description |
|--------|-------------|
| Latitude | Geographic latitude coordinate in decimal degrees |
| Longitude | Geographic longitude coordinate in decimal degrees |
| Timestamp | UTC timestamp when location was captured |

## Sample Device Configurations

Configure different device identifiers for various use cases:

| Ship ID | Use Case |
|---------|----------|
| iPhone_Personal | Personal location tracking |
| iPhone_Work | Work-related location logging |
| iPhone_Field | Field engineer location tracking |
| iPhone_Delivery | Delivery route monitoring |
| iPhone_Travel | Travel and trip logging |

## Managing Location Tracking

### Manual Location Logging
- Open the **Shortcuts app**
- Tap your configured location shortcut
- Grant location access when prompted
- Verify success confirmation

### Automated Triggers
Set up automated location tracking using iOS Shortcuts Automation:

```
Automation Options:
- Time-based triggers (hourly, daily)
- Location-based triggers (arrive/leave locations)
- Activity-based triggers (start/end workout)
- NFC tag triggers
- Device state triggers (connect to CarPlay)
```

### Automation Setup Steps
1. Open **Shortcuts app** → **Automation** tab
2. Tap **Create Personal Automation**
3. Choose your trigger type
4. Configure trigger conditions
5. Add your location tracking shortcut as the action
6. Toggle **"Ask Before Running"** off for true automation

## Testing and Verification

### First Test Run
1. Ensure **location services** are enabled
2. Tap your configured shortcut
3. Grant location access when prompted
4. Watch for success confirmation

### Verify Data Transmission
Check your Grafana dashboard to confirm data arrival:
- **Timestamp** entries
- **Latitude/Longitude** coordinates
- **Ship ID** (your device identifier)
- **Cargo ID** ("Latitude" and "Longitude")

## Troubleshooting

### Common Issues

**Shortcut not executing**
- Check that location services are enabled for the Shortcuts app
- Verify the shortcut has permission to access location data
- Test each action individually using debug mode

**API connection issues**
- Verify your API endpoint URL is correct and includes the full path
- Confirm your API key is properly formatted in request headers
- Test with Shortcuts app debug mode to validate credentials

**Data not appearing in Grafana**
- Check the time range in your Grafana dashboard
- Verify `ship_id` and `cargo_id` filters match your shortcut configuration
- Ensure your Telemetry Harbor account has sufficient quota

**"Invalid format" error in shortcut**
- Ensure JSON payload formatting is correct
- Check that all required fields are populated
- Verify API endpoint accepts your data format

**Location access denied**
- Go to **Settings** → **Privacy & Security** → **Location Services**
- Enable location services for **Shortcuts app**
- Reset location permissions if needed

## Visualizing Data in Grafana

Once your iPhone location data is flowing into Telemetry Harbor, you can visualize it in Grafana:

1. Log in to your Grafana instance using the credentials from your Harbor setup
2. Navigate to **Dashboards** → **Comprehensive Telemetry Dashboard**
3. Configure location visualization:
   - Select your harbor as the data source
   - Filter by your device's `ship_id`
   - In `cargo_id` filter choose both "Longitude" and "Latitude"
4. Adjust time ranges to see historical location patterns
5. Use the map panel to view location heatmaps and tracking paths

## Expanding Your Mobile Telemetry

The iOS Shortcuts framework can capture additional iPhone data:

### Additional Data Sources
- **Weather data** from current location
- **Device health metrics** (battery level, storage)
- **Motion data** (steps, activity level)
- **Network information** (connection type, signal strength)
- **Calendar events** and scheduling data

### Custom Payload Structure
```json
{
  "time": "2024-11-18T19:24:00.948Z",
  "ship_id": "iPhone_Device_ID",
  "cargo_id": "Data_Label",
  "value": 0
}
```
