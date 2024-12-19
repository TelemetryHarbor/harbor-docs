---
sidebar_position: 1
---

# Quick Start

This guide will help you get up and running with Telemetry Harbor quickly.

## 1. Create an Account

1. Visit [Telemetry Harbor's website](https://www.telemetryharbor.com) and click on "Sign Up".
2. Fill in your details and submit the registration form.
3. Check your email for a verification link and click it to verify your account.

## 2. Create a Harbor

1. Log in to your Telemetry Harbor dashboard.
2. Click on "Create New Harbor" and follow the prompts to set it up.
3. Once created, you can view the Harbor Details.

## 3. Get Your API Endpoints and Key

From the Harbor Details:

1. Copy the Single Ingestion Endpoint or Batch Ingestion Endpoint as needed.
2. Copy your API key. Keep this secure, as it's used to authenticate your requests.

## 4. Send Your First Data Point

`Shared`
- Single Data Push: `POST https://telemetryharbor.com/api/v1/ingest/ingest/harbor_id`

`Enterprise Dedicated`
- Single Data Push: `POST https://CustomName.harbor.telemetryharbor.com/api/v1/ingest/ingest/harbor_id`

Use cURL to send a test data point:

```
curl -X POST https://your-ingestion-endpoint \
-H "X-API-Key: your_api_key" \
-H "Content-Type: application/json" \
-d '{
  "time": "2024-11-18T19:44:16.160Z",
  "ship_id": "test_ship",
  "cargo_id": "test_sensor",
  "value": 42
}'
```

Replace `your-ingestion-endpoint` and `your_api_key` with the values from your Harbor Details page.

## 5. Visualize Your Data

1. From the Harbor Details, copy the Grafana endpoint and password.
2. Open the Grafana endpoint in your browser and log in using:
   - Username: [Your Telemetry Harbor Account Email]
   - Password: [The password from Harbor Details]
3. You'll find pre-configured dashboards ready for your data.

## 6. Explore the Demo Dashboard

To get started quickly:

1. In Grafana, look for the "Comprehensive Telemetry Dashboard" in your list of dashboards.
2. Open it to see example visualizations of telemetry data.
3. Use this as a template to create your own custom dashboards.

Congratulations! You've set up your Telemetry Harbor account, sent your first data point, and accessed your visualization tools. From here, you can start ingesting real data and creating custom dashboards to suit your needs.

For more detailed information on data ingestion, API usage, and advanced Grafana configurations, check out our other guides in the documentation.

