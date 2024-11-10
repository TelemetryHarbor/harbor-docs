---
sidebar_position: 6
---

# Database Schema

Telemetry Harbor uses TimescaleDB, a time-series database built on PostgreSQL, to store sensor and GPS data. Understanding the schema will help you write more effective queries and optimize your data storage.

## Main Table: sensor_data

The primary table for storing all sensor readings is sensor_data. Here's its structure:

- time: Timestamp of the data point (with timezone)
- bee_id: Unique identifier for the device
- sensor_id: Identifier for the sensor or data type
- value: The recorded sensor value

Note: This table is created as a TimescaleDB hypertable, which provides enhanced performance for time-series data queries.

## Indexing

To optimize query performance, we have created an index on frequently queried columns. This index will improve the performance of queries that filter by bee_id and sensor_id and order by time.