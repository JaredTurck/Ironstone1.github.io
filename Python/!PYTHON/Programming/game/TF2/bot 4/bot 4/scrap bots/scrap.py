import urllib.request, time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


# <=================initial variable assignment=================>
website = "https://scrap.tf/raffles"
find = b'href="/raffles/'
header = {"User-Agent" : "Mozilla/5.0"}
Leaving = '//button[@data-loading-text="Leaving..."]'
entered = []


# <=========scrap.tf functions, enter raffles, get html=========>
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

def withdraw_items():
    driver.get("https://scrap.tf/raffles")

    # find withdraw button
    withdraw_text = '//button[@class="btn btn-embossed btn-info"]'
    withdraw_button = driver.find_element_by_xpath(withdraw_text)
    assert withdraw_button.text == 'Withdraw Items'
    withdraw_button.click()

    def queue():
        try:
            driver.find_element_by_id("queue-bot-name")
            return True
        except:
            return False

    def wait_in_queue():
        while queue():
            try:
                text = '//button[@class="btn btn-embossed btn-primary btn-hg btn-offer-go"]'
                driver.find_element_by_xpath(text).click()
                return True
            except:
                time.sleep(1)
        raise RuntimeError("user left the queue!")

    def trade_window():
        for i in driver.window_handles:
            try:
                driver.switch_to.window(i)
                driver.execute_script("ToggleReady( true );")
            except:
                time.sleep(1)
        raise RuntimeError("failed to find trade window!")

    wait_in_queue() # trade offer ready?
    trade_window() # found trade window
    
    # accept trade offer as gift
    gift_text = '//div[@class="btn_green_white_innerfade btn_medium"]'
    driver.find_element_by_xpath(gift_text).click()

    # conform trade offer
    driver.execute_script('ConfirmTradeOffer();')


# <===============Steam login and Authentication===============>
def manual_login():
    try:
        driver.get("https://scrap.tf/raffles")
        driver.find_element_by_xpath("//i18n[@rel='#not-logged-in']")
        driver.get("https://scrap.tf/login")
        while "https://scrap.tf/" not in driver.current_url:
            pass
    except:
        return None    

def email_authenticate(): # get steam guard code
    emailDriver.get("https://mail.google.com/mail/")
    Try('driver.find_element_by_id(":37").click()', emailDriver)

    span = 'font-size:24px;color:#66c0f4;font-family:Arial,Helvetica,sans-serif;font-weight:bold'
    return Try("driver.find_element_by_xpath(\'//span[@style=\""+span+"\"]\').text", emailDriver)
    
def email_login(login): # log into email
    emailDriver = webdriver.Chrome()
    emailDriver.get("https://accounts.google.com/")

    email = emailDriver.find_element_by_id("Email")
    email.send_keys(login[0])
    emailDriver.find_element_by_id("next").click()
    time.sleep(1)

    pasw = emailDriver.find_element_by_id("Passwd")
    pasw.send_keys(login[1])
    emailDriver.find_element_by_id("signIn").click()
    emailDriver.get("https://mail.google.com/mail/")

    return emailDriver

def automatic_login(SteamLogin):
    driver.get("https://scrap.tf/login")
    user = driver.find_element_by_id("steamAccountName").send_keys(SteamLogin[0])
    pasw = driver.find_element_by_id("steamPassword").send_keys(SteamLogin[1])
    driver.find_element_by_id("imageLogin").click()
    time.sleep(4)

    code = email_authenticate()

    submit = driver.find_element_by_id("authcode")
    submit.clear()
    submit.send_keys(code + Keys.ENTER)
    time.sleep(4)
    driver.find_element_by_id("success_continue_btn").click()

def bots_login(N):
    file = open("bots.txt").readlines()
    return [file[N][:-1].split(",")[1:], len(file)]

# <================Validation and error handling================>
def Try(code, driver, Sleep = 1, MaxTry = 20):
    for i in range(MaxTry):
        try:
            return eval(code)
        except:
            time.sleep(Sleep)
        return eval(code)

def TryExcept(code):
    try:
        return eval(code)
    except:
        pass

# <==========================MAIN CODE==========================>
emailDriver = email_login(open("email.txt").read().split(","))
bots = {}

for b in range(bots_login(0)[1]):
    login = bots_login(b)[0]
    bots[login[0]] = webdriver.Chrome()

    driver = bots[login[0]]
    automatic_login(login)

    TryExcept("withdraw_items()")
    TryExcept("get_raffles(html = get_html())")
