---
sidebar_position: 10
title: The Things Network Integration
description: Connect your LoRaWAN devices from The Things Network V3 to Telemetry Harbor via Webhooks.
---

# The Things Network Integration

This guide explains how to integrate **The Things Network (TTN) V3** with Telemetry Harbor. By configuring a simple Webhook, you can automatically ingest telemetry from your LoRaWAN fleet, complete with signal quality metadata (RSSI, SNR), without writing any backend code.

## Prerequisites

Before starting, ensure you have:

-   A **The Things Network** account (V3 / The Things Stack).
-   A registered **LoRaWAN device** in TTN that is successfully sending data.
-   A **Telemetry Harbor account** (free tier available).
-   Access to the **Payload Formatters** section in your TTN Console.

## How it Works

Instead of running an agent on a server, this integration relies on a **Webhook**. When your LoRaWAN device sends a message, The Things Network receives it, decodes it using your Payload Formatter, and immediately pushes the JSON result to Telemetry Harbor's specialized TTN ingestion endpoint.

## Setup

### 1. Create a TTN Harbor

1.  **Log in** to your [Telemetry Harbor Dashboard](https://harborscale.com/app/harbors).
2.  **Create a Harbor**:
    -   Click **Create Harbor**.
    -   Choose a **name** (e.g., "Field Sensors").
    -   Select **The Things Network** as the Harbor Type. (:warning: *Do not select "General"*).
    -   Click **Create**.
3.  **Retrieve your credentials**:
    -   Go to **View Details** for your new harbor.
    -   Note down:
        -   `TTN Webhook Endpoint` (e.g., `https://harborscale.com/api/v2/ingest/123/ttn`)
        -   `API Key`

### 2. Configure Payload Formatter (Crucial Step)

Telemetry Harbor requires your data to be numerical and flat. You must configure a **Javascript Payload Formatter** in TTN to convert your device's binary payload into a clean JSON object.

1.  Go to your **TTN Console** > **Applications** > **Payload Formatters** > **Uplink**.
2.  Select **Javascript**.
3.  Write a decoder that returns a `data` object with numeric values.

**Example Decoder:**
```javascript
function decodeUplink(input) {
    // TTN passes Base64 or HEX depending on input
    let bytes = input.bytes;

    if (!bytes) {
        // Convert HEX string to byte array
        bytes = [];
        for (let i = 0; i < input.frm_payload.length; i += 2) {
            bytes.push(parseInt(input.frm_payload.substr(i, 2), 16));
        }
    }

    let temperature = ((bytes[0] << 8) | bytes[1]) / 100;
    let humidity = bytes[2];
    let battery = bytes[3];
    let status = String.fromCharCode.apply(null, bytes.slice(4));

    return {
        data: {
            temperature,
            humidity,
            battery,
            status
        }
    };
}
````

### 3\. Add the Webhook in TTN

1.  In your TTN Application, go to **Integrations** \> **Webhooks**.
2.  Click **+ Add Webhook**.
3.  Select **Custom Webhook**.
4.  Configure the settings:
      - **Webhook ID**: `telemetry-harbor`
      - **Webhook Format**: `JSON`
      - **Base URL**: Paste your `TTN Webhook Endpoint` from Step 1.
      - **Download API Key**: (Leave blank)
      - **Additional Headers**:
          - Key: `X-API-Key`
          - Value: `Paste Your Telemetry Harbor API Key`
5.  **Enabled Messages**:
      - Check **Uplink message**.
      - (Optional) Uncheck others to reduce noise.
6.  Click **Add webhook**.

## Automatic Data Mapping

Once the Webhook is running, Telemetry Harbor automatically maps the incoming data fields. You do not need to configure this mapping manually.

| Data Source | Telemetry Harbor Field | Description |
| :--- | :--- | :--- |
| `end_device_ids.device_id` | `ship_id` | Your TTN Device ID becomes the Ship ID. |
| `decoded_payload` Keys | `cargo_id` | e.g., "temperature", "humidity". |
| `decoded_payload` Values | `value` | The numerical value of the sensor reading. |
| `received_at` | `time` | The timestamp the packet hit the network. |

## Available Metrics

In addition to your sensor data (`decoded_payload`), the TTN Harbor automatically extracts and stores the following network metadata for every uplink:

| Metric (Cargo ID) | Description | Unit |
| :--- | :--- | :--- |
| `rssi` | Received Signal Strength Indicator | dBm |
| `snr` | Signal-to-Noise Ratio | dB |
| `frequency` | LoRa Frequency | Hz |
| `spreading_factor` | Spreading Factor (Data Rate) | SF (7-12) |
| `bandwidth` | Bandwidth used | Hz |

## Troubleshooting

### Common Issues

**"No numeric data extracted" status**

  - **Cause:** Your TTN Payload Formatter is returning strings or nested objects (e.g., `{"status": "ok"}`).
  - **Fix:** Edit your TTN Payload Formatter to ensure `decoded_payload` contains only numbers (floats/integers).

**Data not appearing in Dashboard**

  - **Cause:** The Webhook might be failing or the API Key is invalid.
  - **Fix:**
    1.  Check the **Live Data** tab in the TTN Console. Look for "Fail to send webhook" errors.
    2.  Ensure you selected **Uplink message** in the Enabled Messages list.
    3.  Verify the `X-API-Key` header has no extra spaces.

**Duplicate Data**

  - **Cause:** TTN sometimes sends retries if the network is slow.
  - **Fix:** Telemetry Harbor automatically handles deduplication based on the timestamp and device ID, so no action is needed.
