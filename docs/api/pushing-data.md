---
sidebar_position: 2
title: Pushing Telemetry Data
description: Learn the general principles of sending single and batch telemetry data points to Harbor Scale.
---

# Pushing Telemetry Data

Harbor Scale provides robust endpoints for pushing your telemetry data to our platform. You can send individual data points or batch data for more efficient data transmission.

:::info Important
The specific data model (payload structure) and API endpoints for ingestion depend on the **Harbor Type** you have created. This page provides a general overview of pushing data. For detailed information on the data model and endpoints for each Harbor Type, please refer to the [Harbor Types](../getting-started/harbor-types.md) documentation.
:::

## General Principles of Data Ingestion

Regardless of the Harbor Type, the core process of pushing data involves:

1.  **Authentication**: Including your API Key in the `X-API-Key` header for every request. (See [Authentication](./authentication.md) for details).
2.  **Endpoint Selection**: Using the correct ingestion endpoint for your Harbor ID and whether you are sending a single data point or a batch.
3.  **Payload Formatting**: Structuring your data according to the specific data model required by your Harbor Type.
4.  **HTTP Method**: Always using `POST` for data ingestion.

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
## The Things Network (TTN) Harbor

When using a TTN Harbor, data is pushed automatically by **The Things Network** servers via a Webhook. You do not manually construct the JSON payload.

**Endpoint:**

  - `Shared`: `POST https://harborscale.com/api/v2/ingest/your_harbor_id/ttn`
  - `Enterprise Dedicated`: `POST https://CustomName.harbor.harborscale.com/api/v2/ingest/your_harbor_id/ttn`

### Configuration

Instead of using cURL or an SDK, you configure the "Push" inside the TTN Console:

1.  **Payload Formatter**: Ensure your Javascript formatter returns a `decoded_payload` object containing numbers (e.g., `{ "temp": 24, "hum": 60 }`).
2.  **Webhook Integration**:
      * **Base URL**:
          * Shared: `https://harborscale.com/api/v2/ingest/your_harbor_id/ttn`
          * Enterprise: `https://CustomName.harbor.harborscale.com/api/v2/ingest/your_harbor_id/ttn`
      * **Method**: `POST`
      * **Format**: `JSON`
      * **Additional Headers**:
          * Key: `X-API-Key`
          * Value: `your_api_key_here`
      *  **Enabled Messages**:
            - Check **Uplink message**.
            - (Optional) Uncheck others to reduce noise. 
      

Once configured, every uplink message received by The Things Network is automatically pushed to Harbor Scale.


