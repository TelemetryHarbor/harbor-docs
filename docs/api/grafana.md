---
sidebar_position: 5
---

# Grafana Visualization

Telemetry Harbor integrates with Grafana to provide powerful data visualization capabilities.

## Setting Up Your First Graph

1. Log In: Access Grafana using your Telemetry Harbor credentials (Email/Provided Password).
2. Change the default password for extra security
3. Data Source Setup: Verify that the TimescaleDB data source is properly connected.
4. Create a New Dashboard:
   - Navigate to "Dashboards" > "New Dashboard"
   - Click "Add new panel"
   - In the query editor, select the data source
5. Write Your Query: Use SQL to retrieve data from the ship_data table.

## Sample Query

Here's an example of what a query might look like to display temperature readings for a specific device:
```
SELECT time, value, ship_id, cargo_id 
  FROM cargo_data 
  WHERE $__timeFilter(time) 
    AND cargo_id = '${cargo_id}' 
    AND ship_id IN (${ship_id:sqlstring}) 
  ORDER BY time ASC;
```
This query provides a time-series view of a sensor's data for one or more specific ships. It's useful for monitoring real-time or historical data trends of a specific sensor / event. By adjusting cargo_id and ship_id, users can tailor this to visualize precise data on selected devices.

Adjust the ship_id and cargo_id values to match your specific data and devices. You can also use Grafana variables to create dynamic, interactive dashboards.