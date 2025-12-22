---
sidebar_position: 1
title: Quick Start Guide
description: Get your first data point into Harbor Scale in under 2 minutes.
---

# Quick Start Guide

Harbor Scale is designed to get you from "Zero" to "Dashboard" in minutes. We automate the code writing process so you can focus on the data.

## 1. Create a Harbor
1.  Log in to your [Harbor Scale Dashboard](https://harborscale.com).
2.  Click **Deploy Harbor**.
3.  Select **General** (unless you are specifically using LoRaWAN).
4.  Click **Create**.

## 2. Connect Your Device
We don't ask you to read API docs. We generate the firmware for you.

1.  Click the **Connect** tab inside your new Harbor.
2.  Browse the categories to find your device type:

### 🏗️ Path A: Lighthouse (Servers & Laptops)
Best for monitoring the computer you are using right now (Linux, Windows, or Docker).

1.  Look for the **Harbor Lighthouse** section.
2.  Click the tile matching your OS (e.g., **Linux System** or **Windows System**).
3.  Copy the **One-Line Install Script** displayed in the window.
4.  Paste it into your terminal and run it.
5.  *Success! Data is now flowing.*

### 🔌 Path B: Microcontrollers (ESP32 / Arduino)
Best for custom sensors and hardware.

1.  Look for the **Microcontrollers** section.
2.  Click on your specific board (e.g., **ESP32**, **ESP8266**, or **Pico W**).
3.  A wizard will open. Enter your **WiFi Credentials** and select a **Sensor Strategy** (e.g., Simulated).
4.  **Copy the Code.** It is automatically generated with your API Key and WiFi details included.
5.  Flash it to your device using Arduino IDE or PlatformIO.

### ☁️ Path C: No-Code Integrations
Best for 3rd party apps.

1.  Look for the **Cloud & Mobile** section.
2.  Select an integration like **iPhone Location** or **Home Assistant**.
3.  Follow the visual instructions to copy the Webhook URL or Shortcut into your app.

### 🛠️ Path D: Manual / API (Hardcore)
Best for developers who want raw HTTP access or are building custom backends.

1.  Look for the **Cloud & Mobile** section.
2.  Click the **Manual / cURL** tile.
3.  Here you will see your raw **API Key** and **Ingest URL**.
4.  Copy the generated **cURL command** to test your connection instantly from your terminal.

## 3. Visualize in Grafana
Every Harbor comes with a dedicated Grafana instance.

1.  Click the **Visualize** tab.
2.  Click **Launch Dashboard**.
3.  Login with the credentials shown on the screen.
4.  Open the **"Comprehensive Telemetry"** dashboard to see your data instantly.

:::tip Pro Tip
You can also ask **Harbor AI** questions about your data immediately, such as *"What is the average CPU usage for the last 10 minutes?"*
:::