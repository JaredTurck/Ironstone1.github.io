roundCount = 0
from selenium import webdriver
driver = webdriver.Chrome()
driver.get("https://scrap.tf/login")
input("login then press enter, to continue...")

while True:
    try:
        import urllib.request, os, time
        url = "https://scrap.tf/raffles"
        data = urllib.request.Request(url, headers={"User-Agent":"Magic Browser"})
        http = urllib.request.urlopen(data).read()

        found = []
        for i in range(5000):
            if b"""<a href="/raffles/""" in http:
                index = http.index(b"""<a href="/raffles/""")
                if http[index+18:index+18+8].isupper()==True:
                    found.append(http[index+18:index+18+6].decode("utf-8"))
                else:
                    print("Replacing!",http[index:index+18+6])
                http = http.replace(http[index:index+18+6], b"")
        print("Done!")
    except:
        print("failed to load webpage!")

    for raffle in found:
        try:
            driver.get("https://scrap.tf/raffles/"+raffle)
            driver.find_element_by_id("raffle-enter").click()
            time.sleep(10)
        except:
            print("Could not enter raffle 'https://scrap.tf/raffles/"+raffle+"'!")
    
    print(time.strftime("%H:%M:%S>>>"),"Round %s Compleate!" % (roundCount+1))

    roundCount += 1
