import time, subprocess, os

no_bots = 2

for i in range(no_bots):
    time.sleep(0.5)
    path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "add_bot.py")
    subprocess.Popen('cd '+path+' && start')
