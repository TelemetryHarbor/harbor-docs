---
sidebar_position: 1
title: Authentication
description: How to authenticate your requests using API Keys.
---

# Authentication

Harbor Scale uses **API Keys** to secure your ingestion endpoints. Every Harbor you deploy has its own unique API Key.

## API Key Header

To authenticate, you must include the following header in all your HTTP requests:


```

X-API-Key: your_api_key_here

```

## Where to find your Key

You can retrieve your key instantly from the Dashboard:

2.  **Harbor Details:** Open your Harbors page, click the **...** tab, and click the 👁️ (Show) icon next to **Access Key**.

## Security Best Practices

To ensure the security of your account, follow these rules:

-   **Treat it like a password.** Never share screenshots of your dashboard containing the visible key.
-   **Do not commit it to GitHub.** If you are writing code, use Environment Variables (see below).
-   **Rotate if compromised.** You can instantly generate a new key by clicking the "Refresh" icon in the **Details** tab. *Note: This will break existing devices until you update them.*

### Using Environment Variables (Recommended)

Instead of hardcoding the key, store it in an `.env` file or your server's environment settings.

**Node.js Example:**
```javascript
// Good Practice
const API_KEY = process.env.HARBOR_API_KEY;

// Bad Practice
// const API_KEY = "hs_live_12345..."; 

```

**Python Example:**

```python
import os

# Good Practice
api_key = os.environ.get("HARBOR_API_KEY")

```
