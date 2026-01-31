---
sidebar_position: 2
title: Pushing Data (HTTP API)
description: Technical reference for the General Harbor ingestion endpoints.
---
# Pushing Telemetry Data

This reference is for developers building custom API integrations (Path D).
:::tip
If you just want to connect a standard device (ESP32, Server, etc.), use the **Connect Wizard** in your dashboard. It generates the correct code and URLs for you automatically.
:::

## 1. General Harbor Endpoints

These endpoints accept standard JSON payloads.
**Base URL (Shared Cloud):**
`https://harborscale.com/api/v2/ingest`
**Base URL (Enterprise):**
`https://[YOUR_TENANT].harbor.harborscale.com/api/v2/ingest`

---
### Single Data Point
Use this for low-frequency events or simple testing.
**Method:** `POST`
**URL:** `/{harbor_id}`
**Headers:**
* `X-API-Key`: `your_api_key`
* `Content-Type`: `application/json`
**Body:**
```json
{
"ship_id": "sensor-01",
"cargo_id": "temperature",
"value": 24.5
}
```
**cURL Example:**
```bash
curl -X POST "https://harborscale.com/api/v2/ingest/YOUR_HARBOR_ID" -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{"ship_id": "manual_test", "cargo_id": "test_metric", "value": 100}'
```
---
### Batch Ingestion (Recommended)
Use this for high-frequency data (e.g., 10Hz accelerometers) or to send multiple metrics at once (e.g., Temp + Humidity + Battery).
**Method:** `POST`
**URL:** `/{harbor_id}/batch`
**Body:**
A JSON Array `[]` of data point objects.
```json
[
  {
"ship_id": "sensor-01",
"cargo_id": "temperature",
"value": 24.5
  },
  {
"ship_id": "sensor-01",
"cargo_id": "humidity",
"value": 60.2
  }
]
```
**cURL Example:**
```bash
curl -X POST "https://harborscale.com/api/v2/ingest/YOUR_HARBOR_ID/batch" -H "X-API-Key: YOUR_API_KEY" -H "Content-Type: application/json" -d '[{"ship_id": "s1", "cargo_id": "temp", "value": 20}, {"ship_id": "s1", "cargo_id": "hum", "value": 50}]'
```
---
## 2. The Things Network (TTN) Harbor
**Note:** You cannot "push" to a TTN Harbor using cURL. It is designed to receive Webhooks from The Things Stack.
**Endpoint:**
`POST /api/v2/ingest/{harbor_id}/ttn`
### Configuration
1. Go to **TTN Console > Integrations > Webhooks**.
2. **Base URL**: `https://harborscale.com/api/v2/ingest/YOUR_HARBOR_ID/ttn`
3. **API Key Header**: `X-API-Key` : `YOUR_API_KEY`
4. **Format**: JSON
---
## Response Codes
| Code | Meaning | Action |
| --- | --- | --- |
| `200` | OK | Data ingested successfully. |
| `202` | Accepted | Batch received and queued for processing. |
| `401` | Unauthorized | Check your `X-API-Key` header. |
| `400` | Bad Request | Check your JSON syntax or data types. |
| `429` | Too Many Requests | You exceeded your Harbor's rate limit. |

