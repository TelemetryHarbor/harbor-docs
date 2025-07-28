---
sidebar_position: 4
title: Harbor Types
description: Learn about the different types of Harbors available in Telemetry Harbor, their data models, and ingestion methods.
---

# Harbor Types

Telemetry Harbor offers different "Harbor Types" to cater to various data storage and processing needs. Each Harbor Type is optimized for specific use cases and may have its own data model and ingestion endpoints.

## General Harbor

The "General" Harbor is designed for broad applicability, allowing you to ingest any numerical time-series data. It's the default and recommended choice for most users.

### Characteristics

-   **Flexible Schema**: As detailed in [Core Concepts](../introduction/concepts.md), it uses a flexible `ship_id`, `cargo_id`, `value` model.
-   **TimescaleDB Backend**: Data is stored in TimescaleDB, a powerful time-series database built on PostgreSQL, optimized for high-volume, high-performance data.
-   **Grafana Integration**: Seamlessly integrates with Grafana for visualization, leveraging TimescaleDB's capabilities for complex queries and dashboards.
-   **Scalable**: Built to handle a wide range of data volumes, from small personal projects to large-scale industrial deployments.

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
-   `Shared`: `POST https://telemetryharbor.com/api/v1/ingest/your_harbor_id`
-   `Enterprise Dedicated`: `POST https://CustomName.harbor.telemetryharbor.com/api/v1/ingest/your_harbor_id`

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
curl -X POST "https://telemetryharbor.com/api/v1/ingest/ingest/your_harbor_id" \
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
-   `Shared`: `POST https://telemetryharbor.com/api/v1/ingest/ingest/your_harbor_id/batch`
-   `Enterprise Dedicated`: `POST https://CustomName.harbor.telemetryharbor.com/api/v1/ingest/ingest/your_harbor_id/batch`

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
curl -X POST "https://telemetryharbor.com/api/v1/ingest/ingest/your_harbor_id/batch" \
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

Telemetry Harbor stores your General Harbor data in a PostgreSQL database with TimescaleDB extensions. Understanding the underlying table schema is crucial for writing effective SQL queries, especially when building custom dashboards in Grafana.

#### `cargo_data` Table Schema

All telemetry readings for a General Harbor are stored in the `cargo_data` table. Here's its structure:

```sql
CREATE TABLE cargo_data (
    time TIMESTAMPTZ NOT NULL,
    ship_id TEXT NOT NULL,
    cargo_id TEXT NOT NULL,
    value DOUBLE PRECISION NOT NULL
);
```

**Column Descriptions:**
-   `time`: `TIMESTAMPTZ NOT NULL` - The timestamp of the reading in ISO 8601 format. This is the primary time dimension for all queries.
-   `ship_id`: `TEXT NOT NULL` - A unique identifier for the device, sensor, or entity that sent the data. Useful for filtering and grouping data by source.
-   `cargo_id`: `TEXT NOT NULL` - A unique identifier for the specific metric or event being recorded (e.g., "temperature", "engine_rpm"). This distinguishes different types of readings from the same `ship_id`.
-   `value`: `DOUBLE PRECISION NOT NULL` - The numerical value of the reading.


### When to Use

The "General" Harbor is suitable for:

-   **IoT Sensor Data**: Temperature, humidity, pressure, light, motion, etc.
-   **GPS Tracking**: Location data (latitude, longitude).
-   **System Metrics**: CPU usage, memory, disk I/O, network traffic.
-   **Environmental Monitoring**: Air quality, water levels, weather data.
-   **Industrial Telemetry**: Machine performance, production counts, energy consumption.
-   **Any numerical time-series data** that fits the `ship_id`, `cargo_id`, `value` model.


## Specialized Harbors (Coming Soon)

We are continuously working to expand our offerings. In the future, we plan to introduce specialized Harbor Types with unique data models and optimized ingestion methods for specific data domains (e.g., dedicated GPS tracking harbors with built-in geospatial functions, or event-based harbors for discrete events).

These specialized types will offer enhanced features and performance for their respective data domains, while the "General" Harbor will remain the versatile backbone for diverse telemetry needs.

