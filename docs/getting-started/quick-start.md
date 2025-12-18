---
sidebar_position: 1
title: Quick Start Guide
description: Get started with Telemetry Harbor in minutes. Create an account, set up a harbor, send data, and visualize.
---

# Quick Start Guide

This guide will help you get up and running with Telemetry Harbor quickly. Follow these steps to create your account, set up a harbor, send your first data point, and visualize it in Grafana.

## 1. Create an Account

1.  Visit [Telemetry Harbor's website](https://www.harborscale.com) and click on "Sign Up".
2.  Fill in your details and submit the registration form.
3.  Check your email for a verification link and click it to verify your account.

## 2. Create a Harbor

1.  Log in to your Telemetry Harbor dashboard.
2.  Click on "Create New Harbor" and select **General** for the type and **Free** for the specs.
3.  Once created, you can view the Harbor Details.

## 3. Get Your API Endpoints and Key

From the Harbor Details page, you will find the necessary credentials:

1.  Copy the **Single Ingestion Endpoint** or **Batch Ingestion Endpoint**.
2.  Copy your **API Key**. Keep this secure, as it's used to authenticate your requests.

:::warning
**Security Notice**

Your API Key is sensitive. Do not share it publicly or embed it directly in client-side code. Use environment variables for secure storage.
:::



## 4. Send Your First Data Point

You can send data using `curl`. Since the API requires a timestamp, we will generate the current time automatically so your data appears in Grafana immediately.

**General Endpoints:**
-   **Single Data Push**: `POST https://harborscale.com/api/v2/ingest/your_harbor_id`
-   **Batch Data Push**: `POST https://harborscale.com/api/v2/ingest/your_harbor_id/batch`

Replace `YOUR_HARBOR_ID` and `YOUR_API_KEY` in the examples below.

### Linux / MacOS (Bash)
This command automatically inserts the current UTC timestamp:

```bash
curl -X POST "https://harborscale.com/api/v2/ingest/YOUR_HARBOR_ID" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"time\": \"$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")\",
    \"ship_id\": \"quickstart_ship\",
    \"cargo_id\": \"temperature\",
    \"value\": 24.5
  }"
````

### Windows (PowerShell)

Use this command if you are on Windows:

```powershell
$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")

Invoke-RestMethod -Uri "https://harborscale.com/api/v2/ingest/YOUR_HARBOR_ID" `
  -Method Post `
  -Headers @{ "X-API-Key" = "YOUR_API_KEY" } `
  -ContentType "application/json" `
  -Body (@{
    time = $timestamp
    ship_id = "quickstart_ship"
    cargo_id = "temperature"
    value = 24.5
  } | ConvertTo-Json)
```

## 5\. Visualize Your Data

Telemetry Harbor integrates seamlessly with Grafana for powerful data visualization.

1.  From the Harbor Details, copy the **Grafana Endpoint** and **Grafana Password**.
    > **Note:** Your Grafana password is different from your main account password.
2.  Open the Grafana endpoint in your browser and log in using:
      - **Username**: [Your Telemetry Harbor Account Email]
      - **Password**: [The password from Harbor Details]
3.  You'll find pre-configured dashboards ready for your data.

## 6\. Explore the Demo Dashboard

To get started quickly:

1.  In Grafana, look for the **"Comprehensive Telemetry Dashboard"** in your list of dashboards.
2.  Open it to see example visualizations of the data you just sent.
3.  Use this as a template to create your own custom dashboards.

-----

**Congratulations\!** You've set up your Telemetry Harbor account, sent your first data point, and accessed your visualization tools.

For more detailed information on data ingestion, API usage, and advanced Grafana configurations, check out our [Harbor Types documentation](https://docs.harborscale.com/docs/getting-started/harbor-types).
