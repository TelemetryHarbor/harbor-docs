---
sidebar_position: 1
title: Grafana Visualization Guide
description: A comprehensive guide to visualizing your Telemetry Harbor data in Grafana.
---

# Grafana Visualization Guide

Telemetry Harbor integrates seamlessly with Grafana to provide powerful data visualization capabilities for your telemetry data. This guide will walk you through setting up your first graphs, using variables, and exploring advanced features.

## Database Schema Overview

Telemetry Harbor uses TimescaleDB (PostgreSQL extension) to store time-series data. The main table structure is:

### `cargo_data` Table

```sql
CREATE TABLE cargo_data (
    time TIMESTAMPTZ NOT NULL,
    ship_id TEXT NOT NULL,
    cargo_id TEXT NOT NULL,
    value DOUBLE PRECISION NOT NULL
);
```

**Column Descriptions:**
-   `time`: Timestamp of the reading (ISO 8601 format).
-   `ship_id`: Unique identifier for the device.
-   `cargo_id`: Unique identifier for the sensor or event.
-   `value`: The recorded numerical value.

## Setting Up Your First Graph

1.  **Log In**: Access Grafana using your Telemetry Harbor credentials (Email/Provided Password).
2.  **Change the default password** for extra security.
3.  **Data Source Setup**: Verify that the TimescaleDB data source is properly connected.
4.  **Create a New Dashboard**:
    -   Navigate to "Dashboards" > "New Dashboard"
    -   Click "Add new panel"
    -   In the query editor, select the TimescaleDB data source


## Setting Up Grafana Variables

Before writing queries, set up variables for dynamic dashboards, allowing users to select `ship_id` and `cargo_id` from dropdowns.

### 1. Ship ID Variable

-   **Name**: `ship_id`
-   **Type**: Query
-   **Query**:
    ```sql
    SELECT DISTINCT ship_id FROM cargo_data ORDER BY ship_id
    ```
-   **Multi-value**: Enable
-   **Include All option**: Enable

### 2. Cargo ID Variable

-   **Name**: `cargo_id`
-   **Type**: Query
-   **Query**:
    ```sql
    SELECT DISTINCT cargo_id FROM cargo_data ORDER BY cargo_id
    ```
-   **Multi-value**: Enable
-   **Include All option**: Enable

### 3. Interval Handling (for TimescaleDB)

Grafana's `$__interval` or custom interval variables return values like `1d` or `5m`, which are **not valid in TimescaleDB**. Timescale requires intervals in the format `interval '1 day'`.

To solve this, we calculate the bucket size in SQL based on the selected time range:

```sql
WITH time_range AS (
    SELECT $__timeFrom() AS start_time, $__timeTo() AS end_time
),
bucket_choice AS (
    SELECT CASE
        WHEN end_time - start_time <= interval '1 hour' THEN interval '10 seconds'
        WHEN end_time - start_time <= interval '6 hours' THEN interval '1 minute'
        WHEN end_time - start_time <= interval '1 day' THEN interval '5 minutes'
        WHEN end_time - start_time <= interval '7 days' THEN interval '30 minutes'
        WHEN end_time - start_time <= interval '30 days' THEN interval '1 hour'
        WHEN end_time - start_time <= interval '90 days' THEN interval '6 hours'
        ELSE interval '1 day'
    END AS bucket
    FROM time_range
)
```

### 4. Time Range Variable

Grafana automatically provides `$__timeFilter()` function for time filtering.

## Sample Queries

### Basic Time Series Query

Display sensor readings for specific ships and cargo types:

```sql
SELECT
  time,
  value,
  ship_id,
  cargo_id
FROM cargo_data
WHERE $__timeFilter(time)
  AND cargo_id IN ($cargo_id:sqlstring)
  AND ship_id IN ($ship_id:sqlstring)
ORDER BY time ASC;
```

### Aggregated Data with Dynamic Time Buckets

Group data by time intervals using the interval variable:

```sql
SELECT
  time_bucket('$interval', time) AS time,
  ship_id,
  cargo_id,
  AVG(value) as avg_value,
  MAX(value) as max_value,
  MIN(value) as min_value,
  COUNT(*) as data_points
FROM cargo_data
WHERE $__timeFilter(time)
  AND cargo_id IN ($cargo_id:sqlstring)
  AND ship_id IN ($ship_id:sqlstring)
GROUP BY time_bucket('$interval', time), ship_id, cargo_id
ORDER BY time ASC;
```

### GPS Tracking Query

For GPS data (latitude/longitude pairs, assuming they are stored as separate `cargo_id` values):

```sql
SELECT
  time_bucket('$interval', time) AS time,
  ship_id,
  MAX(CASE WHEN cargo_id = 'latitude' THEN value END) as latitude,
  MAX(CASE WHEN cargo_id = 'longitude' THEN value END) as longitude
FROM cargo_data
WHERE $__timeFilter(time)
  AND ship_id IN ($ship_id:sqlstring)
  AND cargo_id IN ('latitude', 'longitude')
GROUP BY time_bucket('$interval', time), ship_id
ORDER BY time ASC;
```

### Latest Values Query

Get the most recent reading for each sensor:

```sql
SELECT DISTINCT ON (ship_id, cargo_id)
  time,
  ship_id,
  cargo_id,
  value
FROM cargo_data
WHERE $__timeFilter(time)
  AND cargo_id IN ($cargo_id:sqlstring)
  AND ship_id IN ($ship_id:sqlstring)
ORDER BY ship_id, cargo_id, time DESC;
```

### Rate of Change Query

Calculate the rate of change using the interval variable:

```sql
SELECT
  time_bucket('$interval', time) AS time,
  ship_id,
  cargo_id,
  AVG(value) as current_avg,
  LAG(AVG(value)) OVER (PARTITION BY ship_id, cargo_id ORDER BY time_bucket('$interval', time)) as previous_avg,
  AVG(value) - LAG(AVG(value)) OVER (PARTITION BY ship_id, cargo_id ORDER BY time_bucket('$interval', time)) as change
FROM cargo_data
WHERE $__timeFilter(time)
  AND cargo_id IN ($cargo_id:sqlstring)
  AND ship_id IN ($ship_id:sqlstring)
GROUP BY time_bucket('$interval', time), ship_id, cargo_id
ORDER BY time ASC;
```

## Visualization Types

### Time Series Panel

Best for showing sensor trends over time:

-   Use the aggregated query with interval variable.
-   Configure legend to show `{{ship_id}} - {{cargo_id}}`.
-   Set appropriate Y-axis units.


### Stat Panel

Perfect for showing current values:

-   Use the latest values query.
-   Configure value mappings for status indicators.
-   Set thresholds for color coding.

### Geomap Panel

For GPS tracking visualization:

-   Use the GPS tracking query.
-   Configure latitude/longitude fields.
-   Add trajectory lines for ship movement.


### Table Panel

Useful for detailed data inspection:

-   Use any query with multiple columns.
-   Configure column sorting and filtering.
-   Add conditional formatting.

## Advanced Features

### Alerting

Set up alerts based on sensor thresholds:

```sql
SELECT
  time,
  ship_id,
  cargo_id,
  value
FROM cargo_data
WHERE $__timeFilter(time)
  AND cargo_id = 'temperature'
  AND value > 80   -- Alert threshold
ORDER BY time DESC
LIMIT 1;
```

### Annotations

Add events to your graphs:

```sql
SELECT
  time as time,
  'Alert: High Temperature' as text,
  ship_id as tags
FROM cargo_data
WHERE $__timeFilter(time)
  AND cargo_id = 'temperature'
  AND value > 80;
```

### Moving Averages

Calculate moving averages using window functions:

```sql
SELECT
  time,
  ship_id,
  cargo_id,
  value,
  AVG(value) OVER (
      PARTITION BY ship_id, cargo_id
      ORDER BY time
      ROWS BETWEEN 10 PRECEDING AND CURRENT ROW
  ) as moving_avg_10
FROM cargo_data
WHERE $__timeFilter(time)
  AND cargo_id IN ($cargo_id:sqlstring)
  AND ship_id IN ($ship_id:sqlstring)
ORDER BY time ASC;
```

By following these guidelines and using the provided queries with the interval variable, you can create comprehensive, performant dashboards that provide valuable insights into your maritime telemetry data.
