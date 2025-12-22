---
sidebar_position: 3
title: Core Concepts
description: Understand Harbor Scale's core terminology and data model.
---

# Core Concepts

Harbor Scale uses a maritime metaphor to simplify IoT structure. You don't need to learn a complex query language; you just need to understand the relationship between the Harbor, the Ship, and the Cargo.

## Key Terminology

-   **Harbors** (The Destination): A secure, scalable endpoint that receives data. You can have multiple Harbors for different projects (e.g., "Production," "Testing").
-   **Ships** (The Source): The device sending the data. This `ship_id` can be anything unique: a serial number, a hostname (e.g., `server-01`), or a friendly name (e.g., `living-room-sensor`).
-   **Cargo** (The Data): The named metric being delivered. The `cargo_id` describes what the value represents (e.g., `temperature`, `cpu_usage`, `battery_level`).

### The Data Model
Every piece of data sent to Harbor follows this simple JSON structure:

```json
{
  "ship_id": "esp32-node-01",
  "cargo_id": "temperature",
  "value": 24.5
}

```

## Harbor Types

When creating a Harbor, you choose a "Type" which defines how the system parses incoming data.

1. **General Type (Recommended):**
* **Best for:** ESP32, Arduino, Python Scripts, Lighthouse, and Webhooks.
* **Protocol:** Standard HTTP REST.
* **Behavior:** Accepts the standard JSON format shown above.


2. **The Things Network (TTN) Type:**
* **Best for:** LoRaWAN devices connected via The Things Stack.
* **Protocol:** Webhook.
* **Behavior:** It automatically ingests the complex JSON sent by TTN and extracts decoded payloads, SNR, and RSSI without you writing a parser.



## Visualization & AI

Harbor isn't just a database; it's an intelligence layer.

* **Grafana:** Every Harbor includes a managed Grafana instance. We automatically map your `Ships` and `Cargo` to SQL tables, so you can drag-and-drop dashboards immediately.
* **Harbor AI:** An integrated LLM that understands your data schema. You can ask questions like *"What was the average battery level for Ship X yesterday?"* and it will write the SQL and return the answer.

## Tiers & Retention

Harbor Scale offers different tiers to match your workload. Higher tiers provide:

* **Longer Retention:** Keep data for 7 days, 90 days, or 1 year.
* **Higher Limits:** Send data more frequently (e.g., every second vs. every minute).
* **AI Allowance:** More frequent AI queries and analysis.

:::info Note
For specific limits on data points per second and retention periods, please refer to the [Pricing Page](https://www.harborscale.com/pricing).
:::


