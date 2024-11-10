---
sidebar_position: 2
---

# Pushing Data

Telemetry Harbor provides endpoints for pushing sensor data to our platform. You can send individual data points or batch data for more efficient data transmission.

## Anchor Data Model

When submitting sensor readings, use the following data model:

- time: Timestamp of the sensor reading
- ship_id: Unique identifier for the ship or device
- sensor_id: Unique identifier for the sensor
- value: Anchor reading value

## Single Data Point Ingestion

To submit a single sensor reading:

- Endpoint: POST /ingest
- Body: JSON object conforming to the AnchorData model

Example request body:

Include a JSON object with time, ship_id, sensor_id, and value fields.

## Batch Data Ingestion

To submit multiple sensor readings at once:

- Endpoint: POST /ingest/batch
- Body: Array of AnchorData objects

Example request body:

Include an array of JSON objects, each with time, ship_id, sensor_id, and value fields.