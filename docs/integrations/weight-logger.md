---
sidebar_position: 8
title: Weight Logging Integration
description: Use iOS Shortcuts to manually log your weight into Telemetry Harbor.
---

# Weight Logging Integration

This guide explains how to use iOS Shortcuts to manually log your **weight** into Telemetry Harbor. Once logged, your data is instantly viewable in **Grafana dashboards**, allowing you to monitor trends and correlate them with other telemetry (steps, calories, sleep, etc.).

**_Shortcut Link:_** https://routinehub.co/shortcut/23593/


## Prerequisites

Before starting, ensure you have:

-   An **iPhone** running **iOS 14 or later**.  
-   **iOS Shortcuts app** (pre-installed on modern iOS).  
-   An active **internet connection** (WiFi or cellular).  
-   A **Telemetry Harbor account** (free tier available).  
-   Basic knowledge of iOS Shortcuts configuration.  

## How it Works

This Shortcut is designed for **manual entry**:  

1. When run, it **asks you for your current weight**.  
2. Packages that input into **Telemetry Harbor’s General Data Model**.  
3. Sends it to your Harbor endpoint via HTTP POST.  

Each run creates a **single timestamped log entry**, ensuring no duplicates.  

## Setup

### 1. Create a Telemetry Harbor Account

1.  **Sign up** at [Telemetry Harbor](https://harborscale.com/).  
2.  **Verify** your email and log in.  
3.  **Create a Harbor**:  
    -   Click **Create Harbor** on your dashboard.  
    -   Choose a **name** like `"Weight_Tracker"` and select **General** as the type.  
    -   Select the **Free** plan (or upgrade for more capacity).  
    -   Click **Create**.  
4.  **Retrieve your credentials**:  
    -   Go to **View Details**.  
    -   Note down:  
        -   `API Endpoint`  
        -   `API Key`  
        -   `Grafana Endpoint`  
        -   `Grafana Username`  
        -   `Grafana Password`  

### 2. Install the Weight Logging Shortcut

1.  **Download the shortcut**:  
    -   On your iPhone, open the [RoutineHub link](https://routinehub.co/shortcut/23593/).  
    -   Tap **Get Shortcut** → **Add Shortcut**.  
2.  **Configure the shortcut**:  
    -   Open the **Shortcuts app**.  
    -   Locate `"Weight Logger - Telemetry Harbor"`.  
    -   Tap the **three dots (⋯)** to edit.  
3.  **Update API settings**:  
    -   In the **Get Contents of URL** action, update:  
        -   **URL field** → Replace `https://ENDPOINT_HERE/` with your Harbor API endpoint.  
        -   **Headers section** → Replace `API_KEY_HERE` with your actual API key.  
    -   (Optional) Adjust the **cargo_id** to include your unit (e.g., `"Weight_kg"` or `"Weight_lbs"`).  


## How to Use

1.  Run the Shortcut manually (via **Shortcuts app**, **Home Screen**, or **Siri**).  
2.  Enter your weight when prompted.  
3.  The Shortcut sends the log entry to Telemetry Harbor.  

---

## Example Payload

```json
{
  "time": "2025-09-23T19:24:00.948Z",
  "ship_id": "iPhone_Health",
  "cargo_id": "Weight_kg",
  "value": 72.4
}
````

## Managing Weight Logs

### Manual Logging

* Run the Shortcut whenever you want to record your weight.
* Works great with Siri: “Hey Siri, log my weight.”

### Automating Logging

Although this Shortcut is designed for manual use, you can schedule prompts:

```
Automation Options:

* Time-based triggers (e.g., every morning at 8 AM)
* Charging state triggers (e.g., when charging at night)
* NFC tag triggers (e.g., tapping a bedside NFC tag)
```

⚠️ Be mindful that this Shortcut requires **manual input**. Automations will only trigger the prompt — you still need to enter the value.


## Troubleshooting

**Shortcut not running**

* Confirm Telemetry Harbor credentials are correct.

**No data in Grafana**

* Adjust dashboard time range.
* Verify `ship_id` and `cargo_id`.

**Duplicate logs**

* Each run creates a new timestamped entry. Telemetry Harbor prevents duplication of identical logs.


## Visualizing Data in Grafana

Once your weight data is flowing into Telemetry Harbor:

1. Log in to Grafana with your Harbor credentials.
2. Navigate to **Dashboards → Comprehensive Telemetry Dashboard**.
3. Configure filters:

   * `ship_id` = `"iPhone_Health"` (or your custom ID).
   * `cargo_id` = `"Weight_kg"` (or your custom unit).
4. Adjust time ranges to visualize long-term trends.
5. Combine with other telemetry (steps, calories, sleep) for a full health dashboard.

