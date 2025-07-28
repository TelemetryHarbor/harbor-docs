---
sidebar_position: 3
title: Rate Limiting
description: Understand API error responses and how to handle rate limits.
---

# Rate Limiting

Telemetry Harbor enforces rate limits to ensure system stability and fair usage across tenants. These limits vary depending on your **Harbor type** and **subscription plan**.

## Categories of Limits

Rate limiting is applied **per second**, across two main categories:

- **Single Data Requests** – Limits individual data point submissions (e.g., one JSON payload per request).
- **Batch Requests** – Apply to requests that contain multiple data points in a single payload.

Refer to your Harbor's limits under [Telemetry Harbor Tiers](https://telemetryharbor.com/pricing) for exact thresholds.


## Common HTTP Errors

The API returns specific HTTP status codes when request limits or formats are violated:

| Status Code | Meaning                                                                 |
|-------------|-------------------------------------------------------------------------|
| `429`       | **Rate limit exceeded** – Too many requests in a short time.           |
| `403`       | **Invalid API key** – Your key is missing, expired, or unauthorized.   |
| `400`       | **Batch size exceeded** – You sent too many items in a single request. |
| `422`       | **Invalid payload structure** – Your data format doesn't match the expected schema for your Harbor type. |
| `404`       | **Harbor not found** – The specified Harbor does not exist or is offline. |
| `500`       | **Internal server error** – Something went wrong on our side.          |


## Handling API Errors Gracefully

Telemetry Harbor APIs return specific HTTP status codes to help you identify and handle issues correctly. Below are the common error types and how your client should respond to each.

### 429 Too Many Requests

You have exceeded your rate limit.


**How to handle it:**

* Use exponential backoff with jitter to retry after a delay.
* Avoid sending bursts of requests. Optimize your submission frequency.
* If your use case requires higher throughput, consider upgrading your Harbor plan. See [Telemetry Harbor Tiers](https://telemetryharbor.com/pricing).



### 403 Forbidden

Your API key is invalid, expired, or unauthorized.


**How to handle it:**

* Check if your API key is valid.
* Ensure your key has access to the target Harbor.
* Regenerate your key if necessary.


### 400 Bad Request

You may have exceeded the batch size or sent a malformed request.


**How to handle it:**

* Break large batches into smaller chunks.
* Verify limits for your Harbor type.


### 422 Unprocessable Entity

Your payload structure doesn't match the expected schema.


**How to handle it:**

* Ensure your payload follows the schema defined for your Harbor type.
* Validate JSON structure, field names, and data types before submission.


### 404 Not Found

The specified Harbor does not exist or is unreachable.

**How to handle it:**

* Double-check the Harbor ID or endpoint.
* Make sure the Harbor is online and accessible.


### 500 Internal Server Error

An unexpected error occurred on the server.

**How to handle it:**

* Wait briefly and retry.
* If the issue persists, contact support.


### Consider Upgrading

If you're consistently hitting rate or size limits, upgrading to a higher-tier Harbor can give you:

- Increased rate and batch limits
- Unlimited GB Storage
- Advanced Backup
- Priority Support

See [Telemetry Harbor Tiers](https://telemetryharbor.com/pricing) for details.


