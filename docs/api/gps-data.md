---
sidebar_position: 3
title: Handling GPS Data
description: Best practices for ingesting location data (Latitude/Longitude).
---

# Handling GPS Data

Harbor Scale treats GPS location not as a special data type, but as two distinct standard metrics: `latitude` and `longitude`.

To successfully track a moving device on a map, you must follow one strict rule: **Latitude and Longitude must share the exact same timestamp.**

## Best Practice: Use Batch Ingestion
Never send GPS data as single requests. If you send Latitude, and then 1 second later send Longitude, your map visualization will fail to join them. Always bundle them in a single batch request.

### The Schema
Use specific `cargo_id` names to make visualization easier later:
* `latitude` (or `lat`)
* `longitude` (or `long` / `lon`)

### Example Batch Payload
Send this array to the batch endpoint: `POST /api/v2/ingest/YOUR_HARBOR_ID/batch`

```json
[
  {
    "time": "2024-11-18T19:24:00.000Z",
    "ship_id": "delivery-truck-05",
    "cargo_id": "latitude",
    "value": 40.7128
  },
  {
    "time": "2024-11-18T19:24:00.000Z",
    "ship_id": "delivery-truck-05",
    "cargo_id": "longitude",
    "value": -74.0060
  },
  {
    "time": "2024-11-18T19:24:00.000Z",
    "ship_id": "delivery-truck-05",
    "cargo_id": "speed_kmh",
    "value": 45.2
  }
]