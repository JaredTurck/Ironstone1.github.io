from multiprocessing import Process
import time

def func1():
    time.sleep(1)
    print("1")

def func2():
    time.sleep(2)
    print("2")

def func3():
    time.sleep(3)
    print("3")

def func4():
    time.sleep(4)
    print("4")

def func5():
    time.sleep(5)
    print("5")



if __name__ == "__main__":
    p1 = Process(target=func1)
    p2 = Process(target=func2)
    p3 = Process(target=func3)
    p4 = Process(target=func4)
    p5 = Process(target=func5)

    p1.start()
    p2.start()
    p3.start()
    p4.start()
    p5.start()
