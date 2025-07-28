---
sidebar_position: 1
title: Authentication
description: How to authenticate your requests to the Telemetry Harbor API using API Keys.
---

# Authentication

Telemetry Harbor uses API Key authentication to secure access to our API. To authenticate your requests, you must include your API key in the header of each request.

## API Key Header

Include the following header in all your API requests:

```
X-API-Key: your_api_key_here
```

Replace \`your_api_key_here\` with the actual API key provided to you by Telemetry Harbor. If you don't have an API key, please contact our support team or retrieve it from your [Harbor Details page](../getting-started/quick-start.md#3-get-your-api-endpoints-and-key).

:::tip Visual Aid
Add a diagram showing an HTTP request with the `X-API-Key` header.
<img src="/placeholder.svg?height=300&width=500" alt="Diagram of HTTP request with X-API-Key header" />
:::

## Security Best Practices

To ensure the security of your Telemetry Harbor account and data, follow these best practices for managing your API keys:

-   **Keep your API key confidential and secure.** Treat it like a password.
-   **Do not share your API key in publicly accessible areas** such as GitHub repositories, client-side code (e.g., JavaScript in a browser), or public forums.
-   **Rotate your API key periodically** for enhanced security. If you suspect your API key has been compromised, generate a new one immediately from your Telemetry Harbor dashboard.
-   **Use environment variables** to store your API key in your applications. This prevents hardcoding sensitive information directly into your codebase.

  **Example (Node.js):**
  ```javascript
  // In your application code
  const API_KEY = process.env.TELEMETRY_HARBOR_API_KEY;

  // In your .env file (for local development)
  // TELEMETRY_HARBOR_API_KEY=your_actual_api_key
  ```

  **Example (Python):**
  ```python
  import os

  # In your application code
  API_KEY = os.environ.get("TELEMETRY_HARBOR_API_KEY")

  # In your .env file (for local development)
  # TELEMETRY_HARBOR_API_KEY=your_actual_api_key
  ```

-   **Implement server-side ingestion** for sensitive data. Avoid sending data directly from client-side applications (e.g., web browsers, mobile apps) if it requires your private API key. Instead, route data through a secure backend server that holds your API key.

By adhering to these practices, you can significantly enhance the security posture of your Telemetry Harbor integration.
