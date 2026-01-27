

---

# Rate Limiting & Error Codes

**Harbor Scale** enforces rate limits to ensure system stability and fair usage across all tenants. These limits are dynamic, determined by your **Harbor type** and **subscription plan**.

## Categories of Limits

Rate limiting is applied **per second** across two main categories:

* **Single Data Requests:** Limits individual data point submissions (e.g., one JSON payload per request).
* **Batch Requests:** Applies to requests containing multiple data points within a single payload.

> **Note:** For exact thresholds regarding your plan, refer to the [Harbor Scale Tiers](https://harborscale.com/pricing).

---

## Common HTTP Errors

The API returns standard HTTP status codes to indicate success or specific failure types. Use the table below as a quick reference for troubleshooting.

| Status Code | Error Type | Meaning |
| --- | --- | --- |
| **`429`** | Rate Limit Exceeded | Too many requests sent within a short timeframe. |
| **`403`** | Forbidden | API key is missing, expired, or unauthorized. |
| **`400`** | Bad Request | Batch size exceeded or malformed syntax. |
| **`422`** | Unprocessable Entity | Data format does not match the expected schema. |
| **`404`** | Not Found | The specified Harbor ID does not exist or is offline. |
| **`500`** | Internal Server Error | An unexpected server-side issue occurred. |

---

## Handling API Errors Gracefully

When your client encounters an error, it should respond programmatically to ensure data integrity and system stability.

### `429` Too Many Requests

You have exceeded the rate limit for your tier.

> **How to handle it:**
> * **Implement Backoff:** Use an exponential backoff strategy with jitter to retry the request after a delay.
> * **Pacing:** Avoid sending sudden bursts of traffic; smooth out your submission frequency.
> * **Upgrade:** If high throughput is a requirement, check [Harbor Scale Tiers](https://harborscale.com/pricing) for a higher plan.
> 
> 

### `403` Forbidden

Your API key is invalid, expired, or does not have permission for this resource.

> **How to handle it:**
> * Verify that your API key is correct and included in the headers.
> * Ensure the key has not expired and has access permissions for the target Harbor.
> * Regenerate the key in your dashboard if compromised or lost.
> 
> 

### `400` Bad Request

The request was malformed, or the batch size limit was exceeded.

> **How to handle it:**
> * **Chunking:** Break large batch requests into smaller chunks.
> * **Validation:** Check your request syntax against the documentation limits.
> 
> 

### `422` Unprocessable Entity

The server understands the content type, but the payload structure is invalid (e.g., missing required fields or wrong data types).

> **How to handle it:**
> * Validate your JSON structure against the schema defined for your Harbor type.
> * Check field names, data types, and nesting before resubmitting.
> 
> 

### `404` Not Found

The requested resource or Harbor endpoint is unavailable.

> **How to handle it:**
> * Double-check the **Harbor ID** in the URL.
> * Verify that the Harbor instance is currently online and active.
> 
> 

### `500` Internal Server Error

An error occurred on the Harbor Scale servers.

> **How to handle it:**
> * Wait briefly and retry the request.
> * If the error persists, please contact support.
> 
> 

---

### Need Higher Limits?

If you consistently hit `429` Rate Limit or `400` Batch Size errors, your workload may have outgrown your current plan. Upgrading offers:

* **Increased throughput** (Higher rate & batch limits)
* **Unlimited Storage**
* **Advanced Backup & Priority Support**

[View Pricing & Tiers](https://harborscale.com/pricing)

