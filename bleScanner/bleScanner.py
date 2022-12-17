import bluetooth
import aioble
import uasyncio as asyncio
from bleScanner.bleDevice import bleDevice
from bleScanner.scan import scan
from util import timeFormat
from time import sleep
import ujson
import gc

# Scan 
async def ble_scan(active, duration, filter_addr_type, filter_rssi, filter_duplicates, filter_connectable, delay, logging):
    
    ble_devices = []
    
    async with aioble.scan(duration, interval_us=50000, window_us=20000, active=active) as scanner:
        async for result in scanner:
            
            if(logging):
                print("***************************************************************************")
                print("RSSI: ", result.rssi, "Address Info:", result.device.__str__(), "Name: ", result.name(),"Connectable: ", result.connectable)
                
            if(filter_duplicates and filterDuplicates(ble_devices, result.device.__str__())):
                print("BLE-Scanner: Duplicate Passed." if logging else "")
                continue
            elif(filterByRSSI(result, filter_rssi)):
                print("BLE-Scanner: Filtered RSSI." if logging else "")
                pass
            elif(filter_connectable and filterByConnectable(result) != True):
                print("BLE-Scanner: Filtered Connectable." if logging else "")
                continue
            elif(filter_addr_type and filterByAddressType(result)):
                print("BLE-Scanner: Filtered Address Type." if logging else "")
                continue
            else:
                ble_devices.append(bleDevice(result.rssi, result.device.__str__(), result.name(), result.connectable))
                print("BLE-Scanner: Result added." if logging else "")
                sleep(delay)
                gc.collect()
                    
        print("\nBLE Scanner >>> Scan finished\n" if logging else "")
        if(logging):
            displayDevices(ble_devices)
        
        # Convert the ble_device list to JSON and add the current timestamp
        scan_result = {
                "timestamp": timeFormat.getTimestamp(),
                "scanresult" : ujson.dumps([ob.__dict__ for ob in ble_devices])
            }
        return (ble_devices, scan_result)
    return None

# Filtering Duplicated Entries
def filterDuplicates(devices, result):
    return any(obj.result == result for obj in devices)

# Showing Devices
def displayDevices(devices):
    print("---------------Device List---------------\n")
    for device in devices:
        print("RSSI: ", device.result_rssi," | ", device.result, " | Name: ", device.result_name, "Connectable: ", device.connectable, sep=' ')

# filter devices with a RSSI smaller than max_rssi
def filterByRSSI(result, max_rssi):
    if(max_rssi == 0):
        return false
    else:
        return max_rssi > result.rssi
    

def filterByAddressType(devices):
    pass

def filterByConnectable(result):
    return result.connectable


    
