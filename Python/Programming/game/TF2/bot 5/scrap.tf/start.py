from selenium import webdriver
import pickle, time

user = "Ironstone1_"
pasw = "Enter password (G*****1234): "
url = "steamcommunity.com"

def login():
    print("logging into '" + url + "'!")
    try:
        # LOAD COOKIES
        driver.get("https://"+ url +"/login")
        for cookie in pickle.load(open(url+".txt", "rb")): driver.add_cookie(cookie)

        driver.refresh()
        driver.find_element_by_xpath('//*[@id="account_pulldown"]')

    except:
        # LOGIN INTO STEAM COMMUNITY
        driver.find_element_by_xpath('//input[@name="username"]').send_keys(user)
        driver.find_element_by_xpath('//input[@name="password"]').send_keys(pasw)
        driver.find_element_by_xpath('//div[@id="login_btn_signin"]//*').click()

        while url+"/login" in driver.current_url:
            time.sleep(1)

        driver.get("https://" +url)
        pickle.dump(driver.get_cookies(), open(url+".txt", "wb"))

    driver.get("https://scrap.tf/login")
    driver.find_element_by_xpath('//input[@id="imageLogin"]').click()
    while 'steamcommunity.com/openid/login' in driver.current_url: time.sleep(1)

def scroll():
    elem = '//div[@class="panel-body pag-done pag-loading"]'
    
    driver.get("https://scrap.tf/raffles")
    while driver.find_element_by_xpath(elem).text != "That's all, no more!":
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)

def enter_raffles():
    Raffles = []
    scroll()

    link = 'a[href*="/raffles/"]'
    elem = '//i18n[@rel="%entered-raffles"]//var'
    total = int(driver.find_element_by_xpath(elem).text.split("/")[1])
    
    for i in range(total):
        panel = '//div[@class="panel-raffle"]['+str(i+1)+']'
        panel = driver.find_element_by_xpath(panel)
        href = panel.find_element_by_css_selector(link).get_attribute("href")
        
        if panel.get_attribute("style") != 'opacity: 0.6;':
            Raffles.append(href)

    for raffle in Raffles: #enter raffles
        try:
            driver.get(raffle)
            button = driver.find_element_by_id("raffle-enter")

            if button.text == 'Enter Raffle':
                button.click(), time.sleep(2.5)
                print("entered raffle '" + raffle + "'!")

        except:
            print("failed to enter raffle '" + raffle + "'!")

def start():
    print("entering raffles...")
    enter_raffles()
    driver.get("https://scrap.tf/raffles")

    print(time.strftime("[+] Raffles Check: %e %B %H:%M"))
    print(driver.find_element_by_xpath('//i18n[@rel="%entered-raffles"]').text)

print(open("start_banner.txt", encoding="utf-8").read()[1:]) # display banner
print("loading webdriver...")
driver = webdriver.Chrome()

login()

while True:
    try:
        start()
        time.sleep(300)
    except:
        time.sleep(120)
