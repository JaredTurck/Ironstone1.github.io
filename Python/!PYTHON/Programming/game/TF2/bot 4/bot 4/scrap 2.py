import urllib.request
from selenium import webdriver

def login():
    try:
        driver.find_element_by_xpath("//i18n[@rel='#not-logged-in']")
        driver.get("https://scrap.tf/login")
        while "https://scrap.tf/" not in driver.current_url:
            pass
    except:
        return None

driver = webdriver.Chrome()
website = "https://scrap.tf/raffles"
header = {"User-Agent" : "Mozilla/5.0"}


driver.get(website), login() # log into steam

while True:
    try:
        request = urllib.request.Request(website, headers = header)
        html = bytearray(urllib.request.urlopen(request).read())

        while elem in html:
            index = html.index(elem)
            raffle = (html[index+15 : index +21]).decode("utf-8")
            html[index : index+28] = b""

            if raffle.isupper() and raffle not in entered:
                url = website + "/" + raffle

                try:
                    driver.get(url)
                    driver.find_element_by_id("enter-button-outside")
                    driver.find_element_by_id("raffle-enter").click()
                    time.sleep(4)
                    driver.find_element_by_xpath("//button[@data-loading-text='Leaving...']")
                    entered.append(raffle)
                    print("Entered raffle {0}!".format(raffle))
                except:
                    pass
                time.sleep(1)
    except:
        pass

def get_raffles():
    find = b'href="/raffles'

    while True:
        request = urllib.request.Request(website, headers = header)
        html = bytearray(urllib.request.urlopen(request).read()) # get HTML

        for i in range(html.count(find)): # get hyperlinks
            index = html.index(find)
            raffle = (html[index+15 : index +21]).decode("utf-8")
            html[index : index+28] = b""

            url = website + "/" + raffle
            #try: # try to enter raffle
            driver.get(url) # open raffle
            driver.find_element_by_id("enter-button-outside") # raffle entered?
            driver.find_element_by_id("raffle-enter").click() # no, enter raffle

            time.sleep(5) # wait 5 seconds
            driver.find_element_by_xpath('//button[@data-loading-text="Leaving..."]')
            print("Entered raffle {0}!".format(raffle))

            #except: # failed to enter raffle
            #    continue
