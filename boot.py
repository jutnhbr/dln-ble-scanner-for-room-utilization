import esp
import time
import machine
from util import wifiManager
from MQTT import mqttClient
from config import config


current_try = 0
max_retries = 5

def errorFallback():
    if(current_try < max_retries):
        print('Failed to connect to MQTT. Reconnecting...', current_try, "/", max_retries, ")")
        time.sleep(5)
        mqttClient.MQTTConnect()
    else:
        print("Max Retries reached. Resetting Device.")
        machine.reset()
  
  
if(config.NET):
    wifiManager.connect()
 
try:
  mqttClient.MQTTConnect()
except OSError as e:
    errorFallback()