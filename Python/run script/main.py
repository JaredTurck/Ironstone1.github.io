import os, subprocess, traceback

try:
    output = eval(open("run2.py", "r").read())
    
except Exception as err:
    output = traceback.format_exc()

print(output)
