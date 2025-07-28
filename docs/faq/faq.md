---
sidebar_position: 1
title: Frequently Asked Questions
description: Find answers to common questions about Telemetry Harbor.
---

# Frequently Asked Questions

This section provides answers to common questions about Telemetry Harbor, its features, and troubleshooting.

## General Questions

### What is Telemetry Harbor?
Telemetry Harbor is a unified cloud-based platform designed to help you collect, store, and visualize telemetry data from diverse IoT devices. It transforms raw sensor data into actionable insights with real-time analytics and customizable dashboards.

### What kind of data can I send to Telemetry Harbor?
Telemetry Harbor is built for **numerical time-series data**. The currently supported Harbor type is **General**, which accepts only numeric values. You send data with a timestamp, a `ship_id` (device or entity), a `cargo_id` (metric), and a number — following the [General Harbor Type](../introduction/concepts.md#general-harbor-type) format.

Depending on the Harbor type, supported data formats may vary. However, most existing and upcoming types are focused on **numeric metrics**.


### Is Telemetry Harbor suitable for large-scale deployments?
Yes, Telemetry Harbor is built with a scalable infrastructure capable of handling vast amounts of data points per second, from small personal projects to enterprise-scale deployments.

### What is a "Harbor"?
A "Harbor" in Telemetry Harbor refers to a secure, dedicated data collection point tailored for your IoT devices. It's where your telemetry data is ingested and stored.

## Technical Questions

### How do I send data to Telemetry Harbor?
You can send data using our official [SDKs (Python, JavaScript, C++)](../getting-started/sdk-overview.md) or directly via our [API endpoints](../api/pushing-data.md) using HTTP POST requests. We support both single data point and batch ingestion.

### What is the API Key used for?
The API Key is used for authenticating your requests to the Telemetry Harbor API. It ensures that only authorized applications and devices can send data to your Harbor. Keep your API key confidential and secure. Learn more in [Authentication](../api/authentication.md).

### What database does Telemetry Harbor use?
Telemetry Harbor uses TimescaleDB, a powerful time-series database built on PostgreSQL, optimized for high-volume, high-performance data storage and querying.

### How can I visualize my data?
Telemetry Harbor integrates seamlessly with Grafana. You can access a pre-configured Grafana dashboard through your Harbor details page and create custom visualizations using SQL queries. Refer to the [Grafana Visualization Guide](../visualization/grafana.md) for more details.

### Does Telemetry Harbor support real-time data?
Yes, Telemetry Harbor is designed for real-time data ingestion, ensuring you always have the most current information for immediate response and up-to-the-minute insights.

### Can I use my own Grafana instance?
Currently, Telemetry Harbor provides a managed Grafana instance integrated with your Harbor. For enterprise plans, custom Grafana integrations might be possible. Please contact our sales team for more information.

## Account & Billing

### Is there a free tier?
Yes, Telemetry Harbor offers a free tier that allows you to get started with basic data ingestion and visualization for prototyping and personal projects. Refer to our [Telemetry Harbor Types & Tiers](../introduction/concepts.md#telemetry-harbor-types--tiers) for details.

### How is pricing calculated?
Pricing is based on the **selected Harbor tier** and is **billed hourly**. Each tier includes specific limits on data ingestion, storage, and features. You can view a detailed breakdown on our [Pricing page](https://telemetryharbor.com/pricing) and learn more about available [Telemetry Harbor Types & Tiers](../introduction/concepts.md#telemetry-harbor-types--tiers).


### How do I upgrade my plan?
You can upgrade your plan directly from your Telemetry Harbor dashboard or by contacting our sales team.

## Troubleshooting

### My data is not appearing in Grafana. What should I check?
1.  **Verify Data Ingestion**: Ensure your device/application is successfully sending data to Telemetry Harbor. Check your application logs for API response codes.
2.  **API Key/Endpoint**: Double-check that your API Key and ingestion endpoint are correct.
3.  **Time Range in Grafana**: Make sure the time range selected in your Grafana dashboard covers the period when data was sent.
4.  **Filters in Grafana**: Ensure any `ship_id` or `cargo_id` filters in your Grafana panels match the data you are sending.
5.  **Harbor Status**: Check your Telemetry Harbor dashboard to ensure your Harbor is active and not exceeding any limits.

### I'm getting a "401 Unauthorized" error.
This usually means your API Key is missing or incorrect. Verify that the `X-API-Key` header is correctly set in your requests with the right key.

### I'm getting a "429 Too Many Requests" error.

This indicates you've exceeded the API rate limits for your current plan. To handle this gracefully, implement [exponential backoff](../api/rate-limiting#handling-rate-limit-errors) in your application to retry requests after a delay.

### I'm getting a "400 Bad Request" when sending a batch.

If you're sending a batch with, for example, 10 data points but your plan only allows 5 per request, you'll receive a `400 Bad Request`. This is different from a `429`—you are allowed to send data, but your **batch size exceeds your plan's per-request limit**. Reduce the number of points per batch to resolve the issue.


### How do I contact support?
For technical support, you can use our [GitHub Issues](https://github.com/TelemetryHarbor/telemetry-harbor/issues) page or email `support@telemetryharbor.com`. 

If your question isn't answered here, please don't hesitate to reach out to our community or support team!
