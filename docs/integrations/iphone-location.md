---
sidebar_position: 6
title: iPhone Location Tracking
description: Use iOS Shortcuts to send your iPhone's location data to Telemetry Harbor.
---

# iPhone Location Tracking

This guide explains how to use iOS Shortcuts to automatically send your iPhone's location data (latitude and longitude) to Telemetry Harbor. This allows you to track your device's movement, visualize routes, and integrate location data with other telemetry.

**_Shortcut Link:_** https://routinehub.co/shortcut/22659/


## Prerequisites

Before starting, ensure you have:

-   An **iPhone** running **iOS 14 or later**.
-   **iOS Shortcuts app** (pre-installed on modern iOS).
-   An active **internet connection** (WiFi or cellular).
-   **Location Services** enabled on your iPhone.
-   A **Telemetry Harbor account** (free tier available).
-   Basic knowledge of iOS Shortcuts configuration.

## How it Works

This integration leverages the powerful automation capabilities of iOS Shortcuts. A custom shortcut is created that fetches your iPhone's current location, formats the latitude and longitude into two separate Telemetry Harbor [General Harbor Data Type Model](../introduction/concepts.md#general-harbor-data-type-model) data points, and then sends them to your Telemetry Harbor single ingestion endpoint using HTTP POST requests. You can then set up automations to trigger this shortcut periodically or based on specific events.

<img src="/placeholder.svg?height=300&width=500" alt="Diagram showing iPhone to iOS Shortcut to Telemetry Harbor" />

## Setup

### 1. Create a Telemetry Harbor Account

1.  **Sign up** at [Telemetry Harbor](https://harborscale.com/)
2.  **Verify** your email and log in
3.  **Create a Harbor**:
    -   Click **Create Harbor** on your dashboard
    -   Choose a **name** like "iPhone_Location_Tracker" and select **General** as the type
    -   Select the **Free** plan (or upgrade for more data capacity)
    -   Click **Create**
4.  **Retrieve your credentials**:
    -   After creation, go to **View Details**
    -   Note down:
        -   `API Endpoint` (single data point endpoint)
        -   `API Key`
        -   `Grafana Endpoint`
        -   `Grafana Username`
        -   `Grafana Password`

### 2. Install the iPhone Location Shortcut

1.  **Download the shortcut**:
    -   On your iPhone, visit the RoutineHub link (or a similar trusted source for iOS Shortcuts).
    -   Tap **Get Shortcut** to download the automation.
    -   When prompted, tap **Add Shortcut** to install it to your Shortcuts library.
2.  **Configure the shortcut**:
    -   Open the **Shortcuts app** on your iPhone.
    -   Find the "iPhone Location Tracker - Telemetry Harbor" shortcut.
    -   Tap the **three dots (⋯)** to edit the shortcut workflow.
3.  **Update API settings**:
    -   Look for the **Get Contents of URL** actions (there are two - one for latitude, one for longitude).
    -   In each action, update:
        -   **URL field**: Replace `https://YOUR_ENDPOINT/` with your Telemetry Harbor API endpoint.
        -   **Headers section**: Replace `API-KEY-HERE` with your actual API key.
        -   **Request Body**: Customize the `ship_id` value to identify your device.

### 3. Configuration During Setup

During shortcut configuration, you'll need to:

1.  **Enter your Telemetry Harbor API details**:
    -   API Endpoint URL
    -   API Key
2.  **Configure device identification**:
    -   Set a unique `ship_id` to identify your iPhone.
    -   Choose descriptive names for easy identification in Grafana.
3.  **Grant necessary permissions**:
    -   Allow location access when prompted.
    -   Enable location services for the Shortcuts app.

## Available Metrics

The iPhone location tracking shortcut collects the following metrics:

| Metric    | Description                                  |
| :-------- | :------------------------------------------- |
| Latitude  | Geographic latitude coordinate in decimal degrees |
| Longitude | Geographic longitude coordinate in decimal degrees |
| Timestamp | UTC timestamp when location was captured     |

## Sample Device Configurations

Configure different device identifiers for various use cases:

| Ship ID         | Use Case                       |
| :-------------- | :----------------------------- |
| iPhone_Personal | Personal location tracking     |
| iPhone_Work     | Work-related location logging  |
| iPhone_Field    | Field engineer location tracking |
| iPhone_Delivery | Delivery route monitoring      |
| iPhone_Travel   | Travel and trip logging        |

## Managing Location Tracking

### Manual Location Logging

-   Open the **Shortcuts app**.
-   Tap your configured location shortcut.
-   Grant location access when prompted.
-   Verify success confirmation.

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

1.  Open **Shortcuts app** → **Automation** tab.
2.  Tap **Create Personal Automation**.
3.  Choose your trigger type.
4.  Configure trigger conditions.
5.  Add your location tracking shortcut as the action.
6.  Toggle **"Ask Before Running"** off for true automation.

## Testing and Verification

### First Test Run

1.  Ensure **location services** are enabled.
2.  Tap your configured shortcut.
3.  Grant location access when prompted.
4.  Watch for success confirmation.

### Verify Data Transmission

Check your Grafana dashboard to confirm data arrival:

-   **Timestamp** entries
-   **Latitude/Longitude** coordinates
-   **Ship ID** (your device identifier)
-   **Cargo ID** ("Latitude" and "Longitude")

## Troubleshooting

### Common Issues

**Shortcut not executing**

-   Check that location services are enabled for the Shortcuts app.
-   Verify the shortcut has permission to access location data.
-   Test each action individually using debug mode.

**API connection issues**

-   Verify your API endpoint URL is correct and includes the full path.
-   Confirm your API key is properly formatted in request headers.
-   Test with Shortcuts app debug mode to validate credentials.

**Data not appearing in Grafana**

-   Check the time range in your Grafana dashboard.
-   Verify `ship_id` and `cargo_id` filters match your shortcut configuration.
-   Ensure your Telemetry Harbor account has sufficient quota.

**"Invalid format" error in shortcut**

-   Ensure JSON payload formatting is correct.
-   Check that all required fields are populated.
-   Verify API endpoint accepts your data format.

**Location access denied**

-   Go to **Settings** → **Privacy & Security** → **Location Services**.
-   Enable location services for **Shortcuts app**.
-   Reset location permissions if needed.

## Visualizing Data in Grafana

Once your iPhone location data is flowing into Telemetry Harbor, you can visualize it in Grafana:

1.  Log in to your Grafana instance using the credentials from your Harbor setup.
2.  Navigate to **Dashboards** → **Comprehensive Telemetry Dashboard**.
3.  Configure location visualization:
    -   Select your harbor as the data source.
    -   Filter by your device's `ship_id`.
    -   In `cargo_id` filter choose both "Longitude" and "Latitude".
4.  Adjust time ranges to see historical location patterns.
5.  Use the map panel to view location heatmaps and tracking paths.

## Expanding Your Mobile Telemetry

The iOS Shortcuts framework can capture additional iPhone data:

### Additional Data Sources

-   **Weather data** from current location.
-   **Device health metrics** (battery level, storage).
-   **Motion data** (steps, activity level).
-   **Network information** (connection type, signal strength).
-   **Calendar events** and scheduling data.

### Custom Payload Structure

```json
{
  "time": "2024-11-18T19:24:00.948Z",
  "ship_id": "iPhone_Device_ID",
  "cargo_id": "Data_Label",
  "value": 0
}
```
