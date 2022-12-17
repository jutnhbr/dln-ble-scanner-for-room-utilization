from util import constants
#----APPLICATION FLAGS----#
# True = Connect to WiFi on Startup (Should always be true)
NET=True
# True = Connect to MQTT Broker on Startup (Should always be true)
MQTT_START=True

#----WIFI CONNECTION CONFIG----#
SSID=constants.SSID_HOME
NETWORK_KEY=constants.NETWORK_PASSWORD_HOME

#----MQTT CLIENT CONFIG----#
BROKER_ADDRESS=constants.BROKER_ADDR
CLIENT_NAME=constants.CLIENT_NAME

#----SCANNER CONFIG----#

# Time in sec between each scan
TIME_BETWEEN_SCANS=30

# Scan Duration in ms
SCAN_DURATION=2000

# Delay in sec after each scan result
SCAN_DELAY=0.2

# True = Active Scan | False = Passive Scan
ACTIVE_SCAN=True

# Filter by PUBLIC, RANDOM or ANY address type
FILTER_ADDR_TYPE="ANY"

# Only Include Devices with a higher RSSI (0 for no filter)
FILTER_RSSI=-85

# True = Filters Duplicates while Scanning (Highly Recommended)
FILTER_DUPLICATES=True

# True = Only includes connectable devices | False = Includes all devices
FILTER_CONNECTABLE=False

# True = Prints Scanning Process, Results and other events
LOGGING=True

# True = Transfers Data via MQTT after Scan
MQTT=True                    
