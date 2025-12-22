---
sidebar_position: 12
title: HTTP Uptime Monitoring
description: Monitor website availability, response codes, and latency with Harbor Lighthouse.
---

# HTTP Uptime Monitoring

This guide explains how to use **Harbor Lighthouse** to monitor the availability and performance of your websites or APIs. The `uptime` collector acts as a persistent probe, pinging your target URLs to track uptime history, response times, and status codes.

**_Repo Link:_** https://github.com/harborscale/harbor-lighthouse

## Prerequisites

Before starting, ensure you have:

-   **Harbor Lighthouse** installed (See [Installation Guide](/docs/lighthouse/)).
-   A **Target URL** (e.g., `https://google.com` or an internal API endpoint).
-   **Harbor Scale account** credentials.

## How it Works

The Lighthouse agent performs periodic HTTP/HTTPS `GET` requests to the specified target. It measures the time taken for the server to respond (latency) and captures the HTTP status code (e.g., `200 OK`, `500 Error`).



This is useful for:
* **External Monitoring:** verifying your public website is accessible from the internet.
* **Internal Monitoring:** checking if internal APIs or dashboards are running inside your private network.

---

## Setup Guide

### 1. Add the Monitor

Use the `lighthouse` CLI to create a new uptime monitor. You must provide the `target_url` parameter.

**For Harbor Scale Cloud:**

```bash
lighthouse --add \
  --name "my-website" \
  --harbor-id "YOUR_HARBOR_ID" \
  --key "YOUR_API_KEY" \
  --source uptime \
  --param target_url="[https://harborscale.com](https://harborscale.com)"
```

**For Self-Hosted / OSS:**

```bash
lighthouse --add \
  --name "internal-api" \
  --endpoint "http://YOUR_IP:8000" \
  --key "YOUR_API_KEY" \
  --source uptime \
  --param target_url="[http://192.168.1.50:3000/health](http://192.168.1.50:3000/health)"
```

> **Note:** The `--name` you choose will identify this specific check in your dashboard.

---

## Configuration Parameters

The `uptime` collector uses the `--param` flag to pass specific settings. You can chain multiple params if needed.

| Parameter | Required? | Description | Default |
| --- | --- | --- | --- |
| `target_url` | ✅ Yes | The full URL to monitor (must include `http://` or `https://`). | - |
| `timeout_ms` | ❌ No | How long to wait for a response before marking it as "Down" (in milliseconds). | `5000` (5s) |

### Example: Custom Timeout

To monitor a slow internal service and give it 10 seconds to respond:

```bash
lighthouse --add \
  --name "slow-service" \
  --harbor-id "123" \
  --key "xyz" \
  --source uptime \
  --param target_url="http://local-service" \
  --param timeout_ms=10000
```

---

## Available Metrics

The collector reports the following data points for every check:

| Metric | Description |
| --- | --- |
| **Status** | The health state (`up` or `down`). |
| **Status Code** | The HTTP response code received (e.g., `200`, `404`, `503`). |
| **Latency** | Time taken to receive the response headers (in milliseconds). |
| **Availability** | Boolean flag indicating success or failure. |

---

## Troubleshooting

### Common Issues

**"Monitor is Unhealthy" or "Connection Refused"**

* **Cause:** The machine running Lighthouse cannot reach the `target_url`.
* **Fix:** Try running `curl -I <url>` from the terminal on the same machine to verify connectivity.

**"Timeout" errors on valid sites**

* **Cause:** The server is responding too slowly for the default 5-second limit.
* **Fix:** Increase the timeout using `--param timeout_ms=10000`.

**SSL/TLS Errors**

* **Cause:** Lighthouse validates SSL certificates by default. If your internal site uses a self-signed certificate, the check may fail.
* **Fix:** Ensure the machine running Lighthouse trusts the CA of your internal certificate.
