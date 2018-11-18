import win32com.client, time

shell = win32com.client.Dispatch("WScript.Shell")

print("the auto presser will start in....")
for i in range(0,10):
    time.sleep(1)
    print(str(10-i)+"...")

while True:
    for i in range(10000):
        shell.SendKeys("{LEFT}")
        shell.SendKeys("{UP}")
        time.sleep(0.00001)

    for i in range(10000):
        shell.SendKeys("{RIGHT}")
        shell.SendKeys("{UP}")
        time.sleep(0.00001)
