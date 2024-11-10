---
sidebar_position: 2
---

# Python

This guide demonstrates how to ingest data into Telemetry Harbor using Python.

## Prerequisites

- Python 3.6 or higher
- requests library

## Single Data Push

To send a single data point to Telemetry Harbor:

1. Import the necessary libraries
2. Set up the API endpoint and your API key
3. Create a dictionary with your sensor data
4. Send a POST request to the API endpoint
5. Print the response

Here's an example of how to perform a single data push:

```
import requests
import json
from datetime import datetime

url = "http://example.hive.telemetryhive.com/api/v1/ingest"
headers = {"X-API-Key": "your_api_key"}
data = {
    "time": datetime.utcnow().isoformat(),
    "ship_id": "ship1",
    "sensor_id": "sen1",
    "value": 23.5
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```
Remember to replace "your_api_key" with your actual Telemetry Harbor API key.

## Batch Data Push

For sending multiple data points in one request:

1. Import the necessary libraries
2. Set up the API endpoint and your API key
3. Create a list of dictionaries, each containing sensor data
4. Send a POST request to the batch API endpoint
5. Print the response

Here's an example of how to perform a batch data push:

```
import requests
from datetime import datetime

url = "http://example.hive.telemetryhive.com/api/v1/ingest/batch"
headers = {"X-API-Key": "your_api_key"}
data = [
    {
        "time": datetime.utcnow().isoformat(),
        "ship_id": "ship1",
        "sensor_id": "sen1",
        "value": 23.5
    },
    {
        "time": datetime.utcnow().isoformat(),
        "ship_id": "ship1",
        "sensor_id": "sen2",
        "value": 18.7
    }
]

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

## Error Handling

It's important to implement proper error handling in your code. Here's an example of how you might add error handling:
```
import requests
from datetime import datetime

url = "http://example.hive.telemetryhive.com/api/v1/ingest"
headers = {"X-API-Key": "your_api_key"}
data = {
    "time": datetime.utcnow().isoformat(),
    "ship_id": "ship1",
    "sensor_id": "sen1",
    "value": 23.5
}

try:
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()  # Raises a HTTPError if the status is 4xx, 5xx
    print(response.json())
except requests.exceptions.HTTPError as errh:
    print("Http Error:", errh)
except requests.exceptions.ConnectionError as errc:
    print("Error Connecting:", errc)
except requests.exceptions.Timeout as errt:
    print("Timeout Error:", errt)
except requests.exceptions.RequestException as err:
    print("Something went wrong:", err)
```
## Best Practices

- Use environment variables to store your API key:

```
import os

api_key = os.environ.get('TELEMETRY_HARBOR_API_KEY')
headers = {"X-API-Key": api_key}
```

- Implement retry logic for failed requests:

```
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

session = requests.Session()
retries = Retry(total=5, backoff_factor=0.1, status_forcelist=[500, 502, 503, 504])
session.mount('http://', HTTPAdapter(max_retries=retries))

response = session.post(url, headers=headers, json=data)
```

- Consider using asynchronous requests for improved performance in high-volume scenarios:

```
import asyncio
import aiohttp

async def send_data(session, url, headers, data):
    async with session.post(url, headers=headers, json=data) as response:
        return await response.json()

async def main():
    async with aiohttp.ClientSession() as session:
        tasks = []
        for _ in range(10):  # Send 10 requests concurrently
            task = asyncio.ensure_future(send_data(session, url, headers, data))
            tasks.append(task)
        responses = await asyncio.gather(*tasks)
        print(responses)

asyncio.run(main())
```

These best practices will help you create more robust and efficient data ingestion scripts for Telemetry Harbor.