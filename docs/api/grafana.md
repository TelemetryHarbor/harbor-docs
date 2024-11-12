---
sidebar_position: 5
---

# Grafana Visualization

Telemetry Harbor integrates with Grafana to provide powerful data visualization capabilities. You can access your Grafana dashboards at:

https://grafana-example.harbor.telemetryharbor.com

## Setting Up Your First Graph

1. Log In: Access Grafana using your Telemetry Harbor credentials.
2. Data Source Setup: Verify that the TimescaleDB data source is properly connected.
3. Create a New Dashboard:
   - Navigate to "Dashboards" > "New Dashboard"
   - Click "Add new panel"
   - In the query editor, select "TimescaleDB" as the data source
4. Write Your Query: Use SQL to retrieve data from the ship_data table.

## Sample Query

Here's an example of what a query might look like to display temperature readings for a specific device:

This query would select the time and value columns from the ship_data table, filtering for temperature readings from a specific device, ordered by time in descending order, and limited to the most recent 100 readings.

Adjust the ship_id and ship_id values to match your specific data and devices. You can also use Grafana variables to create dynamic, interactive dashboards.