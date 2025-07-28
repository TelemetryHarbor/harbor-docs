---
sidebar_position: 1
title: Quick Start Guide
description: Get started with Telemetry Harbor in minutes. Create an account, set up a harbor, send data, and visualize.
---

# Quick Start Guide

This guide will help you get up and running with Telemetry Harbor quickly. Follow these steps to create your account, set up a harbor, send your first data point, and visualize it in Grafana.

## 1. Create an Account

1.  Visit [Telemetry Harbor's website](https://www.telemetryharbor.com) and click on "Sign Up".
2.  Fill in your details and submit the registration form.
3.  Check your email for a verification link and click it to verify your account.

## 2. Create a Harbor

1.  Log in to your Telemetry Harbor dashboard.
2.  Click on "Create New Harbor" and select General for the type and Free for the specs.
3.  Once created, you can view the Harbor Details.


## 3. Get Your API Endpoints and Key

From the Harbor Details page, you will find the necessary credentials:

1.  Copy the **Single Ingestion Endpoint** or **Batch Ingestion Endpoint** as needed.
2.  Copy your **API Key**. Keep this secure, as it's used to authenticate your requests.

:::warning Security Notice
Your API Key is sensitive. Do not share it publicly or embed it directly in client-side code. Use environment variables for secure storage.
:::


## 4. Send Your First Data Point

You can send data using either the Single Data Push or Batch Data Push endpoints. The data model and specific cURL examples for sending data to a General Harbor can be found in the [Harbor Types](../getting-started/harbor-types.md#ingesting-data-to-a-general-harbor) documentation.

**General Endpoints:**
-   **Single Data Push**: `POST https://telemetryharbor.com/api/v1/ingest/ingest/your_harbor_id`
-   **Batch Data Push**: `POST https://telemetryharbor.com/api/v1/ingest/ingest/your_harbor_id/batch`

Replace `your_harbor_id` and `your_api_key` with the actual values from your Harbor Details page.
```bash
curl -X POST "YOUR_SINGLE_ENDPOINT" \
-H "X-API-Key: "YOUR_API_KEY" \
-H "Content-Type: application/json" \
-d '{
  "time": "2025-01-18T19:24:00.948Z",
  "ship_id": "test_device_single",
  "cargo_id": "test_metric",
  "value": 123.45}'
```


## 5. Visualize Your Data

Telemetry Harbor integrates seamlessly with Grafana for powerful data visualization.

1.  From the Harbor Details, copy the **Grafana Endpoint** and **Grafana Password**.
2.  Open the Grafana endpoint in your browser and log in using:
    -   **Username**: \[Your Telemetry Harbor Account Email]
    -   **Password**: \[The password from Harbor Details]
3.  You'll find pre-configured dashboards ready for your data.


## 6. Explore the Demo Dashboard

To get started quickly:

1.  In Grafana, look for the "Comprehensive Telemetry Dashboard" in your list of dashboards.
2.  Open it to see example visualizations of telemetry data.
3.  Use this as a template to create your own custom dashboards.


Congratulations! You've set up your Telemetry Harbor account, sent your first data point, and accessed your visualization tools. From here, you can start ingesting real data and creating custom dashboards to suit your needs.

For more detailed information on data ingestion, API usage, and advanced Grafana configurations, check out our other guides in the documentation.
