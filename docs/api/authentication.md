---
sidebar_position: 1
---

# Authentication

Telemetry Harbor uses API Key authentication to secure access to our API. To authenticate your requests, you must include your API key in the header of each request.

## API Key Header

Include the following header in all your API requests:
```
X-API-Key: your_api_key_here
```
Replace your_api_key_here with the actual API key provided to you by Telemetry Harbor. If you don't have an API key, please contact our support team.

## Security Best Practices

- Keep your API key confidential and secure.
- Do not share your API key in publicly accessible areas such as GitHub or client-side code.
- Rotate your API key periodically for enhanced security.
- Use environment variables to store your API key in your applications.