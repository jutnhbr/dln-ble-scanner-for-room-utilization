from umqtt.simple import MQTTClient
from config import config
from util import wifiManager
import time
import ujson

clientName = config.CLIENT_NAME
brokerAddr = config.BROKER_ADDRESS
mqttc = MQTTClient(clientName, brokerAddr, port=1883, keepalive=60)

# Topic to test Connection
testTopic = clientName.encode() + b"/test"
# Topic for the BLE Scan Results
scanTopic = clientName.encode() + b"/scanner"


def MQTTConnect():
    print("MQTT > Client: ", clientName)
    print("MQTT > Broker Address:", brokerAddr)
    mqttc.connect()

def sendData(data):
    
    last_data = data
    
    if(wifiManager.isConnected()):
        print(clientName, "MQTT > Sending Data...")
        json_data = ujson.dumps(data)
        try:
            mqttc.publish(scanTopic, json_data.encode())
        except OSError as e:
            print("Publishing failed. Retrying...")
            time.sleep(3)
            MQTTConnect()
            sendData(last_data)
    else:
        print("MQTT > Lost Network Connection ...")
        wifiManager.connect()
        sendData(last_data)
    
# Sending Test Messages over the Test Topic   
def sendTestMsg():
    while True:
        testMessage = "Hello from Client! Timestamp: " + str(time.time())
        mqttc.publish(testTopic, testMessage.encode())
        time.sleep(5)