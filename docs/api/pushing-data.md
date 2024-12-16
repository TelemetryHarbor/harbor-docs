---
sidebar_position: 2
---

# Pushing Data

Telemetry Harbor provides endpoints for pushing ship data to our platform. You can send individual data points or batch data for more efficient data transmission.

## Anchor Data Model

When submitting ship readings, use the following data model:

- `time`: Timestamp of the ship reading (ISO 8601 format)
- `ship_id`: Unique identifier for the device
- `cargo_id`: Identifier for the sensor or event
- `value`: The recorded cargo value

## Single Data Point Ingestion

To submit a single ship reading:

`Shared`
- Single Data Push: `POST http://telemetryharbor.com/api/v1/ingest/ingest/harbor_id`
`Enterprise Dedicated`
- Single Data Push: `POST http://CustomName.harbor.telemetryharbor.com/api/v1/ingest/ingest/harbor_id`

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

`Shared`
- Batch Data Push: `POST http://telemetryharbor.com/api/v1/ingest/ingest/batch/harbor_id`
`Enterprise Dedicated`
- Batch Data Push: `POST http://CustomName.harbor.telemetryharbor.com/api/v1/ingest/ingest/batch/harbor_id`

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
