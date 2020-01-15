# Import necessary modules
from selenium import webdriver
import urllib.request, time, codecs, pickle

# Define initial variables and print banner
RaffleCount = 0
Compleate = 0
tm = time.strftime
input(codecs.open("banner.txt","r","utf-8").read() %(tm("%H:%M:%S")))

try:
    # Load drivers and cookies
    driver = webdriver.Chrome("chromedriver.exe")
    driver.get("https://scrap.tf")

    for cookie in pickle.load(open("cookies.pkl", "rb")):
        driver.add_cookie(cookie)
    driver.get("https://scrap.tf")
    input("Enter to continue...")

except:
    # If no cookies found, user must manually login
    driver.get("https://scrap.tf/login")
    print("%s [CONSOLE]: FAILED to load cookies! please manually login!"%(tm("%H:%M:%S")))

    input("Login to scrap.tf first, then press enter to continue...")
    #pickle.dump(driver.get_cookies(), open("cookies.pkl","wb"))

while True:
    try:        
        # obtain raffle HTML page
        url = "https://scrap.tf/raffles"
        request = urllib.request.Request(url, headers={"User-Agent":"Magic Browser"})
        HTML = urllib.request.urlopen(request).read()

        # Iterate through HTML and find link for each raffle
        found = []
        for i in range(100):
            if b'<a href="/raffles/' in HTML:
                index = HTML.index(b'<a href="/raffles/')
                if HTML[index+18 : index+18+8].isupper()==True:
                    found.append(HTML[index+18 : index+18+6].decode("utf-8"))
                HTML = HTML.replace(HTML[index:index+18+6], b"")
    except:
        # Displays error message, if HTML failed to load
        print("%s [CONSOLE]: failed to obtain HTML page!" %(tm("%H:%M:%S")))
        print("%s [CONSOLE]: check your internet connection!" %(tm("%H:%M:%S")))
        time.sleep(60)
        found = ""

    for raffle in found:
        try:
            # Load and enter raffle, for each raffle found
            driver.get("https://scrap.tf/raffles/"+raffle)
            element = driver.find_element_by_id("raffle-enter")
            if element.get_attribute("data-loading-text") == 'Entering...':
                element.click()
                Compleate += 1
                time.sleep(8)
            else:
                # Check for raffles that have allready been entered
                RaffleCount += 1
                if RaffleCount >= 50:
                    RaffleCount = 0

                    # Display error message, if all the raffles have been entered
                    print("%s [CONSOLE]: Successfully entered %s Raffles!\n"%(tm("%H:%M:%S"),Compleate)+\
                          "%s [CONSOLE]: Script paused for 10 minutes!" % (tm("%H:%M:%S")))
                    time.sleep(600)
        except:
            print("%s [CONSOLE]: Failed to enter raffle '%s'"%(tm("%H:%M:%S"),raffle))

