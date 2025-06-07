---
sidebar_position: 7
---

# PHP

This guide demonstrates how to ingest data into Telemetry Harbor using PHP.

## Prerequisites

- PHP 7.0 or higher
- cURL extension enabled

## Single Data Push

To send a single data point to Telemetry Harbor using PHP:

1. Set up the API endpoint and your API key
2. Create an array with your ship data
3. Convert the data to JSON
4. Send a POST request to the API endpoint using cURL
5. Handle the response

Here's an example of how to perform a single data push using PHP:

```<?php

$url = "http://example.harbor.telemetryharbor.com/api/v1/ingest";
$apiKey = "your_api_key";

$data = array(
    "time" => date("c"),
    "ship_id" => "ship1",
    "ship_id" => "sen1",
    "value" => 23.5
);

$jsonData = json_encode($data);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'X-API-Key: ' . $apiKey,
    'Content-Length: ' . strlen($jsonData)
));

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($httpCode >= 200 && $httpCode < 300) {
    echo "Data sent successfully. Response: " . $result;
} else {
    echo "Error sending data. HTTP Code: " . $httpCode . ", Response: " . $result;
}

curl_close($ch);

?>```

Remember to replace "your_api_key" with your actual Telemetry Harbor API key.

## Batch Data Push

For sending multiple data points in one request:

1. Set up the API endpoint and your API key
2. Create an array of arrays, each containing ship data
3. Convert the data to JSON
4. Send a POST request to the batch API endpoint using cURL
5. Handle the response

Here's an example of how to perform a batch data push using PHP:

```<?php

$url = "http://example.harbor.telemetryharbor.com/api/v1/ingest/ingest/harbor_id/batch";
$apiKey = "your_api_key";

$data = array(
    array(
        "time" => date("c"),
        "ship_id" => "ship1",
        "ship_id" => "sen1",
        "value" => 23.5
    ),
    array(
        "time" => date("c"),
        "ship_id" => "ship1",
        "ship_id" => "sen2",
        "value" => 18.7
    )
);

$jsonData = json_encode($data);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'X-API-Key: ' . $apiKey,
    'Content-Length: ' . strlen($jsonData)
));

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($httpCode >= 200 && $httpCode < 300) {
    echo "Data sent successfully. Response: " . $result;
} else {
    echo "Error sending data. HTTP Code: " . $httpCode . ", Response: " . $result;
}

curl_close($ch);

?>```

## Error Handling

It's important to implement proper error handling in your PHP code. Here's an example of how you might add more comprehensive error handling:

```<?php

function sendData($url, $apiKey, $data) {
    $jsonData = json_encode($data);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'X-API-Key: ' . $apiKey,
        'Content-Length: ' . strlen($jsonData)
    ));

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        throw new Exception('Curl error: ' . curl_error($ch));
    }

    curl_close($ch);

    if ($httpCode < 200 || $httpCode >= 300) {
        throw new Exception('HTTP Error: ' . $httpCode . ', Response: ' . $result);
    }

    return $result;
}

$url = "http://example.harbor.telemetryharbor.com/api/v1/ingest";
$apiKey = "your_api_key";

$data = array(
    "time" => date("c"),
    "ship_id" => "ship1",
    "ship_id" => "sen1",
    "value" => 23.5
);

try {
    $result = sendData($url, $apiKey, $data);
    echo "Data sent successfully. Response: " . $result;
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

?>```

## Best Practices

- Use environment variables to store your API key:

```<?php

$apiKey = getenv('TELEMETRY_HARBOR_API_KEY');
if (!$apiKey) {
    die('TELEMETRY_HARBOR_API_KEY environment variable not set');
}

?>```

- Implement retry logic for failed requests:

```<?php

function sendDataWithRetry($url, $apiKey, $data, $maxRetries = 3) {
    $attempt = 0;
    while ($attempt < $maxRetries) {
        try {
            return sendData($url, $apiKey, $data);
        } catch (Exception $e) {
            $attempt++;
            if ($attempt >= $maxRetries) {
                throw $e;
            }
            echo "Attempt $attempt failed. Retrying in " . (2 ** $attempt) . " seconds...\n";
            sleep(2 ** $attempt);
        }
    }
}

$url = "http://example.harbor.telemetryharbor.com/api/v1/ingest";
$apiKey = "your_api_key";

$data = array(
    "time" => date("c"),
    "ship_id" => "ship1",
    "ship_id" => "sen1",
    "value" => 23.5
);

try {
    $result = sendDataWithRetry($url, $apiKey, $data);
    echo "Data sent successfully. Response: " . $result;
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

?>```

- Use a PHP HTTP client library for more advanced features:

Here's an example using Guzzle, a popular PHP HTTP client:

```<?php

require 'vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

$client = new Client([
    'base_uri' => 'http://example.harbor.telemetryharbor.com',
    'timeout'  => 5.0,
]);

$apiKey = "your_api_key";

$data = [
    "time" => date("c"),
    "ship_id" => "ship1",
    "ship_id" => "sen1",
    "value" => 23.5
];

try {
    $response = $client->request('POST', '/api/v1/ingest', [
        'json' => $data,
        'headers' => [
            'X-API-Key' => $apiKey,
        ]
    ]);

    echo "Data sent successfully. Status code: " . $response->getStatusCode();
} catch (RequestException $e) {
    echo "Error: " . $e->getMessage();
}

?>```

These best practices will help you create more robust and efficient data ingestion scripts for Telemetry Harbor using PHP.