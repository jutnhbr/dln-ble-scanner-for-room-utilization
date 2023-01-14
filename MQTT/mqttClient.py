from umqtt.simple import MQTTClient
from config import config
from util import wifiManager
import time
import ujson
import gc

clientName = config.CLIENT_NAME
brokerAddr = config.BROKER_ADDRESS
mqttc = MQTTClient(clientName, brokerAddr, port=1883, keepalive=60)

# Topic to test Connection
testTopic = clientName.encode() + b"/test"
# Topic for the BLE Scan Results
scanTopic = clientName.encode() + b"/scanner"

encode = True
buffer = None


def MQTTConnect():
    try:
        print("MQTT > Client: ", clientName)
        print("MQTT > Broker Address:", brokerAddr)
        mqttc.connect()
        gc.collect()
    except OSError as e:
        MQTTConnect()

def sendData(data):
    global encode
    global buffer
    
    if encode:
        buffer = ujson.dumps(data)
        
    if(wifiManager.isConnected()): 
        print(clientName, "MQTT > Sending Data...")
        try:
            mqttc.publish(scanTopic, buffer.encode())
            encode = True
            gc.collect()
        except OSError as e:
            print("Publishing failed. Retrying...")
            time.sleep(3)
            MQTTConnect()
            encode = False
            sendData(buffer)
    
    else:
        print("MQTT > Lost Network Connection ...")
        wifiManager.connect()
        encode = False
        sendData(buffer)

    
# Sending Test Messages over the Test Topic   
def sendTestMsg():
    while True:
        testMessage = "Hello from Client! Timestamp: " + str(time.time())
        mqttc.publish(testTopic, testMessage.encode())
        time.sleep(5)