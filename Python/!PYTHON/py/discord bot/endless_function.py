import threading, time

def endless():
    while True:
        pass

p = threading.process(target=endless, name="endless")
p.start()

time.sleep(5)
if p.is_alive():
    p.terminate()
    p.join()
