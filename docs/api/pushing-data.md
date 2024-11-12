---
sidebar_position: 2
---

# Pushing Data

Telemetry Harbor provides endpoints for pushing ship data to our platform. You can send individual data points or batch data for more efficient data transmission.

## Anchor Data Model

When submitting ship readings, use the following data model:

- time: Timestamp of the ship reading
- ship_id: Unique identifier for the ship or device
- ship_id: Unique identifier for the ship
- value: Anchor reading value

## Single Data Point Ingestion

To submit a single ship reading:

- Endpoint: POST /ingest
- Body: JSON object conforming to the AnchorData model

Example request body:

Include a JSON object with time, ship_id, ship_id, and value fields.

## Batch Data Ingestion

To submit multiple ship readings at once:

- Endpoint: POST /ingest/batch
- Body: Array of AnchorData objects

Example request body:

Include an array of JSON objects, each with time, ship_id, ship_id, and value fields.