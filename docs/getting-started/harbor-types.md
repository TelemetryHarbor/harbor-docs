---
sidebar_position: 4
title: Harbor Types
description: Learn about the different types of Harbors available in Harbor Scale, their data models, and ingestion methods.
---

# Harbor Types

Harbor Scale offers different "Harbor Types" to cater to various data storage and processing needs. Each Harbor Type is optimized for specific use cases and may have its own data model and ingestion endpoints.

## General Harbor

The "General" Harbor is designed for broad applicability, allowing you to ingest any numerical time-series data. It's the default and recommended choice for most users.

### General Harbor Data Model

When submitting telemetry readings to a General Harbor, use the following data model:

| Field      | Type       | Description                                                              | Example Value                 |
| :--------- | :--------- | :----------------------------------------------------------------------- | :---------------------------- |
| `time`     | `string`   | Timestamp of the reading in ISO 8601 format (UTC recommended).           | `"2024-01-01T12:30:00.000Z"`  |
| `ship_id`  | `string`   | Unique identifier for the device or entity sending the data.             | `"sensor-node-1"`, `"truck-A"` |
| `cargo_id` | `string`   | Unique identifier for the specific metric or event being recorded.       | `"temperature"`, `"latitude"`, `"engine_rpm"` |
| `value`    | `number`   | The numerical value of the metric (double precision float).              | `25.7`, `40.12345`, `980.5`   |

### Ingesting Data to a General Harbor

You can send individual data points or batch data for more efficient data transmission.

#### Single Data Point Ingestion

To submit a single telemetry reading to a General Harbor:

**Endpoint:**
-   `Shared`: `POST https://harborscale.com/api/v2/ingest/your_harbor_id`
-   `Enterprise Dedicated`: `POST https://CustomName.harbor.harborscale.com/api/v2/ingest/your_harbor_id`

Replace `your_harbor_id` with your actual Harbor ID.

##### Example Request Body

```json
{
  "time": "2024-11-18T19:24:00.948Z",
  "ship_id": "my_device_alpha",
  "cargo_id": "battery_level",
  "value": 85.5
}
```

##### cURL Example

```bash
curl -X POST "https://harborscale.com/api/v2/ingest/ingest/your_harbor_id" \
-H "X-API-Key: your_api_key" \
-H "Content-Type: application/json" \
-d '{
  "time": "2024-11-18T19:24:00.948Z",
  "ship_id": "test_device_single",
  "cargo_id": "test_metric",
  "value": 123.45
}'
```

#### Batch Data Ingestion

To submit multiple telemetry readings at once to a General Harbor, which is more efficient for high-frequency data:

**Endpoint:**
-   `Shared`: `POST https://harborscale.com/api/v2/ingest/ingest/your_harbor_id/batch`
-   `Enterprise Dedicated`: `POST https://CustomName.harbor.harborscale.com/api/v2/ingest/ingest/your_harbor_id/batch`

Replace `your_harbor_id` with your actual Harbor ID.

##### Example Request Body

```json
[
  {
    "time": "2024-11-18T19:24:19.687Z",
    "ship_id": "my_device_beta",
    "cargo_id": "temperature",
    "value": 26.1
  },
  {
    "time": "2024-11-18T19:24:19.687Z",
    "ship_id": "my_device_beta",
    "cargo_id": "humidity",
    "value": 68.3
  },
  {
    "time": "2024-11-18T19:24:20.000Z",
    "ship_id": "my_device_gamma",
    "cargo_id": "pressure",
    "value": 1010.5
  }
]
```

##### cURL Example

```bash
curl -X POST "https://harborscale.com/api/v2/ingest/ingest/your_harbor_id/batch" \
-H "X-API-Key: your_api_key" \
-H "Content-Type: application/json" \
-d '[
  {
    "time": "2024-11-18T19:24:19.687Z",
    "ship_id": "test_device_batch",
    "cargo_id": "test_metric_1",
    "value": 10.0
  },
  {
    "time": "2024-11-18T19:24:19.687Z",
    "ship_id": "test_device_batch",
    "cargo_id": "test_metric_2",
    "value": 20.0
  }
]'
```


### Querying General Harbor Data

Harbor Scale stores your General Harbor data in a PostgreSQL database with TimescaleDB extensions. Understanding the underlying table schema is crucial for writing effective SQL queries, especially when building custom dashboards in Grafana.

#### `cargo_data` Table Schema

All telemetry readings for a General Harbor are stored in the `cargo_data` table. Here's its structure:

```sql
CREATE TABLE cargo_data (
    time TIMESTAMPTZ NOT NULL, -- The timestamp of the reading in ISO 8601 format. This is the primary time dimension for all queries.
    ship_id TEXT NOT NULL, -- A unique identifier for the device, sensor, or entity that sent the data. Useful for filtering and grouping data by source.
    cargo_id TEXT NOT NULL, -- A unique identifier for the specific metric or event being recorded (e.g., "temperature", "engine_rpm"). This distinguishes different types of readings from the same ship_id
    value DOUBLE PRECISION NOT NULL -- The numerical value of the reading.
);
```

## The Things Network (TTN) Harbor

The "TTN Harbor" is a specialized harbor type built specifically for **LoRaWAN** devices managed via **The Things Network (V3)**. It is designed to consume TTN Webhooks directly without any intermediate translation layer.


### Automatic Data Mapping

This Harbor type treats your LoRaWAN infrastructure as follows:

| TTN Concept | Harbor Scale Concept | Description |
| :--- | :--- | :--- |
| `device_id` | `ship_id` | The unique end-device ID from TTN becomes the Ship ID. |
| `decoded_payload` keys | `cargo_id` | Keys in your decoded payload (e.g., "temp") become Cargo IDs. |
| `decoded_payload` values | `value` | The values associated with those keys are stored as the metric values. |
| `received_at` | `time` | The time the packet arrived at the network server (or `time` from payload if provided). |

### Built-in Metadata Cargo

In addition to your payload, the TTN Harbor automatically tracks the following "Cargo" for every ship (device):

  * `rssi`: Received Signal Strength Indicator (dBm)
  * `snr`: Signal-to-Noise Ratio (dB)
  * `frequency`: Transmission frequency (Hz)
  * `bandwidth`: Bandwidth used (Hz)
  * `spreading_factor`: LoRa Spreading Factor (7-12)

### Configuration

To connect a TTN Application to this Harbor:

1.  **Create a TTN Harbor** in your Harbor Scale dashboard.
2.  Copy your **Harbor ID** and **API Key**.
3.  Go to your **TTN Console** \> **Integrations** \> **Webhooks**.
4.  Click **Add Webhook** \> **Custom Webhook**.
5.  **Webhook Settings**:
      * **Base URL**:
          * Shared: `https://harborscale.com/api/v2/ingest/your_harbor_id/ttn`
          * Enterprise: `https://CustomName.harbor.harborscale.com/api/v2/ingest/your_harbor_id/ttn`
      * **Method**: `POST`
      * **Format**: `JSON`
      * **Additional Headers**:
          * Key: `X-API-Key`
          * Value: `your_api_key_here`
6.  **Enabled Messages**: Check **Uplink message**.

> **Important:** Ensure your TTN **Payload Formatter** returns a flat JSON object in the `decoded_payload` field containing numbers. Nested objects or strings in the payload will be ignored.
### Querying TTN Harbor Data

Harbor Scale stores your TTN Harbor data in a PostgreSQL database with TimescaleDB extensions. Understanding the underlying table schema is crucial for writing effective SQL queries, especially when building custom dashboards in Grafana.

#### `cargo_data` Table Schema

All telemetry readings for a TTN Harbor are stored in the `cargo_data` table. Here's its structure:

```sql
CREATE TABLE cargo_data (
    time TIMESTAMPTZ NOT NULL, -- The timestamp of the reading in ISO 8601 format. This is the primary time dimension for all queries.
    ship_id TEXT NOT NULL, -- A unique identifier for the device, sensor, or entity that sent the data. Useful for filtering and grouping data by source.
    cargo_id TEXT NOT NULL, -- A unique identifier for the specific metric or event being recorded (e.g., "temperature", "engine_rpm"). This distinguishes different types of readings from the same ship_id
    value DOUBLE PRECISION NOT NULL -- The numerical value of the reading.
);
```


