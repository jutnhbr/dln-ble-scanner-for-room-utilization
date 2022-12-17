import time

def currentDate():
    now = time.localtime()
    date = "{}/{}/{}".format(now[1], now[2], now[0])
    return date

def currentTime():
    now = time.localtime()
    minutes = 0
    if now[4] < 10:
        minutes = "{}{}".format(0, now[4])
    else:
        minutes = now[4]
    c_time = "{}:{}".format(now[3], minutes)
    return c_time

def getTimestamp():
    date_and_time = currentDate() + " " + currentTime()
    return date_and_time