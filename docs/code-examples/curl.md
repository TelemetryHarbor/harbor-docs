---
sidebar_position: 5
---

# cURL

This guide demonstrates how to ingest data into Telemetry Harbor using cURL, a command-line tool for making HTTP requests.

## Prerequisites

- cURL installed on your system
- Basic knowledge of command-line operations

## Single Data Push

To send a single data point to Telemetry Harbor using cURL:

1. Open your terminal or command prompt
2. Construct the cURL command with the API endpoint, headers, and data
3. Execute the command to send the request
4. View the response

Here's an example of how to perform a single data push using cURL:
```
curl -X POST https://telemetryharbor.com/api/v1/ingest/harbor_id \
-H "X-API-Key: your_api_key" \
-H "Content-Type: application/json" \
-d ' {
    "time": "2024-11-18T19:44:16.160Z",
    "ship_id": "string",
    "cargo_id": "string",
    "value": 0
  }'
```

Remember to replace "your_api_key" with your actual Telemetry Harbor API key.

## Batch Data Push

For sending multiple data points in one request:

1. Open your terminal or command prompt
2. Construct the cURL command with the batch API endpoint, headers, and an array of data points
3. Execute the command to send the request
4. View the response

Here's an example of how to perform a batch data push using cURL:

```
curl -X POST http://telemetryharbor.com/api/v1/ingest/harbor_id/batch \
-H "X-API-Key: your_api_key" \
-H "Content-Type: application/json" \
-d '[
   {
    "time": "2024-11-18T19:44:16.160Z",
    "ship_id": "string",
    "cargo_id": "string",
    "value": 0
  },
   {
    "time": "2024-11-18T19:44:16.160Z",
    "ship_id": "string",
    "cargo_id": "string",
    "value": 0
  }
]'
```
## Error Handling

When using cURL, you can add options to see more information about the request and response, which can be helpful for error handling:

```
curl -X POST http://telemetryharbor.com/api/v1/ingest/harbor_id \
-H "X-API-Key: your_api_key" \
-H "Content-Type: application/json" \
-d ' {
    "time": "2024-11-18T19:44:16.160Z",
    "ship_id": "string",
    "cargo_id": "string",
    "value": 0
  }' \
-v -i
```
The -v option enables verbose mode, which shows you the full request and response details.
The -i option includes the HTTP response headers in the output.

## Best Practices

- Use environment variables to store your API key:

```
export TELEMETRY_HARBOR_API_KEY="your_api_key"
```
```
curl -X POST http://telemetryharbor.com/api/v1/ingest/harbor_id \
-H "X-API-Key: $TELEMETRY_HARBOR_API_KEY" \
-H "Content-Type: application/json" \
-d ' {
    "time": "2024-11-18T19:44:16.160Z",
    "ship_id": "string",
    "cargo_id": "string",
    "value": 0
  }'
```

- Implement retry logic for failed requests:

You can use a shell script to implement retry logic. Here's an example:

```#!/bin/bash

MAX_RETRIES=3
RETRY_DELAY=5

for i in $(seq 1 $MAX_RETRIES); do
    response=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://telemetryharbor.com/api/v1/ingest/harbor_id \
    -H "X-API-Key: your_api_key" \
    -H "Content-Type: application/json" \
    -d ' {
    "time": "2024-11-18T19:44:16.160Z",
    "ship_id": "string",
    "cargo_id": "string",
    "value": 0
  }')

    if [ $response -eq 200 ]; then
        echo "Data sent successfully"
        exit 0
    else
        echo "Attempt $i failed. Retrying in $RETRY_DELAY seconds..."
        sleep $RETRY_DELAY
    fi
done

echo "Failed to send data after $MAX_RETRIES attempts"
exit 1
```

- Use jq for JSON manipulation in complex scenarios:

If you need to manipulate JSON data before sending it, you can use jq, a lightweight command-line JSON processor:

```
echo ' {
    "time": "2024-11-18T19:44:16.160Z",
    "ship_id": "string",
    "cargo_id": "string",
    "value": 0
  }' | jq '.value += 1.0' | \
curl -X POST http://telemetryharbor.com/api/v1/ingest/harbor_id \
-H "X-API-Key: your_api_key" \
-H "Content-Type: application/json" \
-d @-
```

This example increases the value by 1.0 before sending the data.

These best practices will help you create more robust and efficient data ingestion scripts for Telemetry Harbor using cURL.