from util import timeFormat

class scan:
    def __init__(self, scan_results):
        self.scan_results = scan_results
        self.timestamp = timeFormat.getTimestamp()