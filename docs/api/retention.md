---
sidebar_position: 7
---

# Data Retention
 `Enterprise Only Feature`

Telemetry Harbor allows you to configure data retention policies to manage the lifecycle of your ship data. You can query and modify the retention period through our API.

## Querying Retention Period

To check the current retention period for your data:

- Endpoint: GET /retention
- Response: Returns the current retention policy for the ship_data table.

## Modifying Retention Period

To set a new retention period:

- Endpoint: POST /retention
- Body: JSON object specifying the retention period in days

This request will set the data retention period to the specified number of days. Data older than this will be automatically deleted.

## Retention Policy Considerations

- Shorter retention periods can help manage storage costs and improve query performance.
- Longer retention periods allow for historical analysis and trend detection over extended periods.
- Consider regulatory requirements when setting retention policies.
- Implement data archiving strategies for long-term storage of important historical data.