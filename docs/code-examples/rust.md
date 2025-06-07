---
sidebar_position: 10
---

# Rust

This guide demonstrates how to ingest data into Telemetry Harbor using Rust.

## Prerequisites

- Rust 1.50 or higher
- reqwest crate (for HTTP requests)
- serde and serde_json crates (for JSON serialization)
- tokio runtime (for async operations)

## Single Data Push

To send a single data point to Telemetry Harbor using Rust:

1. Set up the project and add dependencies
2. Create a struct to represent your ship data
3. Implement the API client
4. Send a POST request to the API endpoint
5. Handle the response

Here's an example of how to perform a single data push using Rust:

First, add the following dependencies to your `Cargo.toml`:

```
[dependencies]
reqwest = { version = "0.11", features = ["json"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1.0", features = ["full"] }
chrono = "0.4"
```

Now, here's the Rust code for sending a single data point:

```
use chrono::{DateTime, Utc};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::error::Error;

#[derive(Debug, Serialize, Deserialize)]
struct AnchorData {
    time: DateTime<Utc>,
    ship_id: String,
    ship_id: String,
    value: f64,
}

struct TelemetryHarborClient {
    client: Client,
    api_key: String,
    base_url: String,
}

impl TelemetryHarborClient {
    fn new(api_key: String, base_url: String) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url,
        }
    }

    async fn send_data(&self, data: &AnchorData) -> Result<String, Box<dyn Error>> {
        let url = format!("{}/api/v1/ingest", self.base_url);
        let response = self
            .client
            .post(&url)
            .header("X-API-Key", &self.api_key)
            .json(data)
            .send()
            .await?;

        if response.status().is_success() {
            Ok(response.text().await?)
        } else {
            Err(format!(
                "Error sending data. HTTP Code: {}, Response: {}",
                response.status(),
                response.text().await?
            )
            .into())
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let api_key = "your_api_key".to_string();
    let base_url = "http://example.harbor.telemetryharbor.com".to_string();
    let client = TelemetryHarborClient::new(api_key, base_url);

    let data = AnchorData {
        time: Utc::now(),
        ship_id: "ship1".to_string(),
        ship_id: "sen1".to_string(),
        value: 23.5,
    };

    match client.send_data(&data).await {
        Ok(response) => println!("Data sent successfully. Response: {}", response),
        Err(e) => eprintln!("Error: {}", e),
    }

    Ok(())
}
```

Remember to replace "your_api_key" with your actual Telemetry Harbor API key.

## Batch Data Push

For sending multiple data points in one request:

1. Create a vector of ship data instances
2. Implement a batch send method in the API client
3. Send a POST request to the batch API endpoint
4. Handle the response

Here's an example of how to perform a batch data push using Rust:

```
use chrono::{DateTime, Utc};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::error::Error;

#[derive(Debug, Serialize, Deserialize)]
struct AnchorData {
    time: DateTime<Utc>,
    ship_id: String,
    ship_id: String,
    value: f64,
}

struct TelemetryHarborClient {
    client: Client,
    api_key: String,
    base_url: String,
}

impl TelemetryHarborClient {
    fn new(api_key: String, base_url: String) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url,
        }
    }

    async fn send_batch_data(&self, data: &[AnchorData]) -> Result<String, Box<dyn Error>> {
        let url = format!("{}/api/v1/ingest/ingest/harbor_id/batch", self.base_url);
        let response = self
            .client
            .post(&url)
            .header("X-API-Key", &self.api_key)
            .json(data)
            .send()
            .await?;

        if response.status().is_success() {
            Ok(response.text().await?)
        } else {
            Err(format!(
                "Error sending data. HTTP Code: {}, Response: {}",
                response.status(),
                response.text().await?
            )
            .into())
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let api_key = "your_api_key".to_string();
    let base_url = "http://example.harbor.telemetryharbor.com".to_string();
    let client = TelemetryHarborClient::new(api_key, base_url);

    let data = vec![
        AnchorData {
            time: Utc::now(),
            ship_id: "ship1".to_string(),
            ship_id: "sen1".to_string(),
            value: 23.5,
        },
        AnchorData {
            time: Utc::now(),
            ship_id: "ship1".to_string(),
            ship_id: "sen2".to_string(),
            value: 18.7,
        },
    ];

    match client.send_batch_data(&data).await {
        Ok(response) => println!("Data sent successfully. Response: {}", response),
        Err(e) => eprintln!("Error: {}", e),
    }

    Ok(())
}
```

## Error Handling

It's important to implement proper error handling in your Rust code. Here's an example of how you might add more comprehensive error handling:

```
use chrono::{DateTime, Utc};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::error::Error;
use thiserror::Error;

#[derive(Debug, Serialize, Deserialize)]
struct AnchorData {
    time: DateTime<Utc>,
    ship_id: String,
    ship_id: String,
    value: f64,
}

#[derive(Error, Debug)]
enum TelemetryError {
    #[error("HTTP request failed: {0}")]
    RequestFailed(#[from] reqwest::Error),
    #[error("Server error: {status}, {message}")]
    ServerError { status: u16, message: String },
}

struct TelemetryHarborClient {
    client: Client,
    api_key: String,
    base_url: String,
}

impl TelemetryHarborClient {
    fn new(api_key: String, base_url: String) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url,
        }
    }

    async fn send_data(&self, data: &AnchorData) -> Result<String, TelemetryError> {
        let url = format!("{}/api/v1/ingest", self.base_url);
        let response = self
            .client
            .post(&url)
            .header("X-API-Key", &self.api_key)
            .json(data)
            .send()
            .await?;

        if response.status().is_success() {
            Ok(response.text().await?)
        } else {
            Err(TelemetryError::ServerError {
                status: response.status().as_u16(),
                message: response.text().await?,
            })
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let api_key = "your_api_key".to_string();
    let base_url = "http://example.harbor.telemetryharbor.com".to_string();
    let client = TelemetryHarborClient::new(api_key, base_url);

    let data = AnchorData {
        time: Utc::now(),
        ship_id: "ship1".to_string(),
        ship_id: "sen1".to_string(),
        value: 23.5,
    };

    match client.send_data(&data).await {
        Ok(response) => println!("Data sent successfully. Response: {}", response),
        Err(e) => match e {
            TelemetryError::RequestFailed(err) => eprintln!("Request failed: {}", err),
            TelemetryError::ServerError { status, message } => {
                eprintln!("Server error ({}): {}", status, message)
            }
        },
    }

    Ok(())
}
```
## Best Practices

- Use environment variables to store your API key:

```
use std::env;

fn main() -> Result<(), Box<dyn Error>> {
    let api_key = env::var("TELEMETRY_HARBOR_API_KEY")
        .expect("TELEMETRY_HARBOR_API_KEY environment variable not set");
    // ... rest of the code
}
```

- Implement retry logic for failed requests:

```
use backoff::ExponentialBackoff;
use backoff::future::retry;

impl TelemetryHarborClient {
    async fn send_data_with_retry(&self, data: &AnchorData) -> Result<String, TelemetryError> {
        let operation = || async {
            let result = self.send_data(data).await;
            match result {
                Ok(response) => Ok(response),
                Err(TelemetryError::ServerError { status, .. }) if status >= 500 => {
                    Err(backoff::Error::transient(TelemetryError::ServerError { status, message: "Server error".to_string() }))
                }
                Err(e) => Err(backoff::Error::permanent(e)),
            }
        };

        retry(ExponentialBackoff::default(), operation).await
    }
}
```

- Use async streams for efficient batch processing:

```
use futures::stream::{self, StreamExt};

impl TelemetryHarborClient {
    async fn send_batch_data_stream(&self, data: Vec<AnchorData>) -> Result<(), TelemetryError> {
        let results = stream::iter(data)
            .map(|ship_data| self.send_data(&ship_data))
            .buffer_unordered(10) // Process up to 10 requests concurrently
            .collect::<Vec<_>>()
            .await;

        for result in results {
            result?;
        }

        Ok(())
    }
}
```

These best practices will help you create more robust and efficient data ingestion scripts for Telemetry Harbor using Rust.