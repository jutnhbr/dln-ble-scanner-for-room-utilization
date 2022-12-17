from util import wifiManager
import upip


def installDependencies(dependencyName):
    wifiManager.connect()
    upip.install(dependencyName)