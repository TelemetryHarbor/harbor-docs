---
sidebar_position: 3
title: SDKs Overview
description: An introduction to Telemetry Harbor's Software Development Kits and tools.
---

# SDKs & Tools Overview

Telemetry Harbor provides a suite of Software Development Kits (SDKs) and tools to simplify the process of integrating your applications and devices with our platform. Our SDKs abstract away the complexities of API interactions, allowing you to focus on collecting and sending your telemetry data efficiently.

## Why Use an SDK?

Using an SDK offers several advantages over direct API calls:

-   **Simplified Integration**: Abstract away the complexities of HTTP requests, authentication, and data formatting.
-   **Type Safety**: Many SDKs provide type definitions, reducing errors and improving code readability.
-   **Error Handling**: Built-in mechanisms for handling API responses, retries, and error codes.
-   **Faster Development**: Accelerate your development cycle with ready-to-use functions and examples.
-   **Language Idiomatic**: SDKs are designed to feel natural within the programming language they support.


## Available SDKs

Telemetry Harbor currently offers official SDKs for the following popular programming languages:

| SDK           | Description                                                              |
| :------------ | :----------------------------------------------------------------------- |
| **Python SDK** | Ideal for backend applications, data processing scripts, and IoT devices running Python. |
| **JavaScript SDK** | Perfect for web applications, Node.js services, and browser-based data collection. |
| **C++ SDK**   | For high-performance embedded systems and resource-constrained devices. |


## How SDKs Work

Our SDKs typically provide:

1.  **Client Initialization**: Functions to set up your connection to Telemetry Harbor using your API endpoint and key.
2.  **Data Model Classes**: Convenient classes to structure your telemetry data (e.g., `GeneralReading` for the General Harbor Type).
3.  **Ingestion Methods**: Functions to send single data points or batch data efficiently.
4.  **Utility Functions**: Helpers for common tasks like timestamp formatting or error parsing.

## Getting Started with an SDK

1.  **Install the SDK**: Use your language's package manager (e.g., `pip` for Python, `npm` for JavaScript).
2.  **Import the Client**: Import the necessary classes into your project.
3.  **Initialize the Client**: Provide your Telemetry Harbor API endpoint and API key.
4.  **Create Data**: Instantiate data model objects with your `time`, `ship_id`, `cargo_id`, and `value`.
5.  **Send Data**: Call the appropriate method to send your data to Telemetry Harbor.

For detailed instructions and code examples, refer to the documentation for each specific SDK.
