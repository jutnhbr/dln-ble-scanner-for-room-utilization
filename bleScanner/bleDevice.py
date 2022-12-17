class bleDevice:
    def __init__(self, result_rssi, result, result_name, connectable):
        self.result = result
        self.result_name = result_name
        self.result_rssi = result_rssi
        self.connectable = connectable