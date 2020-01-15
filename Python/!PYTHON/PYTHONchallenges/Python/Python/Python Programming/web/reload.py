import os, time
def web(URL, number, Browser, refresh):
    input("Press enter to contine...")
    for i in range(number):
        os.system("start "+ Browser +" "+ URL)
        time.sleep(refresh)
    os.system("taskkill /IM "+ Browser +" /T")
