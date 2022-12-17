from MQTT import mqttClient
from bleScanner import bleScanner
from bleScanner.scan import scan
from config import config
import uasyncio as asyncio
import ujson
import time


async def initScanner():
    while True:
        devices_raw, scan_result = asyncio.run(bleScanner.ble_scan(
            config.ACTIVE_SCAN,
            config.SCAN_DURATION,
            config.FILTER_ADDR_TYPE,
            config.FILTER_RSSI,
            config.FILTER_DUPLICATES,
            config.FILTER_CONNECTABLE,
            config.SCAN_DELAY,
            config.LOGGING
            ))
        if(config.MQTT):
            mqttClient.sendData(scan_result)
        time.sleep(config.TIME_BETWEEN_SCANS)
            
    
    
asyncio.run(initScanner())












 
 