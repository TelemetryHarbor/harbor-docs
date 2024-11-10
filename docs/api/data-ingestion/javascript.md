---
sidebar_position: 3
---

# JavaScript

This guide demonstrates how to ingest data into Telemetry Harbor using JavaScript.

## Prerequisites

- Node.js installed
- axios library

## Single Data Push

To send a single data point to Telemetry Harbor:

1. Import the axios library
2. Set up the API endpoint and your API key
3. Create an object with your sensor data
4. Send a POST request to the API endpoint
5. Log the response or handle any errors

Here's an example of how to perform a single data push:
```
const axios = require("axios");

const url = "http://example.hive.telemetryhive.com/api/v1/ingest";
const headers = { "X-API-Key": "your_api_key" };
const data = {
  time: new Date().toISOString(),
  bee_id: "bee1",
  sensor_id: "sen1",
  value: 23.5
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```
Remember to replace "your_api_key" with your actual Telemetry Harbor API key.

## Batch Data Push

For sending multiple data points in one request:

1. Import the axios library
2. Set up the API endpoint and your API key
3. Create an array of objects, each containing sensor data
4. Send a POST request to the batch API endpoint
5. Log the response or handle any errors

Here's an example of how to perform a batch data push:

```const axios = require("axios");

const url = "http://example.hive.telemetryhive.com/api/v1/ingest/batch";
const headers = { "X-API-Key": "your_api_key" };
const data = [
  { time: new Date().toISOString(), bee_id: "bee1", sensor_id: "sen1", value: 23.5 },
  { time: new Date().toISOString(), bee_id: "bee1", sensor_id: "sen2", value: 18.7 }
];

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));```

## Error Handling

It's important to implement proper error handling in your code. Here's an example of how you might add error handling:

```const axios = require("axios");

const url = "http://example.hive.telemetryhive.com/api/v1/ingest";
const headers = { "X-API-Key": "your_api_key" };
const data = {
  time: new Date().toISOString(),
  bee_id: "bee1",
  sensor_id: "sen1",
  value: 23.5
};

axios.post(url, data, { headers })
  .then(response => {
    console.log("Data sent successfully:", response.data);
  })
  .catch(error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with error:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }
  });
```
## Best Practices

- Use environment variables to store your API key:

```const apiKey = process.env.TELEMETRY_HARBOR_API_KEY;
const headers = { "X-API-Key": apiKey };```

- Implement retry logic for failed requests:

```const axios = require("axios");
const axiosRetry = require("axios-retry");

const client = axios.create();
axiosRetry(client, { retries: 3 });

client.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));```

- Consider using async/await for cleaner asynchronous code:

```const axios = require("axios");

async function sendData(url, headers, data) {
  try {
    const response = await axios.post(url, data, { headers });
    console.log("Data sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending data:", error.message);
  }
}

sendData(url, headers, data);```

These best practices will help you create more robust and efficient data ingestion scripts for Telemetry Harbor using JavaScript.