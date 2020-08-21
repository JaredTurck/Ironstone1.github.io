import urllib.request, time
from selenium import webdriver

find = b'href="/raffles/'
driver = webdriver.Chrome()
website = "https://scrap.tf/raffles"
header = {"User-Agent" : "Mozilla/5.0"}
Leaving = '//button[@data-loading-text="Leaving..."]'
entered = []

def login():
    try:
        driver.find_element_by_xpath("//i18n[@rel='#not-logged-in']")
        driver.get("https://scrap.tf/login")
        while "https://scrap.tf/" not in driver.current_url:
            pass
    except:
        return None

def get_raffles(html=None, sleep_sec=0):
    if html == None:
        request = urllib.request.Request(website, headers = header)
        html = bytearray(urllib.request.urlopen(request).read())
    
    while find in html:
        index = html.index(find)
        raffle = (html[index+15 : index +21]).decode("utf-8")
        html[index : index+28] = b""

        if raffle not in entered:
            time.sleep(sleep_sec)
            try:
                enter_raffle(raffle)
                entered.append(raffle)
            except: # failed to enter raffle
                try: # has the raffle allready been entered
                    driver.find_element_by_xpath(leaving)
                    entered.append(raffle)
                except:
                    pass

    driver.get(website)
                

def enter_raffle(raffle):
    url = website + "/" + raffle
    driver.get(url) # open raffle
    driver.find_element_by_id("enter-button-outside") # raffle entered?
    driver.find_element_by_id("raffle-enter").click() # no, enter raffle

    time.sleep(5) # 5 seconds
    driver.find_element_by_xpath('//button[@data-loading-text="Leaving..."]')
    print("Entered raffle {0}!".format(raffle))

def get_html():
    driver.get(website)

    for i in range(3): # scroll
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)

    element = driver.find_element_by_id("pid-raffles")  # get html
    return bytearray(element.get_attribute("outerHTML"), encoding="utf-8")

driver.get(website)
login()
