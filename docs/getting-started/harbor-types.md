---
sidebar_position: 4
title: Harbor Types
description: Understanding the data models for General and TTN Harbors.
---

# Harbor Types

Harbor Scale uses different "Types" to handle specific ingestion protocols. Choosing the right type ensures your data is parsed and stored correctly.

## 1. General Harbor (Standard)
**Best for:** ESP32, Python, Lighthouse, Arduino, REST API.

The General Harbor is a flexible engine that accepts raw JSON telemetry. It does not perform decoding; it stores exactly what you send.

### The Data Model
When you send data to a General Harbor, it is stored in the `cargo_data` table. This is important to know for building Grafana dashboards.

Every piece of data sent to Harbor follows this simple JSON structure:

```json
{
  "time": "2024-11-18T19:24:00.948Z",
  "ship_id": "esp32-node-01",
  "cargo_id": "temperature",
  "value": 24.5
}

```

| Field | Type | Description |
| :--- | :--- | :--- |
| `time` | `timestamp` | When the event happened. |
| `ship_id` | `text` | The device name (e.g., `sensor-01`). |
| `cargo_id` | `text` | The metric name (e.g., `temperature`). |
| `value` | `double` | The numerical reading. |



### Ingestion Methods
You do not need to memorize API endpoints.
1.  Go to your Harbor Dashboard.
2.  Click **Connect**.
3.  Select **Embedded Wizard** (for hardware) or **Lighthouse** (for servers).
4.  The system will generate the code with the correct endpoints and keys pre-filled.

---

## 2. The Things Network (TTN) Harbor
**Best for:** LoRaWAN devices using The Things Stack (v3).

This Harbor Type is a specialized **Webhook Receiver**. It is designed to "catch" the complex JSON payloads sent by The Things Network, automatically decode them, and flatten them into our simple data model.

### Automatic Data Mapping
You do not need to write a parser. We automatically map TTN fields to Harbor columns:

| TTN Field | Maps to Harbor Column |
| :--- | :--- |
| `end_device_ids.device_id` | `ship_id` |
| `uplink_message.decoded_payload` | `cargo_id` & `value` |
| `received_at` | `time` |

### Metadata Extraction
In addition to your sensor data, we automatically extract network health metrics as distinct `cargo_id` entries:
* `rssi` (Signal Strength)
* `snr` (Signal-to-Noise Ratio)
* `frequency`
* `spreading_factor`

### Setup
1.  Create a **TTN Harbor**.
2.  Go to the **Connect** tab.
3.  Select **The Things Network**.
4.  Copy the **Webhook URL** provided and paste it into your TTN Console under *Integrations > Webhooks*.