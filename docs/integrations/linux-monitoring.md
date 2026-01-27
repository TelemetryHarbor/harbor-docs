---
sidebar_position: 4
title: Linux System Monitoring
description: Set up the Harbor Lighthouse agent to stream system metrics (CPU, RAM, Disk) to Harbor Scale.
---

# Linux System Monitoring

This guide explains how to set up **Harbor Lighthouse** on your Linux servers. Lighthouse is a tiny, single-binary agent that replaces the legacy bash scripts. It automatically collects system performance metrics, handles network interruptions, and ships data securely to Harbor Scale.

**_Repo Link:_** https://github.com/harborscale/harbor-lighthouse

## Prerequisites

Before starting, ensure you have:

-   A **Linux** system (Ubuntu, Debian, CentOS, Arch, or Raspberry Pi OS).
-   **Root/Sudo** access to install the system service.
-   **curl** installed.
-   A **Harbor Scale account** (Cloud or Self-Hosted).

## How it Works

The Lighthouse agent runs as a background system service (`systemd`). It uses the internal `linux` collector driver to read directly from kernel statistics (like `/proc/stat` and `/proc/meminfo`) without spawning external processes. This makes it significantly more efficient than previous script-based solutions.


---

## Setup Guide

### 1. Get Your Credentials

If you haven't already, log in to your Harbor Scale dashboard to get your connection details.

1.  **Cloud Users:** You need your **Harbor ID** (e.g., `123`) and **API Key**.
2.  **Self-Hosted Users:** You need your **Endpoint URL** (e.g., `http://192.168.1.50:8000`) and **API Key**.

### 2. Install the Agent

We provide a universal installer that detects your OS and architecture (AMD64, ARM64/Pi, etc.).

```bash
curl -sL get.harborscale.com | sudo bash
```

### 3. Add the System Monitor

Once installed, use the `lighthouse` CLI to configure the monitoring job. This command registers the monitor and starts the collection immediately.

**For Harbor Scale Cloud:**

```bash
sudo lighthouse --add --name "server-01" --harbor-id "YOUR_HARBOR_ID" --key "YOUR_API_KEY" --source linux
```

**For Self-Hosted / OSS:**

```bash
sudo lighthouse --add --name "server-01" --endpoint "http://YOUR_IP:8000" --key "YOUR_API_KEY" --source linux
```

> **Note:** Replace `server-01` with a unique name for this device.

---

## Configuration & Customization

The `linux` collector works out of the box, but you can customize how it runs using flags during the `--add` command.

| Flag | Description | Default |
| --- | --- | --- |
| `--interval` | How often to collect and send metrics (in seconds). | `60` |
| `--name` | The unique ID for this server in your dashboard. | (Required) |
| `--batch-size` | Max number of metrics to buffer before sending. | `100` |

**Example: High-Frequency Monitoring**
To collect data every 5 seconds:

```bash
sudo lighthouse --add --name "high-freq-server" --harbor-id "123" --key "xyz" --source linux --interval 5
```

## Available Metrics

The `linux` source automatically captures the following core metrics:

* **CPU:** Usage percentage (System, User, Idle, Steal).
* **Memory:** RAM Used, Free, Cached, and Buffers.
* **Disk:** Usage percentage and free space for the root partition.
* **Load Average:** 1, 5, and 15-minute load averages.
* **Uptime:** System uptime in seconds.

---

## Managing the Service

Lighthouse simplifies management with built-in commands. You do not need to interact with `systemctl` manually.

| Task | Command |
| --- | --- |
| **Check Status** | `lighthouse --list` |
| **View Logs** | `lighthouse --logs "server-01"` |
| **Stop Monitoring** | `lighthouse --remove "server-01"` |
| **Disable Updates** | `lighthouse --autoupdate=false` |

## Uninstalling

To completely remove the service and binary from your system:

```bash
sudo lighthouse --uninstall
```

---

## Troubleshooting

### Common Issues

**"Command not found" after installation**

* The installer places the binary in `/usr/local/bin`. Ensure this directory is in your `$PATH`.
* Try running `sudo /usr/local/bin/lighthouse --list`.

**Monitor status is "Unhealthy"**

* Run `lighthouse --list` to see the status.
* If unhealthy, check the logs: `lighthouse --logs "server-01"`.
* **401 Unauthorized:** Check your API Key.
* **Connection Refused:** Check your internet connection or Firewall settings.

**Systemd Service Fails to Start**

* If you manually removed files, reinstall using `sudo lighthouse --install`.
