## Overview
ReactJS Frontend with ExpressJS Backend Server for my [Bluetooth Low Energy Scanner](https://github.com/jutnhbr/dln-ble-scanner-for-room-utilization) 
- MQTT Client Integration to receive data from ESP32 MicroController
- InfluxDB Integration to write data to database
- Responsive Nivo Charts Implementation to visualize data
- Filter by Time Range and Time Window
- ExpressJS Endpoints to retrieve data from InfluxDB

## Prerequisites
- Bluetooth Low Energy Scanner up and running and ready to send data to MQTT Broker
- NodeJS / NPM installed
- InfluxDB installed (Tested with Version 2.6 OSS Edition)
- MQTT Broker installed (Mosquitto)

### Important
In order for the MQTT broker to connect to both the ESP32 and the ExpressJS server, it must be configured accordingly. Edit the `mosquitto.conf` File
(`C:\path\to\mosquitto\mosquitto.conf`) and enable one listener for WebSockets connections and one for TCP connections. Here is an example:
```
per_listener_settings true

# this will listen for mqtt on tcp
listener 1883
allow_anonymous true

# websockets connections from expressJS
listener 8001
protocol websockets
socket_domain ipv4
allow_anonymous true
```


## How to use (WIP)
### Preparing the Dependencies
- Clone this repository (if not done already) and move the webinterface directory to a location of your liking
- Run `npm install` in the root directory for the client and in the server directory for the server
- To receive data from the ESP32 MicroController, you need to change the MQTT Broker IP in the `mqttClient.js` file and 
start the local MQTT Broker on your machine
- Change the InfluxDB Connection Settings in the `influxDB.js` file
- Start your local InfluxDB Server with `influxd` 
### Starting the Application
- Run `npm run dev` in the directory of the server
- Run `npm run start` in the directory of the client
- After startup the application is available at `localhost:3006`
