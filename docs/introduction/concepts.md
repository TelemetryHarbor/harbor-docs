---
sidebar_position: 3
title: Core Concepts
description: Understand Telemetry Harbor's core concepts, including data types and AI-powered insights.
---

# Core Concepts

Telemetry Harbor is built upon a set of core concepts that define how data is ingested, stored, and analyzed. This section provides an overview of our data model, the flow of AI-powered insights, and how we structure our services.

## Key Terminology

To help you understand Telemetry Harbor, here are some core terms:

-   **Harbors**: Secure data collection points that organize and manage your IoT information streams.
-   **Ships**: Individual devices or data sources that send telemetry information to your harbors.
-   **Cargo**: The valuable sensor data and metrics flowing from your devices for analysis.

## Harbor Tiers/Specs

Telemetry Harbor offers various service tiers (or specifications), each designed to meet different data volume, retention, and feature requirements. These tiers define the operational limits and capabilities of your Harbors, scaling to support your growth from individual projects to large-scale enterprise deployments.

-   **Data Ingestion Limits**: These limits define the maximum rate at which you can send data, including single requests per second, batch requests per second, and the number of data points allowed per batch. As you move up the tiers, these capacities increase significantly, allowing for higher throughput and more frequent data updates.
-   **Data Storage & Retention**: While storage capacity is generally unlimited across all tiers, the duration for which your data is retained varies. Free Harbors offer a 7-day retention, which expands to 90-day, 1-year, and custom retention periods in higher tiers, providing greater historical data access for long-term analysis.
- **AI/ML Query Limits**: Each Harbor tier includes specific limits for AI-assisted queries, model interactions, and inference workloads. Higher tiers support more frequent and complex requests, enabling advanced use cases such as real-time diagnostics, anomaly detection, and large-scale analytics while ensuring fair resource allocation across tenants.
-   **Feature Access & Support**: Higher tiers unlock more advanced features and provide enhanced support. This includes a progression from basic to advanced backup and recovery options, and a shift from community support to priority email support, culminating in 24/7 dedicated support for Enterprise clients. Resource allocation also scales from shared infrastructure in lower tiers to dedicated resources for Enterprise solutions, ensuring optimal performance and isolation.

:::info Note
For the most up-to-date information on pricing and features, please refer to the official [Telemetry Harbor Pricing Page](https://www.telemetryharbor.com/pricing).
:::

## Harbor Types

Telemetry Harbor supports a variety of **Harbor Types**, each tailored to a specific category of telemetry data. A Harbor Type defines the **data model** and **ingestion structure** best suited for its intended domain. This ensures more efficient storage, faster querying, and a better developer experience.

Think of it as choosing the right schema and ingestion pattern based on what kind of data you're working with.

- **General Type**: A flexible, catch-all Harbor Type designed for structured numerical data. Ideal for battery levels, sensor readings, or any use case where devices push named metrics (e.g., temperature, pressure, humidity) with associated metadata like device ID and timestamp.

- **Environmental Type** (planned): Optimized for weather stations, air quality sensors, or agricultural systems. Supports multidimensional time-series data with spatial tagging for use in GIS-aware dashboards and alerting systems.

- **Fleet/Vehicle Type** (planned): Intended for real-time vehicle telemetry such as location, speed, engine metrics, and driving events. Structured to enable efficient filtering by device, route, or time interval, with potential support for geofencing.

- **Log/Event Type** (planned): Suited for ingesting structured logs, alerts, or event-based data such as faults, user actions, or status changes. Useful for monitoring systems, audit trails, and anomaly detection.

- **Industrial/Machine Type** (planned): Focused on manufacturing and machinery data like vibration, RPM, operational status, or predictive maintenance metrics. Supports high-frequency sampling and tagging by unit/line.

- **Custom Type**: For advanced users with unique requirements, custom Harbor Types may be provisioned with dedicated schemas and tailored ingestion formats, optimized per workload.

Each Harbor Type comes with a purpose-built schema behind the scenes, so you don’t have to worry about database design — just pick the type that matches your data domain, and start pushing data.


:::info Note
For a full list of supported and upcoming Harbor Types, check the [Harbor Types reference](../getting-started/harbor-types/).
:::

## Harbor AI

**Harbor AI** is an intelligent assistant built into Telemetry Harbor that allows you to explore and interact with your telemetry data through natural language. It’s powered by large language models and integrated with your Harbor’s data.

Harbor AI understands the structure and domain of your Harbor Type, enabling it to generate insights, answer complex queries, and assist in diagnostics — without requiring SQL, dashboards, or scripting.

Use cases include:

- Asking questions like _“What was the average battery level for Ship A this week?”_
- Summarizing trends, such as _“Summarize cargo fluctuations for the last 24 hours.”_
- Investigating anomalies or sudden changes in your data.
- Generating quick diagnostics or health reports.
- Build a complex Grafana dashboard using the SQL Snippet feature.

Each response also reveals the underlying SQL query used to generate the answer. This helps you validate results, understand the data model, and reuse the query to build dashboards or trigger alerts.

Harbor AI is tightly scoped to your selected Harbor, ensuring context-aware analysis based on your data model and tier. As you upgrade to higher service tiers, Harbor AI supports more frequent, complex, and longer-running queries.

:::info Note
All AI-assisted queries respect the limits defined by your Harbor Tier. For advanced workflows, you can combine Harbor AI with API queries and dashboards.
:::

## Visualization with Grafana

Telemetry Harbor includes built-in integration with **Grafana**, a leading visualization platform. Every user is provisioned with a Grafana account, and each Harbor is automatically configured as a data source, allowing for instant dashboarding and data exploration.

Through Grafana, you can:

- Visualize time-series data from your Harbors using prebuilt or custom panels.
- Set up thresholds, alerts, and status boards tailored to your environment.
- Create multi-Harbor dashboards to compare and analyze data across different telemetry sources.
- Share real-time dashboards with your team or stakeholders.

For **Enterprise Harbors**, Grafana instances are fully isolated and dedicated, offering additional performance, security, and customization capabilities.

:::info Tip
Use Grafana to complement Harbor AI. While Harbor AI offers natural language insights, Grafana excels at long-term monitoring, alerting, and visual storytelling.
:::
