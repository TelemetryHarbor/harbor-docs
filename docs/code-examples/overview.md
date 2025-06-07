---
sidebar_position: 1
---

# Data Ingestion Overview

Telemetry Harbor provides powerful and flexible data ingestion capabilities, allowing you to send ship data from virtually any programming language or environment capable of making POST requests. This section will guide you through the process of ingesting data into Telemetry Harbor.

## Key Concepts

1. **Single Data Push**: Send individual data points to Telemetry Harbor.
2. **Batch Data Push**: Send multiple data points in a single request for improved efficiency.

## Universal Support

Telemetry Harbor supports data ingestion from any programming language or tool that can make HTTP POST requests. While examples are provided for common languages, the general structure of the data and the API endpoints remain consistent.

Some example languages include:

- Python
- JavaScript
- Java
- cURL
- Go
- PHP
- Ruby
- Swift
- C#

If your preferred language isn't listed, don't worry! As long as it can send POST requests, it is fully supported.

## Data Structure

When sending data to Telemetry Harbor, use the following structure:

- `time`: Timestamp of the ship reading (ISO 8601 format)
- `ship_id`: Unique identifier for the device
- `cargo_id`: Unique identifier for the sensor or event
- `value`: The recorded cargo value

## API Endpoints

`Shared Endpoints`

- **Single Data Push**: `POST http://telemetryharbor.com/api/v1/ingest/ingest/harbor_id`
- **Batch Data Push**: `POST http://telemetryharbor.com/api/v1/ingest/ingest/harbor_id/batch`

`Enterprise Dedicated Endpoints`

- **Single Data Push**: `POST http://CustomName.harbor.telemetryharbor.com/api/v1/ingest/ingest/harbor_id`
- **Batch Data Push**: `POST http://CustomName.harbor.telemetryharbor.com//api/v1/ingest/ingest/harbor_id/batch`

For all requests, include your API key in the `X-API-Key` header.

## Next Steps

Refer to the examples provided in the sidebar for a quick start with your preferred language. If you are using a language not listed, simply follow the general API structure and data format to begin ingesting data into Telemetry Harbor.
