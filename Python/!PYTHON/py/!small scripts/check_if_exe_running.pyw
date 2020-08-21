import os, random, time

def shutdown(proc_name):
    if os.popen('tasklist /fi "IMAGENAME eq '+proc_name+'"').read().find("No tasks") == -1:
        time.sleep(random.randint(0,90))
        os.popen("taskkill /f /im "+proc_name)
    else:
        time.sleep(30)

while True:
    shutdown("RobloxPlayerBeta.exe")
