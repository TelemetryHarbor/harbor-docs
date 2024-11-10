---
sidebar_position: 2
---

# Pushing Data

Telemetry Harbor provides endpoints for pushing sensor data to our platform. You can send individual data points or batch data for more efficient data transmission.

## Sensor Data Model

When submitting sensor readings, use the following data model:

- time: Timestamp of the sensor reading
- bee_id: Unique identifier for the bee or device
- sensor_id: Unique identifier for the sensor
- value: Sensor reading value

## Single Data Point Ingestion

To submit a single sensor reading:

- Endpoint: POST /ingest
- Body: JSON object conforming to the SensorData model

Example request body:

Include a JSON object with time, bee_id, sensor_id, and value fields.

## Batch Data Ingestion

To submit multiple sensor readings at once:

- Endpoint: POST /ingest/batch
- Body: Array of SensorData objects

Example request body:

Include an array of JSON objects, each with time, bee_id, sensor_id, and value fields.