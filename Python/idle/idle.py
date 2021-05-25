import win32com.client as comclt
import time

a = comclt.Dispatch("WScript.Shell")

time.sleep(3)

while True:
    for key in ["w", "a", "s", "d"]:
        [a.SendKeys(key) for i in range(100)]
    time.sleep(5)
