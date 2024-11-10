---
sidebar_position: 4
---

# Rate Limiting

To ensure fair usage and maintain system stability, Telemetry Harbor implements rate limiting on API requests. The specific limits depend on your subscription plan.

## Rate Limit Categories

- Single Data Requests: Limits apply to individual data point submissions.
- Batch Requests: Separate limits apply to batch data submissions.

Rate limits are applied on a per-second basis and may vary based on your subscription tier. For detailed information on the rate limits that apply to your account, please refer to the Telemetry Harbor Specs page or contact our support team.

## Handling Rate Limit Errors

If you exceed the rate limit, the API will return a 429 (Too Many Requests) status code. In this case, you should implement exponential backoff in your client application to retry the request after a delay.

We recommend implementing proper error handling and retry logic in your applications to gracefully handle rate limit errors and ensure data integrity.