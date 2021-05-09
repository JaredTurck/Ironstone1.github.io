import os, time

# start the program
os.popen('start "python_execute_code" safe_code.py')

# check if code still running
time.sleep(1)
if "python_execute_code" in os.popen('tasklist /V /FI "WindowTitle eq python_execute_code"').read():
    [os.popen('taskkill /FI "WindowTitle eq python_execute_code" /T /F') for i in range(5)]
    print("code ran longer then 5 seconds!")
else:
    print("code is safe!")

