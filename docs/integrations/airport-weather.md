---
sidebar_position: 5
title: Airport Weather Monitoring
description: Collect and visualize real-time airport weather data from OpenWeatherMap.
---

# Airport Weather Monitoring

This guide explains how to set up a Linux agent to collect real-time weather data for specified airports from OpenWeatherMap and send it to Harbor Scale. This allows you to monitor weather conditions globally, analyze trends, and integrate weather data into your operational dashboards.

**_Repo Link:_** https://github.com/harborscale/harbor-airport-weather


## Prerequisites

Before starting, ensure you have:

-   A **Linux** system with **root/sudo** access.
-   **curl** installed for API communication.
-   A working internet connection to fetch weather data and send to Harbor Scale.
-   **OpenWeatherMap API key** (free tier available at [https://openweathermap.org/api](https://openweathermap.org/api)).
-   A **Harbor Scale account** (free tier available).
-   Basic knowledge of Linux terminal commands.

## How it Works

The airport weather agent is a bash script that fetches current weather data and air pollution data from the OpenWeatherMap API for a list of configured airports. It then formats this data into the Harbor Scale [General Harbor Data Type Model](../introduction/concepts.md#general-harbor-data-type-model) and sends it in batches to your Harbor Scale ingestion endpoint at a configurable interval. The agent runs as a `systemd` service for continuous operation.


## Available Metrics

The enhanced airport weather agent collects the following metrics for each airport:

| Metric               | Description              | Units   |
| :------------------- | :----------------------- | :------ |
| Temperature_Fahrenheit | Current temperature      | °F      |
| Feels_Like_F         | Apparent temperature     | °F      |
| Humidity_Percent     | Relative humidity        | %       |
| Pressure_hPa         | Atmospheric pressure     | hPa     |
| Wind_Speed_MPH       | Wind speed               | mph     |
| Wind_Gust_MPH        | Wind gust speed          | mph     |
| Wind_Direction_Degrees | Wind direction           | degrees |
| UV_Index             | UV radiation level       | index   |
| Visibility_Meters    | Atmospheric visibility   | meters  |
| Cloud_Cover_Percent  | Cloud coverage           | %       |
| PM2_5_ugm3           | PM2.5 particles          | μg/m³   |
| PM10_ugm3            | PM10 particles           | μg/m³   |

## Setup

### 1. Create a Harbor Scale Account

1.  **Sign up** at [Harbor Scale](https://harborscale.com/)
2.  **Verify** your email and log in
3.  **Create a Harbor**:
    -   Click **Create Harbor** on your dashboard
    -   Choose a **name** and select **General** as the type
    -   Select the **Free** plan (or upgrade for more data capacity)
    -   Click **Create**
4.  **Retrieve your credentials**:
    -   After creation, go to **View Details**
    -   Note down:
        -   \`API Batch Endpoint\`
        -   \`API Key\`
        -   \`Grafana Endpoint\`
        -   \`Grafana Username\`
        -   \`Grafana Password\`

### 2. Get OpenWeatherMap API Key

1.  Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2.  Subscribe to the **Free** plan (1,000 calls/day)
3.  Copy your **API Key** from the dashboard.

### 3. Install the Airport Weather Agent

1.  Download the installation script:
    ```bash
    curl -sSL -o install-airport-weather.sh https://raw.githubusercontent.com/harborscale/harbor-airport-weather/refs/heads/main/install.sh
    ```
2.  Make it executable:
    ```bash
    chmod +x install-airport-weather.sh
    ```
3.  Run the installation script with root privileges:
    ```bash
    sudo ./install-airport-weather.sh
    ```

### 4. Configuration During Installation

During installation, you'll be prompted to:

1.  **Enter your Harbor Scale API details**:
    -   API Batch Endpoint URL
    -   API Key
2.  **Enter your OpenWeatherMap API key**.
3.  **Select airports to monitor**:
    -   Enter airport codes and names in the format `ICAO:Airport Name`.
    -   Choose from sample airports around the world.
    -   Add as many airports as you need.
4.  **Select a sampling rate** for how often weather data is collected:
    -   Every 1 minute
    -   Every 5 minutes (recommended)
    -   Every 15 minutes
    -   Every 30 minutes
    -   Every 1 hour

## Sample Airports

The installation script includes sample airports from around the world:

| ICAO Code | Airport Name                                |
| :-------- | :------------------------------------------ |
| KJFK      | John F. Kennedy International Airport (New York, USA) |
| EGLL      | Heathrow Airport (London, UK)               |
| RJTT      | Tokyo Haneda Airport (Tokyo, Japan)         |
| YSSY      | Sydney Airport (Sydney, Australia)          |
| FACT      | Cape Town International Airport (Cape Town, South Africa) |
| SBGR      | São Paulo–Guarulhos International Airport (São Paulo, Brazil) |
| LTBA      | Istanbul Atatürk Airport (Istanbul, Turkey) |
| OMDB      | Dubai International Airport (Dubai, UAE)    |
| VIDP      | Indira Gandhi International Airport (Delhi, India) |
| ZBAA      | Beijing Capital International Airport (Beijing, China) |

## Pre-built Grafana Dashboard

### Import the Ready-to-Use Dashboard

1.  **Download the dashboard JSON**:
    ```bash
    curl -sSL -o airport-weather-dashboard.json https://raw.githubusercontent.com/harborscale/harbor-airport-weather/main/airport-weather-dashboard.json
    ```
2.  **Import into Grafana**:
    -   Log in to your Grafana instance.
    -   Go to **Dashboards** → **Import**.
    -   Click **Upload JSON file** and select `airport-weather-dashboard.json`.
    -   Configure the PostgreSQL datasource.
    -   Click **Import**.

### Dashboard Features

-   **Current Weather Conditions**: Real-time summary table with color-coded values.
-   **Temperature & Feels Like**: Historical temperature trends.
-   **Humidity**: Relative humidity monitoring.
-   **Pressure**: Barometric pressure tracking.
-   **Wind Speed & Gusts**: Wind condition analysis.
-   **UV Index**: Solar radiation level with safety thresholds.
-   **Air Quality**: PM2.5 and PM10 particulate matter monitoring.
-   **Airport Filter**: Multi-select airport monitoring.
-   **Auto-refresh**: Real-time data updates every 30 seconds.



## Managing the Service

After installation, the airport weather service runs automatically. You can manage it using `systemctl`:

```bash
# Check service status
systemctl status harbor-airport

# View logs
journalctl -u harbor-airport -f

# Stop the service
systemctl stop harbor-airport

# Start the service
systemctl start harbor-airport

# Disable automatic startup
systemctl disable harbor-airport

# Enable automatic startup
systemctl enable harbor-airport
```

## Troubleshooting

### Common Issues

**Error: Failed to send test data point**

-   Verify your API endpoint and key are correct.
-   Check your internet connection.
-   Ensure your firewall allows outbound connections.

**Error: Invalid OpenWeatherMap API key**

-   Verify your API key is correct.
-   Ensure your API key is activated (may take a few minutes after signup).
-   Check you haven't exceeded the free tier limits.

**Service starts but no data appears in Grafana**

-   Check the service logs: `journalctl -u harbor-airport -f`.
-   Verify the airports you selected are valid ICAO codes.
-   Ensure your Harbor Scale account is active.

**Missing or incomplete weather data**

-   Some airports may not report all weather metrics consistently.
-   Try adding more airports to ensure consistent data collection.
-   Check if the weather services are experiencing issues.

## Uninstalling

To uninstall the airport weather agent:

1.  Run the installation script again:
    ```bash
    sudo ./install-airport-weather.sh
    ```
2.  Select the "Uninstall Airport Weather Collector" option from the menu.

Alternatively, use the uninstall flag:

```bash
sudo ./install-airport-weather.sh --uninstall
```

## Data Applications

The comprehensive airport weather data can be used for:

-   Professional weather monitoring and analysis.
-   Climate pattern tracking across different regions.
-   Air quality monitoring for health and safety.
-   Aviation weather decision support.
-   Historical weather database creation.
-   Educational purposes and research.
-   Correlating weather with other operational metrics.
