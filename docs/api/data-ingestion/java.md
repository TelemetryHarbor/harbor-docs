---
sidebar_position: 4
---

# Java

This guide demonstrates how to ingest data into Telemetry Harbor using Java.

## Prerequisites

- Java Development Kit (JDK) 8 or higher
- java.net.http package (available in JDK 11+) or an HTTP client library like Apache HttpClient

## Single Data Push

To send a single data point to Telemetry Harbor:

1. Import the necessary classes
2. Set up the API endpoint and your API key
3. Create a JSON string with your sensor data
4. Send a POST request to the API endpoint
5. Print the response

Here's an example of how to perform a single data push using Java 11+:
```
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Instant;

public class TelemetryClient {
    public static void main(String[] args) throws Exception {
        String url = "http://example.hive.telemetryhive.com/api/v1/ingest";
        String apiKey = "your_api_key";
        String jsonData = String.format(
            "{\"time\":\"%s\", \"bee_id\":\"bee1\", \"sensor_id\":\"sen1\", \"value\":23.5}",
            Instant.now().toString()
        );

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("X-API-Key", apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonData))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response Code: " + response.statusCode());
        System.out.println("Response Body: " + response.body());
    }
}
```
Remember to replace "your_api_key" with your actual Telemetry Harbor API key.

## Batch Data Push

For sending multiple data points in one request:

1. Import the necessary classes
2. Set up the API endpoint and your API key
3. Create a JSON array string with multiple sensor data points
4. Send a POST request to the batch API endpoint
5. Print the response

Here's an example of how to perform a batch data push:
```
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Instant;

public class TelemetryBatchClient {
    public static void main(String[] args) throws Exception {
        String url = "http://example.hive.telemetryhive.com/api/v1/ingest/batch";
        String apiKey = "your_api_key";
        String jsonData = String.format(
            "[{\"time\":\"%s\", \"bee_id\":\"bee1\", \"sensor_id\":\"sen1\", \"value\":23.5}," +
            "{\"time\":\"%s\", \"bee_id\":\"bee1\", \"sensor_id\":\"sen2\", \"value\":18.7}]",
            Instant.now().toString(),
            Instant.now().toString()
        );

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("X-API-Key", apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonData))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response Code: " + response.statusCode());
        System.out.println("Response Body: " + response.body());
    }
}```

## Error Handling

It's important to implement proper error handling in your code. Here's an example of how you might add error handling:
```
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Instant;
import java.io.IOException;

public class TelemetryClientWithErrorHandling {
    public static void main(String[] args) {
        String url = "http://example.hive.telemetryhive.com/api/v1/ingest";
        String apiKey = "your_api_key";
        String jsonData = String.format(
            "{\"time\":\"%s\", \"bee_id\":\"bee1\", \"sensor_id\":\"sen1\", \"value\":23.5}",
            Instant.now().toString()
        );

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("X-API-Key", apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonData))
            .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                System.out.println("Data sent successfully. Response: " + response.body());
            } else {
                System.out.println("Server responded with error code: " + response.statusCode());
                System.out.println("Response body: " + response.body());
            }
        } catch (IOException e) {
            System.out.println("An I/O error occurred: " + e.getMessage());
        } catch (InterruptedException e) {
            System.out.println("The operation was interrupted: " + e.getMessage());
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            System.out.println("An unexpected error occurred: " + e.getMessage());
        }
    }
}```

## Best Practices

- Use environment variables to store your API key:

```String apiKey = System.getenv("TELEMETRY_HARBOR_API_KEY");
```
- Implement retry logic for failed requests:

```import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Duration;

public class TelemetryClientWithRetry {
    public static void main(String[] args) throws Exception {
        String url = "http://example.hive.telemetryhive.com/api/v1/ingest";
        String apiKey = "your_api_key";
        String jsonData = "{\"time\":\"" + Instant.now() + "\", \"bee_id\":\"bee1\", \"sensor_id\":\"sen1\", \"value\":23.5}";

        HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("X-API-Key", apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonData))
            .build();

        int maxRetries = 3;
        for (int i = 0; i < maxRetries; i++) {
            try {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                if (response.statusCode() >= 200 && response.statusCode() < 300) {
                    System.out.println("Data sent successfully. Response: " + response.body());
                    break;
                } else {
                    System.out.println("Attempt " + (i + 1) + " failed. Status code: " + response.statusCode());
                    if (i == maxRetries - 1) {
                        System.out.println("Max retries reached. Last response: " + response.body());
                    } else {
                        Thread.sleep(1000 * (i + 1)); // Exponential backoff
                    }
                }
            } catch (Exception e) {
                System.out.println("Attempt " + (i + 1) + " failed. Error: " + e.getMessage());
                if (i == maxRetries - 1) {
                    System.out.println("Max retries reached. Last error: " + e.getMessage());
                } else {
                    Thread.sleep(1000 * (i + 1)); // Exponential backoff
                }
            }
        }
    }
}```

- Consider using a JSON library like Jackson or Gson for more robust JSON handling:

```import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

ObjectMapper mapper = new ObjectMapper();
Map<String, Object> data = new HashMap<>();
data.put("time", Instant.now().toString());
data.put("bee_id", "bee1");
data.put("sensor_id", "sen1");
data.put("value", 23.5);

String jsonData = mapper.writeValueAsString(data);
```
These best practices will help you create more robust and efficient data ingestion scripts for Telemetry Harbor using Java.