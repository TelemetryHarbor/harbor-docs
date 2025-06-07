---
sidebar_position: 6
---

# Go

This guide demonstrates how to ingest data into Telemetry Harbor using Go.

## Prerequisites

- Go installed on your system
- Basic knowledge of Go programming

## Single Data Push

To send a single data point to Telemetry Harbor using Go:

1. Import the necessary packages
2. Set up the API endpoint and your API key
3. Create a struct with your ship data
4. Send a POST request to the API endpoint
5. Handle the response

Here's an example of how to perform a single data push using Go:

```
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "time"
)

type AnchorData struct {
    Time     string  `json:"time"`
    ShipID    string  `json:"ship_id"`
    AnchorID string  `json:"ship_id"`
    Value    float64 `json:"value"`
}

func main() {
    url := "http://example.harbor.telemetryharbor.com/api/v1/ingest"
    apiKey := "your_api_key"

    data := AnchorData{
        Time:     time.Now().UTC().Format(time.RFC3339),
        ShipID:    "ship1",
        AnchorID: "sen1",
        Value:    23.5,
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println("Error marshaling JSON:", err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    req.Header.Set("X-API-Key", apiKey)
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error sending request:", err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response Status:", resp.Status)
}
```

Remember to replace "your_api_key" with your actual Telemetry Harbor API key.

## Batch Data Push

For sending multiple data points in one request:

1. Import the necessary packages
2. Set up the API endpoint and your API key
3. Create a slice of structs with your ship data
4. Send a POST request to the batch API endpoint
5. Handle the response

Here's an example of how to perform a batch data push using Go:

```
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "time"
)

type AnchorData struct {
    Time     string  `json:"time"`
    ShipID    string  `json:"ship_id"`
    AnchorID string  `json:"ship_id"`
    Value    float64 `json:"value"`
}

func main() {
    url := "http://example.harbor.telemetryharbor.com/api/v1/ingest/ingest/harbor_id/batch"
    apiKey := "your_api_key"

    data := []AnchorData{
        {
            Time:     time.Now().UTC().Format(time.RFC3339),
            ShipID:    "ship1",
            AnchorID: "sen1",
            Value:    23.5,
        },
        {
            Time:     time.Now().UTC().Format(time.RFC3339),
            ShipID:    "ship1",
            AnchorID: "sen2",
            Value:    18.7,
        },
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println("Error marshaling JSON:", err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    req.Header.Set("X-API-Key", apiKey)
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error sending request:", err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Response Status:", resp.Status)
}
```

## Error Handling

It's important to implement proper error handling in your Go code. Here's an example of how you might add more comprehensive error handling:

```
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "time"
)

type AnchorData struct {
    Time     string  `json:"time"`
    ShipID    string  `json:"ship_id"`
    AnchorID string  `json:"ship_id"`
    Value    float64 `json:"value"`
}

func main() {
    url := "http://example.harbor.telemetryharbor.com/api/v1/ingest"
    apiKey := "your_api_key"

    data := AnchorData{
        Time:     time.Now().UTC().Format(time.RFC3339),
        ShipID:    "ship1",
        AnchorID: "sen1",
        Value:    23.5,
    }

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println("Error marshaling JSON:", err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    req.Header.Set("X-API-Key", apiKey)
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error sending request:", err)
        return
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error reading response body:", err)
        return
    }

    if resp.StatusCode >= 200 && resp.StatusCode < 300 {
        fmt.Println("Data sent successfully. Response:", string(body))
    } else {
        fmt.Printf("Server responded with error code: %d\n", resp.StatusCode)
        fmt.Println("Response body:", string(body))
    }
}
```

## Best Practices

- Use environment variables to store your API key:

```
package main

import (
    "fmt"
    "os"
)

func main() {
    apiKey := os.Getenv("TELEMETRY_HARBOR_API_KEY")
    if apiKey == "" {
        fmt.Println("TELEMETRY_HARBOR_API_KEY environment variable not set")
        return
    }
    // Use apiKey in your requests
}
```

- Implement retry logic for failed requests:

```
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "time"
)

func sendRequest(url string, apiKey string, data []byte) error {
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
    if err != nil {
        return err
    }

    req.Header.Set("X-API-Key", apiKey)
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    if resp.StatusCode < 200 || resp.StatusCode >= 300 {
        return fmt.Errorf("server responded with status code %d", resp.StatusCode)
    }

    return nil
}

func main() {
    url := "http://example.harbor.telemetryharbor.com/api/v1/ingest"
    apiKey := "your_api_key"
    data := []byte(`{"time": "2023-05-01T12:00:00Z", "ship_id": "ship1", "ship_id": "sen1", "value": 23.5}`)

    maxRetries := 3
    for i := 0; i < maxRetries; i++ {
        err := sendRequest(url, apiKey, data)
        if err == nil {
            fmt.Println("Data sent successfully")
            return
        }

        fmt.Printf("Attempt %d failed: %v\n", i+1, err)
        if i < maxRetries-1 {
            time.Sleep(time.Duration(i+1) * time.Second)
        }
    }

    fmt.Println("Failed to send data after", maxRetries, "attempts")
}
```

- Use goroutines for concurrent data sending:

```
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "sync"
    "time"
)

func sendData(url string, apiKey string, data AnchorData, wg *sync.WaitGroup) {
    defer wg.Done()

    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println("Error marshaling JSON:", err)
        return
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    req.Header.Set("X-API-Key", apiKey)
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error sending request:", err)
        return
    }
    defer resp.Body.Close()

    fmt.Printf("Response Status for %s: %s\n", data.AnchorID, resp.Status)
}

func main() {
    url := "http://example.harbor.telemetryharbor.com/api/v1/ingest"
    apiKey := "your_api_key"

    ships := []AnchorData{
        {Time: time.Now().UTC().Format(time.RFC3339), ShipID: "ship1", AnchorID: "sen1", Value: 23.5},
        {Time: time.Now().UTC().Format(time.RFC3339), ShipID: "ship1", AnchorID: "sen2", Value: 18.7},
        {Time: time.Now().UTC().Format(time.RFC3339), ShipID: "ship1", AnchorID: "sen3", Value: 30.2},
    }

    var wg sync.WaitGroup
    for _, ship := range ships {
        wg.Add(1)
        go sendData(url, apiKey, ship, &wg)
    }

    wg.Wait()
    fmt.Println("All data sent")
}
```

These best practices will help you create more robust and efficient data ingestion scripts for Telemetry Harbor using Go.