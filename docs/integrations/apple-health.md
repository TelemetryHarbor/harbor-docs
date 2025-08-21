---
sidebar_position: 7
title: Apple Health Integration for Telemetry Harbor
description: Use iOS Shortcuts to send Apple Health data (steps, heart rate, etc.) to Telemetry Harbor.
---

# Apple Health Integration for Telemetry Harbor

This guide explains how to use iOS Shortcuts to automatically send Apple Health data (such as steps, heart rate, calories, or sleep) to Telemetry Harbor. This allows you to monitor your health metrics, visualize trends, and correlate them with other telemetry in **Grafana dashboards**.

**_Shortcut Link:_** https://routinehub.co/shortcut/23264/

## Prerequisites

Before starting, ensure you have:

-   An **iPhone** running **iOS 14 or later**.
-   **iOS Shortcuts app** (pre-installed on modern iOS).
-   An active **internet connection** (WiFi or cellular).
-   **Apple Health** app enabled with the relevant permissions.
-   A **Telemetry Harbor account** (free tier available).
-   Basic knowledge of iOS Shortcuts configuration.

## How it Works

This integration uses iOS Shortcuts to fetch health data directly from the Apple Health app, package it into **Telemetry Harbor’s General Data Model**, and send it to your Harbor endpoint via HTTP POST.  

Unlike single-purpose shortcuts, this one is **fully customizable**: you select which health metric (steps, heart rate, calories, etc.) to track. You can even **duplicate the shortcut** to send multiple types of health data in parallel.  

Data is transmitted as a **daily log of raw points** (not aggregated totals). Each data point is only logged once — running the shortcut multiple times for the same period will not create duplicates.


## Setup

### 1. Create a Telemetry Harbor Account

1.  **Sign up** at [Telemetry Harbor](https://telemetryharbor.com/)
2.  **Verify** your email and log in
3.  **Create a Harbor**:
    -   Click **Create Harbor** on your dashboard
    -   Choose a **name** like "AppleHealth_Tracker" and select **General** as the type
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

### 2. Install the Apple Health Shortcut

1.  **Download the shortcut**:
    -   On your iPhone, visit the RoutineHub link.
    -   Tap **Get Shortcut** to download the automation.
    -   When prompted, tap **Add Shortcut** to install it into your Shortcuts library.
2.  **Configure the shortcut**:
    -   Open the **Shortcuts app**.
    -   Find the "Telemetry Harbor - Apple Health Tracker" shortcut.
    -   Tap the **three dots (⋯)** to edit the workflow.
3.  **Select Health Metric**:
    -   In the shortcut actions, choose which Apple Health data type to export (steps, heart rate, sleep, etc.).
4.  **Update API settings**:
    -   Find the **Get Contents of URL** action.
    -   Update:
        -   **URL field**: Replace `https://ENDPOINT_HERE/` with your Harbor API endpoint.
        -   **Headers section**: Replace `API_KEY_HERE` with your actual API key.

### 3. Configuration During Setup

During setup, you’ll need to:

1.  **Enter your Telemetry Harbor API details**:
    -   API Endpoint URL
    -   API Key
2.  **Select the health metric**:
    -   Choose one Apple Health data type to export with this shortcut.
    -   To track multiple metrics, **duplicate the shortcut** and configure each separately.
3.  **Grant permissions**:
    -   Allow access to Apple Health data when prompted.

## Available Metrics

The shortcut can export any supported Apple Health metric. Common examples:

| Metric             | Description                                    |
| :----------------- | :--------------------------------------------- |
| Steps              | Number of steps taken per day                  |
| Heart Rate         | Raw heart rate readings (all day log)          |
| Active Calories    | Calories burned during activity                |
| Resting Heart Rate | Lowest sustained heart rate during rest        |
| Sleep Analysis     | Sleep duration and phases                      |
| Cycling Distance   | Distance traveled via cycling                  |
| Walking Distance   | Distance traveled walking or running           |
| Blood Oxygen (SpO₂)| Oxygen saturation readings                     |
| Mindful Minutes    | Minutes spent in mindfulness exercises         |

*(availability depends on iOS device sensors and permissions granted)*


## Managing Health Data Tracking

### Manual Health Data Logging

-   Open the **Shortcuts app**.
-   Tap your configured health shortcut.
-   Grant Health permissions if prompted.
-   Verify success confirmation.

### Automated Triggers

You can schedule health data exports automatically:

```

Automation Options:

* Time-based triggers (e.g., every day at 12 AM)
* Activity-based triggers (e.g., after workout)
* Charging state triggers (e.g., when charging at night)
* NFC tag triggers

````

⚠️ If you run **multiple duplicated shortcuts**, make sure to leave a time gap between them. Running several at the same time may exceed your Telemetry Harbor plan’s rate limits.

### Automation Setup Steps

1.  Open **Shortcuts app** → **Automation** tab.
2.  Tap **Create Personal Automation**.
3.  Choose your trigger type.
4.  Configure trigger conditions.
5.  Add your health tracking shortcut as the action.
6.  Toggle **"Ask Before Running"** off for true automation.

## Testing and Verification

### First Test Run

1.  Ensure Apple Health permissions are enabled.
2.  Tap your configured shortcut.
3.  Confirm permission prompts for Health data.
4.  Watch for success confirmation.

### Verify Data Transmission

Check your Grafana dashboard:

-   Confirm entries with correct timestamps.
-   Verify the `ship_id` and `cargo_id` match your setup.
-   Confirm raw data points are visible (not daily sums).

## Troubleshooting

### Common Issues

**Shortcut not executing**

-   Confirm Apple Health permissions are granted.
-   Test each action individually with debug mode.

**API connection issues**

-   Verify your API endpoint URL is correct.
-   Check API key formatting in request headers.

**Data not appearing in Grafana**

-   Adjust Grafana dashboard time range.
-   Confirm correct `ship_id` and `cargo_id`.
-   Ensure Telemetry Harbor quota is not exceeded.

**Duplicate runs**

-   Data points are only logged once. Running the same shortcut again for the same date range will not overwrite or duplicate logs.

## Visualizing Data in Grafana

Once your Apple Health data is flowing into Telemetry Harbor:

1.  Log in to Grafana using your Harbor credentials.
2.  Navigate to **Dashboards** → **Comprehensive Telemetry Dashboard**.
3.  Configure health visualization:
    -   Select your Harbor as the data source.
    -   Filter by your `ship_id`.
    -   Filter by the `cargo_id` of the metric (e.g., Steps, HeartRate).
4.  Adjust time ranges to visualize trends.
5.  Combine with other telemetry (e.g., GPS or device health) for full insights.

## Expanding Your Mobile Telemetry

The iOS Shortcuts framework can export additional Apple Health or device metrics. Examples:

-   **Blood oxygen levels**  
-   **Workout summaries**  
-   **Hydration logs**  
-   **Menstrual cycle tracking**  

### Custom Payload Structure

```json
{
  "time": "2024-11-18T19:24:00.948Z",
  "ship_id": "iPhone_Health",
  "cargo_id": "HeartRate",
  "value": 72
}
````

