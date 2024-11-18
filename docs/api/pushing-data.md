---
sidebar_position: 2
---

# Pushing Data

Telemetry Harbor provides endpoints for pushing ship data to our platform. You can send individual data points or batch data for more efficient data transmission.

## Anchor Data Model

When submitting ship readings, use the following data model:

- `time`: Timestamp of the ship reading (ISO 8601 format)
- `ship_id`: Unique identifier for the device
- `cargo_id`: Identifier for the sensor or eent
- `value`: The recorded ship value

## Single Data Point Ingestion

To submit a single ship reading:

- Endpoint: POST '/ingest/harbor_id'
- Body: JSON object conforming to the AnchorData model

Example request body:
```
{
  "time": "2024-11-18T19:24:00.948Z",
  "ship_id": "string",
  "cargo_id": "string",
  "value": 0
}
```

Include a JSON object with time, ship_id, cargo_id, and value fields.

## Batch Data Ingestion

To submit multiple ship readings at once:

- Endpoint: POST '/ingest/batch/harbor_id'
- Body: Array of AnchorData objects

Example request body:
```
[
  {
    "time": "2024-11-18T19:24:19.687Z",
    "ship_id": "string",
    "cargo_id": "string",
    "value": 0
  }
]
```
Include an array of JSON objects, each with time, ship_id, cargo_id, and value fields.