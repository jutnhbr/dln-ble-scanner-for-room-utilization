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
- InfluxDB installed
- MQTT Broker installed (Mosquitto)

## How to use (WIP)
### Preparing the Dependencies
- Clone this repository
- Run `npm install` in the root directory for the client and in the server directory for the server
- To receive data from the ESP32 MicroController, you need to change the MQTT Broker IP in the `mqttClient.js` file and 
start the local MQTT Broker on your machine
- Change the InfluxDB Connection Settings in the `influxDB.js` file
- Start the InfluxDB Server with `influxd` 
### Starting the Application
- Run `npm run dev` in the directory of the server
- Run `npm run start` in the directory of the client
- After startup the application is available at `localhost:3006`