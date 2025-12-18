---
sidebar_position: 2
title: Home Assistant Integration
description: Connect your Home Assistant sensors to Telemetry Harbor for advanced data logging and visualization.
---

# Home Assistant Integration

This guide demonstrates how to integrate your Home Assistant instance with Telemetry Harbor. By setting up a simple REST command and automation, you can push all your numerical sensor states from Home Assistant to Telemetry Harbor for advanced logging, analysis, and visualization in Grafana.

**_Repo Link:_** https://github.com/harborscale/harbor-home-assistant


## Prerequisites

Before starting, ensure you have:

-   **Home Assistant** installed and running.
-   A working knowledge of **YAML** for Home Assistant configurations.
-   Smart home **sensors** or **devices** set up in Home Assistant.
-   A **Telemetry Harbor account** (free tier available).

## Setup

### 1. Create a Telemetry Harbor Account

1.  **Sign up** at [Telemetry Harbor](https://harborscale.com/)
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

### 2. Configure Home Assistant

Edit your `configuration.yaml` to include the following REST command. This command will collect all numerical sensor states and send them as a batch to Telemetry Harbor.

**`configuration.yaml`**
```yaml
rest_command:
  push_all_sensors_data:
    url: "YOUR_API_BATCH_ENDPOINT"
    method: POST
    headers:
      X-API-Key: "YOUR_API_KEY"
      Content-Type: "application/json"
    payload: >
      [
        {% for sensor in states.sensor
            | selectattr('state', 'is_number')
            | list %}
        {
          "time": "{{ now().utcnow().isoformat() }}Z",
          "ship_id": "{{ sensor.entity_id.split('.')[1].replace('_', ' ').title() }}",
          "cargo_id": "{{ sensor.attributes.friendly_name | default(sensor.entity_id.split('.')[-1].replace('_', ' ').title()) }}",
          "value": {{ sensor.state }}
        }{% if not loop.last %},{% endif %}
        {% endfor %}
      ]
```

Replace `YOUR_API_BATCH_ENDPOINT` and `YOUR_API_KEY` with your actual Telemetry Harbor credentials.

### 3. Save & Restart

Save your `configuration.yaml` file and restart your Home Assistant instance for the changes to take effect.

### 4. Automate Data Push (Optional)

To automatically push data at regular intervals, you can create an automation in Home Assistant. Add this to your `automations.yaml` or directly in the Home Assistant UI.

```yaml
  - alias: 'Push all sensors data to Telemetry Harbor'
    trigger:
      - platform: time_pattern
        minutes: "/5" # Every 5 minutes
    action:
      - service: rest_command.push_all_sensors_data
```

## Visualizing Data in Grafana

Once data starts flowing from Home Assistant to Telemetry Harbor, you can visualize it in Grafana. Use the `ship_id` (derived from entity ID) and `cargo_id` (derived from friendly name or entity ID) to filter and display your smart home sensor data.

Refer to the [Grafana Visualization Guide](../visualization/grafana.md) for detailed instructions on creating dashboards.
