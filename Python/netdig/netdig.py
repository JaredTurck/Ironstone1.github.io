import os

def ping_google():
    if "Lost = 0 (0% loss)" in os.popen("ping google.com").read():
        return True
    else:
        return False
