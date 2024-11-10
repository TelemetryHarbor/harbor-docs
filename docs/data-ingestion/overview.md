---
sidebar_position: 1
---

# Data Ingestion Overview

Telemetry Harbor provides powerful and flexible data ingestion capabilities, allowing you to send sensor data from various programming languages and environments. This section will guide you through the process of ingesting data into Telemetry Harbor.

## Key Concepts

1. **Single Data Push**: Send individual data points to Telemetry Harbor.
2. **Batch Data Push**: Send multiple data points in a single request for improved efficiency.

## Supported Programming Languages

Telemetry Harbor supports data ingestion from a wide range of programming languages, including:

- Python
- JavaScript
- Java
- cURL
- Go
- PHP
- Ruby
- Swift
- C#

Each language has its own specific implementation, but the general structure of the data and the API endpoints remain consistent across all languages.

## Data Structure

When sending data to Telemetry Harbor, use the following structure:

- `time`: Timestamp of the sensor reading (ISO 8601 format)
- `bee_id`: Unique identifier for the device
- `sensor_id`: Identifier for the sensor or data type
- `value`: The recorded sensor value

## API Endpoints

- Single Data Push: `POST http://example.hive.telemetryhive.com/api/v1/ingest`
- Batch Data Push: `POST http://example.hive.telemetryhive.com/api/v1/ingest/batch`

Remember to include your API key in the `X-API-Key` header for all requests.

## Next Steps

Choose your preferred programming language from the sidebar to see specific examples and implementation details for data ingestion in Telemetry Harbor.