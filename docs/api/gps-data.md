---
sidebar_position: 3
---

# GPS Data

Telemetry Harbor supports GPS data ingestion for location-based IoT applications. When submitting GPS data, follow these guidelines:

- Use the same timestamp for both latitude and longitude values.
- Use distinct ship_id values for latitude and longitude (e.g., "sen_lat" and "sen_long").
- The ship_id should correspond to the device sending the GPS data.

## Example GPS Data Submission

When submitting GPS data, you would include two separate data points for each location update: one for latitude and one for longitude. Both would share the same timestamp and ship_id, but have different ship_id values.

This format allows you to submit GPS coordinates as part of your regular ship data stream, enabling seamless integration of location data with other ship readings.