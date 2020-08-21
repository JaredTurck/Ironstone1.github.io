import threading, time

def f1():
    time.sleep(5)
    print("F1")

def f2():
    time.sleep(5)
    print("F2")

threading.Thread(target = f1).start()
threading.Thread(target = f2).start()
