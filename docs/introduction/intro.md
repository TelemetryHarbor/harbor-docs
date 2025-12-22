# Welcome to Harbor Scale

Harbor Scale is a high-performance ingestion engine for your IoT and Telemetry data. We solved the hardest part of IoT: **getting the data from the device to the dashboard.**

Most platforms force you to write complex boilerplate code, manage MQTT topics, or configure server agents manually. Harbor flips this model:

1.  **Define:** Tell us what hardware you have (e.g., ESP32, Raspberry Pi).
2.  **Generate:** Our **Embedded Wizard** writes the custom firmware for you—credentials included.
3.  **Deploy:** Flash the code or run the script. You are done.

### The Ecosystem

* **Harbors:** Your dedicated data ingestion nodes. Think of them as the "Server."
* **Ships:** The devices sending data (ESP32, Servers, Docker containers).
* **Cargo:** The actual metrics (Temperature, CPU Load, GPS).
* **Lighthouse:** A plug-and-play agent that instantly monitors Linux, Windows, and Docker without any coding.
* **Grafana:** Every Harbor comes with a dedicated, managed Grafana instance for visualization.

Ready to see data flow? [Jump to the Quick Start](../getting-started/quick-start.md).