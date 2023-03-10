# DLN Bluetooth Low Energy Scanner
ESP32 MicroPython Project to scan for nearby Bluetooth Low Energy Devices to determine the room utilization. Also contains a Webinterface that features:
- MQTT Client Integration to receive data from ESP32 MicroController
- InfluxDB Integration to write data to database
- Responsive Nivo Charts Implementation to visualize data
- Filter by Time Range and Time Window
- ExpressJS Endpoints to retrieve data from InfluxDB

## BLE Scanner Dependencies
- Aioble - High Level Bluetooth Low Energy MicroPython Library
- umqttsimple - MicroPython MQTT Client Library
- uasyncio - MicroPython Library for asynchronous programming  

## BLE Scanner Features
- Completly configurable via global config file
    - Scan Type (Active / Passive)
    - Scan Duration
    - Delay between scans results
    - Interval between scans
    - Filter (Address Type, RSSI, Connectable Status, Duplicates)
    - Optional Logging
- After the ESP is started, it automatically establishes a WIFI and MQTT connection (if configured properly)  
- Automatically scans every X (configurable) minutes and publishes results via MQTT 

## BLE Scanner Prerequisites
- ESP32 flashed with MicroPython
- Local MQTT Broker running listening on TCP (for data transfer. The scanner still works without MQTT)
- Access to WIFI \
...... WIP

## How to set up the ESP32 
1. Clone the Repo and copy all files **except the webinterface directory** to the Device 
2. Make sure to change the WIFI and MQTT constants references. Either use your own data (SSID, WIFI Key, MQTT Broker Address) directly in the variables or enter the corresponding values in constants.py (recommended) and insert them into the `config.py`.
3. Check the `config/config.py` file and configure the scanner (Default Config works as well)
4. Restart or Soft-Reboot the ESP32 (Ctrl+D) \
... WIP

# How to setup and use the Webinterface
- Check the `readme.md` inside the Webinterface Directory


