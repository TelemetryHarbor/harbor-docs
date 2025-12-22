---
sidebar_position: 11
title: Docker Monitoring
description: Monitor Docker container health, status, and resource usage with Harbor Lighthouse.
---

# Docker Monitoring

This guide explains how to monitor your Docker engine and containers using **Harbor Lighthouse**. The agent connects directly to the local Docker daemon to stream real-time status, resource usage, and uptime metrics for every container running on the host.

**_Repo Link:_** https://github.com/harborscale/harbor-lighthouse

## Prerequisites

Before starting, ensure you have:

-   **Docker Engine** installed and running on the host.
-   **Harbor Lighthouse** installed (See [Installation Guide](/docs/lighthouse/)).
-   **Root or Docker Group** permissions for the user running the agent.

## How it Works

Unlike other solutions that require you to deploy a separate "sidecar" container to monitor Docker, Lighthouse runs as a lightweight binary on the host system. It communicates with the Docker Engine via the Unix socket (`/var/run/docker.sock`) to fetch statistics without overhead.


---

## Setup Guide

### 1. Configure Permissions (Crucial)

To allow Lighthouse to read Docker stats, the user running the agent (usually your current user or root) must have access to the Docker socket.

If you are running Lighthouse as a specific user, add them to the `docker` group:

```bash
sudo usermod -aG docker $USER
```

> **Note:** You may need to log out and log back in (or restart the service) for these permissions to take effect.

### 2. Add the Monitor

Use the `lighthouse` CLI to enable the Docker collector.

**For Harbor Scale Cloud:**

```bash
lighthouse --add \
  --name "docker-host-01" \
  --harbor-id "YOUR_HARBOR_ID" \
  --key "YOUR_API_KEY" \
  --source docker
```

**For Self-Hosted / OSS:**

```bash
lighthouse --add \
  --name "docker-host-01" \
  --endpoint "http://YOUR_IP:8000" \
  --key "YOUR_API_KEY" \
  --source docker
```

---

## Configuration

You can customize the Docker monitor using standard Lighthouse flags.

| Flag | Description | Default |
| --- | --- | --- |
| `--interval` | How often to poll container stats (in seconds). | `60` |
| `--name` | The ID of the Docker Host. Individual containers will be nested under this host. | (Required) |
| `--source` | Must be set to `docker`. | - |

### Example: Fast Polling

If you are debugging a crash loop and need granular data:

```bash
lighthouse --add \
  --name "debug-host" \
  --harbor-id "123" \
  --key "xyz" \
  --source docker \
  --interval 10
```

---

## Available Metrics

The `docker` source collects the following data for **each** container:

| Metric | Description |
| --- | --- |
| **Status** | Current state (`running`, `exited`, `paused`, `dead`). |
| **CPU Usage** | Percentage of CPU used by the container relative to the host. |
| **Memory Usage** | RAM usage in Megabytes (MB). |
| **Memory Limit** | The hard limit of memory assigned to the container (if set). |
| **Uptime** | How long the specific container has been running. |
| **Restart Count** | Total number of times the engine has restarted this container. |

---

## Troubleshooting

### Common Issues

**"Permission denied: /var/run/docker.sock"**

* **Cause:** The Lighthouse agent does not have permission to talk to the Docker Daemon.
* **Fix:** Ensure the user running the process is in the `docker` group (see Step 1 above), or run Lighthouse as `root` (e.g., via `sudo lighthouse --install`).

**No containers showing in Dashboard**

* Check if Docker is actually running: `docker ps`
* Check the agent logs:
```bash
lighthouse --logs "docker-host-01"
```


* If the logs show success but no data appears, ensure your containers are not in a "Created" state (they must be Running or Exited to report stats).

**High CPU Usage by Agent**

* If you have hundreds of containers, polling every second can be expensive.
* **Fix:** Increase the interval to 60 seconds or more using `--interval 60`.

