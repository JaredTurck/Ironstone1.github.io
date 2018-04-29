import win32com.client, time

shell = win32com.client.Dispatch("WScript.Shell")
print("the auto clicker will start in....")
for i in range(0,10):time.sleep(1);print(str(10-i)+"...")

for i in range(100000):
    shell.SendKeys("q")
