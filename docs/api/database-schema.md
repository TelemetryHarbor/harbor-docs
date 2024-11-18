---
sidebar_position: 6
---

# Database Schema

Telemetry Harbor uses TimescaleDB, a time-series database built on PostgreSQL, to store ship and GPS data. Understanding the schema will help you write more effective queries and optimize your data storage.

## Main Table: ship_data

The primary table for storing all ship readings is ship_data. Here's its structure:

- time: Timestamp of the data point (with timezone)
- ship_id: Unique identifier for the device
- cargo_id: Identifier for the sensor or event
- value: The recorded cargo value

Note: This table is created as a TimescaleDB hypertable, which provides enhanced performance for time-series data queries.

## Indexing

To optimize query performance, we have created an index on frequently queried columns. This index will improve the performance of queries that filter by ship_id and ship_id and order by time.