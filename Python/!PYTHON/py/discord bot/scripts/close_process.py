import os, subprocess, psutil, time, signal

# start the process, get pid
pid = subprocess.Popen(["python", "./safe_code.py"]).pid
time.sleep(1)

try:
    psutil.Process(pid)
    os.kill(pid, signal.SIGTERM)
    print("script ran for longer then 1 second!")

except:
    print("code is safe!")
