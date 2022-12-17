import network
from config import config
import time
import machine

station = network.WLAN(network.STA_IF)

current_try = 0
max_retries = 10

def connect():
  ssid = config.SSID
  password =  config.NETWORK_KEY
  
 
  if station.isconnected() == True:
      print("WiFiMananger > Already connected")
      print("WiFiMananger > Network Config:")
      print(station.ifconfig())
      return
 
  station.active(True)
  try:
      station.connect(ssid, password)    
  except OSError as e:
      global current_try
      global max_retries
      
      if(current_try < max_retries):
          print('WiFiMananger > Failed to connect. Retrying... (', current_try, "/", max_retries, ")")
          time.sleep(5)
          current_try = current_try + 1
          connect()
      else:
          print("Max Retry Limit reached... Rebooting Device.")
          current_try = 0
          machine.reset()
          
 
 
  while station.isconnected() == False:
      pass
      
 
  print("WiFiMananger > Connection successful")
  print("WiFiMananger > Network Config:")
  print(station.ifconfig())


def disconnect():
    print("WiFiMananger > Disconnecting")
    station.disconnect()

def isConnected():
    return station.isconnected()
