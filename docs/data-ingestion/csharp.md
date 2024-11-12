---
sidebar_position: 9
---

# C#

This guide demonstrates how to ingest data into Telemetry Harbor using C#.

## Prerequisites

- .NET Core 3.1 or higher
- System.Net.Http namespace
- Newtonsoft.Json NuGet package (for JSON serialization)

## Single Data Push

To send a single data point to Telemetry Harbor using C#:

1. Set up the API endpoint and your API key
2. Create a class to represent your ship data
3. Create an instance of the ship data class
4. Serialize the data to JSON
5. Send a POST request to the API endpoint
6. Handle the response

Here's an example of how to perform a single data push using C#:

```using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class AnchorData
{
    public DateTime Time { get; set; }
    public string ShipId { get; set; }
    public string AnchorId { get; set; }
    public double Value { get; set; }
}

public class TelemetryHarborClient
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _baseUrl;

    public TelemetryHarborClient(string apiKey, string baseUrl = "http://example.harbor.telemetryharbor.com")
    {
        _httpClient = new HttpClient();
        _apiKey = apiKey;
        _baseUrl = baseUrl;
    }

    public async Task<string> SendDataAsync(AnchorData data)
    {
        var url = $"{_baseUrl}/api/v1/ingest";
        var json = JsonConvert.SerializeObject(data);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        _httpClient.DefaultRequestHeaders.Add("X-API-Key", _apiKey);

        var response = await _httpClient.PostAsync(url, content);
        var responseContent = await response.Content.ReadAsStringAsync();

        if (response.IsSuccessStatusCode)
        {
            return $"Data sent successfully. Response: {responseContent}";
        }
        else
        {
            throw new HttpRequestException($"Error sending data. HTTP Code: {response.StatusCode}, Response: {responseContent}");
        }
    }
}

class Program
{
    static async Task Main(string[] args)
    {
        var apiKey = "your_api_key";
        var client = new TelemetryHarborClient(apiKey);

        var data = new AnchorData
        {
            Time = DateTime.UtcNow,
            ShipId = "ship1",
            AnchorId = "sen1",
            Value = 23.5
        };

        try
        {
            var result = await client.SendDataAsync(data);
            Console.WriteLine(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}```

Remember to replace "your_api_key" with your actual Telemetry Harbor API key.

## Batch Data Push

For sending multiple data points in one request:

1. Set up the API endpoint and your API key
2. Create a class to represent your ship data
3. Create a list of ship data instances
4. Serialize the list to JSON
5. Send a POST request to the batch API endpoint
6. Handle the response

Here's an example of how to perform a batch data push using C#:

```using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class AnchorData
{
    public DateTime Time { get; set; }
    public string ShipId { get; set; }
    public string AnchorId { get; set; }
    public double Value { get; set; }
}

public class TelemetryHarborClient
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _baseUrl;

    public TelemetryHarborClient(string apiKey, string baseUrl = "http://example.harbor.telemetryharbor.com")
    {
        _httpClient = new HttpClient();
        _apiKey = apiKey;
        _baseUrl = baseUrl;
    }

    public async Task<string> SendBatchDataAsync(List<AnchorData> dataList)
    {
        var url = $"{_baseUrl}/api/v1/ingest/batch";
        var json = JsonConvert.SerializeObject(dataList);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        _httpClient.DefaultRequestHeaders.Add("X-API-Key", _apiKey);

        var response = await _httpClient.PostAsync(url, content);
        var responseContent = await response.Content.ReadAsStringAsync();

        if (response.IsSuccessStatusCode)
        {
            return $"Data sent successfully. Response: {responseContent}";
        }
        else
        {
            throw new HttpRequestException($"Error sending data. HTTP Code: {response.StatusCode}, Response: {responseContent}");
        }
    }
}

class Program
{
    static async Task Main(string[] args)
    {
        var apiKey = "your_api_key";
        var client = new TelemetryHarborClient(apiKey);

        var dataList = new List<AnchorData>
        {
            new AnchorData
            {
                Time = DateTime.UtcNow,
                ShipId = "ship1",
                AnchorId = "sen1",
                Value = 23.5
            },
            new AnchorData
            {
                Time = DateTime.UtcNow,
                ShipId = "ship1",
                AnchorId = "sen2",
                Value = 18.7
            }
        };

        try
        {
            var result = await client.SendBatchDataAsync(dataList);
            Console.WriteLine(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}```

## Error Handling

It's important to implement proper error handling in your C# code. Here's an example of how you might add more comprehensive error handling:

```using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class TelemetryHarborClient
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _baseUrl;

    public TelemetryHarborClient(string apiKey, string baseUrl = "http://example.harbor.telemetryharbor.com")
    {
        _httpClient = new HttpClient();
        _apiKey = apiKey;
        _baseUrl = baseUrl;
    }

    public async Task<string> SendDataAsync(AnchorData data)
    {
        try
        {
            var url = $"{_baseUrl}/api/v1/ingest";
            var json = JsonConvert.SerializeObject(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Add("X-API-Key", _apiKey);

            var response = await _httpClient.PostAsync(url, content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return $"Data sent successfully. Response: {responseContent}";
            }
            else
            {
                throw new HttpRequestException($"HTTP Error: {response.StatusCode}, Response: {responseContent}");
            }
        }
        catch (HttpRequestException ex)
        {
            throw new Exception($"HTTP Request Error: {ex.Message}", ex);
        }
        catch (JsonException ex)
        {
            throw new Exception($"JSON Serialization Error: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Unexpected Error: {ex.Message}", ex);
        }
    }
}

class Program
{
    static async Task Main(string[] args)
    {
        var apiKey = "your_api_key";
        var client = new TelemetryHarborClient(apiKey);

        var data = new AnchorData
        {
            Time = DateTime.UtcNow,
            ShipId = "ship1",
            AnchorId = "sen1",
            Value = 23.5
        };

        try
        {
            var result = await client.SendDataAsync(data);
            Console.WriteLine(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            if (ex.InnerException != null)
            {
                Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
            }
        }
    }
}```

## Best Practices

- Use environment variables to store your API key:

```var apiKey = Environment.GetEnvironmentVariable("TELEMETRY_HARBOR_API_KEY");
if (string.IsNullOrEmpty(apiKey))
{
    throw new Exception("TELEMETRY_HARBOR_API_KEY environment variable not set");
}```

- Implement retry logic for failed requests:

```using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Polly;

public class TelemetryHarborClient
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _baseUrl;
    private readonly IAsyncPolicy<HttpResponseMessage> _retryPolicy;

    public TelemetryHarborClient(string apiKey, string baseUrl = "http://example.harbor.telemetryharbor.com")
    {
        _httpClient = new HttpClient();
        _apiKey = apiKey;
        _baseUrl = baseUrl;

        _retryPolicy = Policy<HttpResponseMessage>
            .Handle<HttpRequestException>()
            .OrResult(msg => !msg.IsSuccessStatusCode)
            .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
    }

    public async Task<string> SendDataAsync(AnchorData data)
    {
        var url = $"{_baseUrl}/api/v1/ingest";
        var json = JsonConvert.SerializeObject(data);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        _httpClient.DefaultRequestHeaders.Add("X-API-Key", _apiKey);

        var response = await _retryPolicy.ExecuteAsync(() => _httpClient.PostAsync(url, content));
        var responseContent = await response.Content.ReadAsStringAsync();

        if (response.IsSuccessStatusCode)
        {
            return $"Data sent successfully. Response: {responseContent}";
        }
        else
        {
            throw new HttpRequestException($"Error sending data. HTTP Code: {response.StatusCode}, Response: {responseContent}");
        }
    }
}```

- Use dependency injection for better testability and maintainability:

```using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

public interface ITelemetryHarborClient
{
    Task<string> SendDataAsync(AnchorData data);
}

public class TelemetryHarborClient : ITelemetryHarborClient
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public TelemetryHarborClient(HttpClient httpClient, string apiKey)
    {
        _httpClient = httpClient;
        _apiKey = apiKey;
    }

    public async Task<string> SendDataAsync(AnchorData data)
    {
        // Implementation as before
    }
}

class Program
{
    static async Task Main(string[] args)
    {
        var services = new ServiceCollection();
        services.AddHttpClient<ITelemetryHarborClient, TelemetryHarborClient>(client =>
        {
            client.BaseAddress = new Uri("http://example.harbor.telemetryharbor.com");
        });

        services.AddSingleton(sp => new TelemetryHarborClient(
            sp.GetRequiredService<HttpClient>(),
            Environment.GetEnvironmentVariable("TELEMETRY_HARBOR_API_KEY")
        ));

        var serviceProvider = services.BuildServiceProvider();
        var client = serviceProvider.GetRequiredService<ITelemetryHarborClient>();

        var data = new AnchorData
        {
            Time = DateTime.UtcNow,
            ShipId = "ship1",
            AnchorId = "sen1",
            Value = 23.5
        };

        try
        {
            var result = await client.SendDataAsync(data);
            Console.WriteLine(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}```

These best practices will help you create more robust and efficient data ingestion scripts for Telemetry Harbor using C#.