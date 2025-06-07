---
sidebar_position: 3
---

# GPS Data

Telemetry Harbor supports GPS data ingestion for location-based IoT applications. When submitting GPS data, follow these guidelines:

- Use the same timestamp for both latitude and longitude values.
- Use distinct cargo_id values for latitude and longitude (e.g., "sen_lat" and "sen_long").
- The ship_id should correspond to the device sending the GPS data.

## Example GPS Data Submission

When submitting GPS data, you would include two separate data points for each location update: one for latitude and one for longitude. Both would share the same timestamp and ship_id, but have different cargo_id values.

# Single GPS Location Ingestion

To submit a single ship GPS location:

`Shared`
- Single Data Push: `POST https://telemetryharbor.com/api/v1/ingest/ingest/harbor_id`

`Enterprise Dedicated`
- Single Data Push: `POST https://CustomName.harbor.telemetryharbor.com/api/v1/ingest/ingest/harbor_id`

Example request body:
```
{
  "time": "2024-11-18T19:24:00.948Z",
  "ship_id": "Ship1",
  "cargo_id": "Long",
  "value": 0
}
```
```
{
  "time": "2024-11-18T19:24:00.948Z",
  "ship_id": "Ship1",
  "cargo_id": "Lat",
  "value": 0
}
```

Include a JSON object with time, ship_id, cargo_id, and value fields.

## Batch Data Ingestion

To submit multiple ship readings at once:

`Shared`
- Batch Data Push: `POST https://telemetryharbor.com/api/v1/ingest/ingest/harbor_id/batch`
`Enterprise Dedicated`
- Batch Data Push: `POST https://CustomName.harbor.telemetryharbor.com/api/v1/ingest/ingest/harbor_id/batch`

Example request body:
```
[
  {
    "time": "2024-11-18T19:24:19.687Z",
    "ship_id": "Ship1",
    "cargo_id": "Long",
    "value": 0
  },
  {
    "time": "2024-11-18T19:24:19.687Z",
    "ship_id": "Ship1",
    "cargo_id": "Lat",
    "value": 0
  }
]
```
Include an array of JSON objects, each with time, ship_id, cargo_id, and value fields.

This format allows you to submit GPS coordinates as part of your regular ship data stream, enabling seamless integration of location data with other ship readings.
