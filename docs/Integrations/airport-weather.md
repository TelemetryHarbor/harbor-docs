---
sidebar_position: 5
title: Airport Weather Monitoring
description: Detailed guide for setting up the Airport Weather Monitoring agent for Telemetry Harbor
---

# Airport Weather Monitoring Agent

Easily collect and visualize weather data from airports worldwide in **Grafana** with **Telemetry Harbor**.

**_Repo Link:_** https://github.com/TelemetryHarbor/harbor-airport-weather

## Features
- Collect temperature, pressure, and wind speed data from airports worldwide
- Support for multiple airports with customizable names
- Configurable sampling rates from 1 minute to 1 hour
- Automatic service installation with systemd integration
- Interactive installation with color-coded interface
- Minimal dependencies - works on most Linux systems out of the box
- Real-time weather data from aviation weather services

## Prerequisites

Before starting, ensure you have:
- A **Linux** system with **root/sudo** access
- **curl** installed for API communication
- A working internet connection to fetch weather data and send to Telemetry Harbor
- Basic knowledge of Linux terminal commands

## Setup
### 1. Create a Telemetry Harbor Account
1. **Sign up** at [Telemetry Harbor](https://telemetryharbor.com/)
2. **Verify** your email and log in
3. **Create a Harbor**:
   - Click **Create Harbor** on your dashboard
   - Choose a **name** and select **General** as the type
   - Select the **Free** plan (or upgrade for more data capacity)
   - Click **Create**

4. **Retrieve your credentials**:
   - After creation, go to **View Details**
   - Note down:
     - `API Batch Endpoint`
     - `API Key`
     - `Grafana Endpoint`
     - `Grafana Username`
     - `Grafana Password`

### 2. Install the Airport Weather Agent
1. Download the installation script:
\`\`\`bash
curl -sSL -o install-airport-weather.sh https://raw.githubusercontent.com/TelemetryHarbor/harbor-airport-weather/refs/heads/main/install.sh
\`\`\`
2. Make it executable:
\`\`\`bash
chmod +x install-airport-weather.sh
\`\`\`
3. Run the installation script with root privileges:
\`\`\`bash
sudo ./install-airport-weather.sh
\`\`\`
### 3. Configuration During Installation

During installation, you'll be prompted to:

1. **Enter your Telemetry Harbor API details**:
   - API Batch Endpoint URL
   - API Key

2. **Select airports to monitor**:
   - Enter airport codes and names in the format `ICAO:Airport Name`
   - Choose from sample airports around the world
   - Add as many airports as you need

3. **Select a sampling rate** for how often weather data is collected:
   - Every 1 minute
   - Every 5 minutes (recommended)
   - Every 15 minutes
   - Every 30 minutes
   - Every 1 hour

## Available Metrics

The airport weather agent collects the following metrics for each airport:

| Metric | Description |
|--------|-------------|
| Temperature | Temperature in degrees Celsius |
| Pressure | Atmospheric pressure in hectopascals (hPa) |
| WindSpeed | Wind speed in knots |

## Sample Airports

The installation script includes sample airports from around the world:

| ICAO Code | Airport Name |
|-----------|--------------|
| KJFK | John F. Kennedy International Airport (New York, USA) |
| EGLL | Heathrow Airport (London, UK) |
| RJTT | Tokyo Haneda Airport (Tokyo, Japan) |
| YSSY | Sydney Airport (Sydney, Australia) |
| FACT | Cape Town International Airport (Cape Town, South Africa) |
| SBGR | São Paulo–Guarulhos International Airport (São Paulo, Brazil) |
| LTBA | Istanbul Atatürk Airport (Istanbul, Turkey) |
| OMDB | Dubai International Airport (Dubai, UAE) |
| VIDP | Indira Gandhi International Airport (Delhi, India) |
| ZBAA | Beijing Capital International Airport (Beijing, China) |

## Managing the Service

After installation, the airport weather service runs automatically. You can manage it using:

\`\`\`bash
# Check service status
systemctl status harbor-airport
\`\`\`
\`\`\`bash
# View logs
journalctl -u harbor-airport -f
\`\`\`
\`\`\`bash
# Stop the service
systemctl stop harbor-airport
\`\`\`
\`\`\`bash
# Start the service
systemctl start harbor-airport
\`\`\`
\`\`\`bash
# Disable automatic startup
systemctl disable harbor-airport
\`\`\`
\`\`\`bash
# Enable automatic startup
systemctl enable harbor-airport
\`\`\`
## Uninstalling

To uninstall the airport weather agent:

1. Run the installation script again:
\`\`\`bash
sudo ./install-airport-weather.sh
\`\`\`
2. Select the "Uninstall Airport Weather Collector" option from the menu.

Alternatively, use the uninstall flag:
\`\`\`bash
sudo ./install-airport-weather.sh --uninstall
\`\`\`

## Troubleshooting

### Common Issues

**Error: Failed to send test data point**
- Verify your API endpoint and key are correct
- Check your internet connection
- Ensure your firewall allows outbound connections

**Service starts but no data appears in Grafana**
- Check the service logs: `journalctl -u harbor-airport -f`
- Verify the airports you selected are valid ICAO codes
- Ensure your Telemetry Harbor account is active

**Missing or incomplete weather data**
- Some airports may not report all weather metrics consistently
- Try adding more airports to ensure consistent data collection
- Check if the aviation weather service is experiencing issues

**"Invalid format" error when adding airports**
- Make sure to use the correct format: `ICAO:Airport Name`
- ICAO codes are typically 4 letters (e.g., KJFK, EGLL)
- Don't include spaces before or after the colon

## Visualizing Data in Grafana

Once your airport weather data is flowing into Telemetry Harbor, you can visualize it in Grafana:

1. Log in to your Grafana instance using the credentials from your Harbor setup
2. Create a new dashboard or import the Airport Weather template
3. Add panels for each metric (Temperature, Pressure, WindSpeed)
4. Use the airport names as filters to compare data from different locations
5. Set up alerts for extreme weather conditions

## Data Applications

The airport weather data can be used for:

- Tracking weather patterns across different regions
- Comparing climate conditions globally
- Creating historical weather databases
- Correlating weather with other metrics in your systems
- Educational purposes and weather analysis
\`\`\`

I've created two separate files:

1. README.md - A standard GitHub repository README with installation instructions, features, and basic usage information
2. airport-weather.md - A comprehensive documentation file formatted for your documentation website with the sidebar metadata

The install.sh script remains the same as in my previous response, with all the requested changes implemented.

<Actions>
  <Action name="Add weather visualization" description="Create a Grafana dashboard template for weather data" />
  <Action name="Add more weather metrics" description="Expand to include visibility, cloud cover, and precipitation" />
  <Action name="Create Docker version" description="Containerize the airport weather collector" />
  <Action name="Add historical data" description="Add option to collect historical weather data" />
  <Action name="Add alert integration" description="Configure weather alerts based on thresholds" />
</Actions>

\`\`\`

