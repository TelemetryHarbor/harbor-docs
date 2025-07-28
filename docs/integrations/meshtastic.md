---
sidebar_position: 1
title: Meshtastic Integration
description: Integrate your Meshtastic devices with Telemetry Harbor for off-grid data collection.
---

# Meshtastic Integration

This guide explains how to integrate your Meshtastic devices with Telemetry Harbor, allowing you to collect and visualize telemetry data from your off-grid Meshtastic network. This integration uses a Python script to bridge data from your Meshtastic device to your Telemetry Harbor instance.

**_Repo Link:_** https://github.com/TelemetryHarbor/harbor-meshtastic


## Prerequisites

Before starting, ensure you have:

-   A **Meshtastic device** (e.g., LoRa ESP32) configured and operational.
-   A **computer** (Linux, macOS, or Windows) with Python 3 installed.
-   **pip** for Python package management.
-   A **Telemetry Harbor account** (free tier available).
-   Basic knowledge of Meshtastic and Python.

## How it Works

The integration involves a Python script that connects to your Meshtastic device via its serial port. It listens for incoming telemetry messages (e.g., sensor data from other nodes) or can be configured to send data from the connected device itself. This data is then formatted into the Telemetry Harbor [General Harbor Data Type Model](../introduction/concepts.md#general-harbor-data-type-model) and pushed to your Telemetry Harbor batch ingestion endpoint.

<img src="/placeholder.svg?height=300&width=500" alt="Diagram showing Meshtastic device to Python script to Telemetry Harbor" />

## Setup

### 1. Prepare Your Meshtastic Device:

-   Ensure your Meshtastic device is connected and operational.
-   Note the COM port associated with the device (e.g., `/dev/ttyUSB0` on Linux, `COM3` on Windows).

### 2. Set Up the Script:

-   Clone this repository:
    ```bash
    git clone https://github.com/TelemetryHarbor/harbor-meshtastic.git
    cd harbor-meshtastic
    ```
-   Install required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### 3. Run the Script:

-   Execute the script and provide the required information:
    -   **Batch Endpoint**: Obtain this from your Telemetry Harbor account.
    -   **API Key**: Your unique key for secure communication.
    -   **COM Port**: The port your Meshtastic device is connected to.
    ```bash
    python app.py
    ```
    The script will prompt you for the necessary details.

### 4. Stream Data:

-   Once running, the script will continuously push telemetry data from your Meshtastic device to the Telemetry Harbor batch endpoint. You should see output in your terminal indicating data being sent.

### 5. Visualize in Grafana:

-   Log in to your Telemetry Harbor Grafana instance.
-   Access pre-configured dashboards (if available for Meshtastic) or create new panels using the `ship_id` and `cargo_id` values sent by the script to view and analyze your Meshtastic data.

## Troubleshooting

### Common Issues

-   **Device not found**: Ensure the COM port is correct and the Meshtastic device is properly connected and powered on.
-   **API connection errors**: Verify your Telemetry Harbor Batch Endpoint and API Key are correct. Check your internet connection.
-   **No data in Grafana**: Confirm the script is running and sending data successfully. Check Grafana's time range and filters.

For more detailed troubleshooting, refer to the `README.md` in the [harbor-meshtastic GitHub repository](https://github.com/TelemetryHarbor/harbor-meshtastic).
