---
sidebar_position: 8
---

# Ruby

This guide demonstrates how to ingest data into Telemetry Harbor using Ruby.

## Prerequisites

- Ruby 2.5 or higher
- net/http library (included in Ruby standard library)
- json library (included in Ruby standard library)

## Single Data Push

To send a single data point to Telemetry Harbor using Ruby:

1. Require the necessary libraries
2. Set up the API endpoint and your API key
3. Create a hash with your sensor data
4. Convert the data to JSON
5. Send a POST request to the API endpoint
6. Handle the response

Here's an example of how to perform a single data push using Ruby:

```require 'net/http'
require 'uri'
require 'json'
require 'time'

url = URI.parse('http://example.hive.telemetryhive.com/api/v1/ingest')
api_key = 'your_api_key'

data = {
  time: Time.now.utc.iso8601,
  ship_id: 'ship1',
  sensor_id: 'sen1',
  value: 23.5
}

http = Net::HTTP.new(url.host, url.port)
request = Net::HTTP::Post.new(url.path)
request['Content-Type'] = 'application/json'
request['X-API-Key'] = api_key
request.body = data.to_json

response = http.request(request)

if response.code.to_i >= 200 && response.code.to_i < 300
  puts "Data sent successfully. Response: #{response.body}"
else
  puts "Error sending data. HTTP Code: #{response.code}, Response: #{response.body}"
end```

Remember to replace "your_api_key" with your actual Telemetry Harbor API key.

## Batch Data Push

For sending multiple data points in one request:

1. Require the necessary libraries
2. Set up the API endpoint and your API key
3. Create an array of hashes, each containing sensor data
4. Convert the data to JSON
5. Send a POST request to the batch API endpoint
6. Handle the response

Here's an example of how to perform a batch data push using Ruby:

```require 'net/http'
require 'uri'
require 'json'
require 'time'

url = URI.parse('http://example.hive.telemetryhive.com/api/v1/ingest/batch')
api_key = 'your_api_key'

data = [
  {
    time: Time.now.utc.iso8601,
    ship_id: 'ship1',
    sensor_id: 'sen1',
    value: 23.5
  },
  {
    time: Time.now.utc.iso8601,
    ship_id: 'ship1',
    sensor_id: 'sen2',
    value: 18.7
  }
]

http = Net::HTTP.new(url.host, url.port)
request = Net::HTTP::Post.new(url.path)
request['Content-Type'] = 'application/json'
request['X-API-Key'] = api_key
request.body = data.to_json

response = http.request(request)

if response.code.to_i >= 200 && response.code.to_i < 300
  puts "Data sent successfully. Response: #{response.body}"
else
  puts "Error sending data. HTTP Code: #{response.code}, Response: #{response.body}"
end```

## Error Handling

It's important to implement proper error handling in your Ruby code. Here's an example of how you might add more comprehensive error handling:

```require 'net/http'
require 'uri'
require 'json'
require 'time'

def send_data(url, api_key, data)
  uri = URI.parse(url)
  http = Net::HTTP.new(uri.host, uri.port)
  request = Net::HTTP::Post.new(uri.path)
  request['Content-Type'] = 'application/json'
  request['X-API-Key'] = api_key
  request.body = data.to_json

  begin
    response = http.request(request)
    if response.code.to_i >= 200 && response.code.to_i < 300
      return response.body
    else
      raise "HTTP Error: #{response.code}, Response: #{response.body}"
    end
  rescue SocketError => e
    raise "Network error: #{e.message}"
  rescue Timeout::Error
    raise "Request timed out"
  rescue => e
    raise "Unexpected error: #{e.message}"
  end
end

url = 'http://example.hive.telemetryhive.com/api/v1/ingest'
api_key = 'your_api_key'

data = {
  time: Time.now.utc.iso8601,
  ship_id: 'ship1',
  sensor_id: 'sen1',
  value: 23.5
}

begin
  result = send_data(url, api_key, data)
  puts "Data sent successfully. Response: #{result}"
rescue => e
  puts "Error: #{e.message}"
end```

## Best Practices

- Use environment variables to store your API key:

```api_key = ENV['TELEMETRY_HARBOR_API_KEY']
raise 'TELEMETRY_HARBOR_API_KEY environment variable not set' if api_key.nil?
```

- Implement retry logic for failed requests:

```require 'net/http'
require 'uri'
require 'json'
require 'time'

def send_data_with_retry(url, api_key, data, max_retries = 3)
  attempt = 0
  while attempt < max_retries
    begin
      return send_data(url, api_key, data)
    rescue => e
      attempt += 1
      if attempt >= max_retries
        raise e
      else
        puts "Attempt #{attempt} failed. Retrying in #{2**attempt} seconds..."
        sleep(2**attempt)
      end
    end
  end
end

def send_data(url, api_key, data)
  uri = URI.parse(url)
  http = Net::HTTP.new(uri.host, uri.port)
  request = Net::HTTP::Post.new(uri.path)
  request['Content-Type'] = 'application/json'
  request['X-API-Key'] = api_key
  request.body = data.to_json

  response = http.request(request)
  if response.code.to_i >= 200 && response.code.to_i < 300
    return response.body
  else
    raise "HTTP Error: #{response.code}, Response: #{response.body}"
  end
end

url = 'http://example.hive.telemetryhive.com/api/v1/ingest'
api_key = 'your_api_key'

data = {
  time: Time.now.utc.iso8601,
  ship_id: 'ship1',
  sensor_id: 'sen1',
  value: 23.5
}

begin
  result = send_data_with_retry(url, api_key, data)
  puts "Data sent successfully. Response: #{result}"
rescue => e
  puts "Error: #{e.message}"
end```

- Use a Ruby HTTP client library for more advanced features:

Here's an example using the `httparty` gem, which provides a simpler interface for making HTTP requests:

```require 'httparty'
require 'time'

class TelemetryHarborClient
  include HTTParty
  base_uri 'http://example.hive.telemetryhive.com'

  def initialize(api_key)
    @api_key = api_key
  end

  def send_data(data)
    self.class.post('/api/v1/ingest',
      headers: {
        'Content-Type' => 'application/json',
        'X-API-Key' => @api_key
      },
      body: data.to_json
    )
  end
end

api_key = 'your_api_key'
client = TelemetryHarborClient.new(api_key)

data = {
  time: Time.now.utc.iso8601,
  ship_id: 'ship1',
  sensor_id: 'sen1',
  value: 23.5
}

response = client.send_data(data)

if response.success?
  puts "Data sent successfully. Response: #{response.body}"
else
  puts "Error sending data. HTTP Code: #{response.code}, Response: #{response.body}"
end
```
These best practices will help you create more robust and efficient data ingestion scripts for Telemetry Harbor using Ruby.