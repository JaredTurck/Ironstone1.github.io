from selenium import webdriver
import pickle

file = "SteamCommunityLogin.txt"
entered = []

def login():
    def login_button():
        driver.get("http://tf2r.com/login")
        driver.find_element_by_id("imageLogin").click()
        print("logging into tf2r.com...")

    try:
        print("loading cookies...")
        driver.get("https://steamcommunity.com/")
        [driver.add_cookie(i) for i in pickle.load(open(file, "rb"))]
        driver.refresh()
        login_button()
    except:
        print("failed to load cookies...")
        input("Please manulay login, then press enter to continue...")
        driver.get("https://steamcommunity.com/")
        pickle.dump(driver.get_cookies(), open(file, "wb"))
        login_button()

def enter_raffle(raffle):
    if raffle not in entered:
        try:
            driver.get(raffle)
            driver.find_element_by_xpath('//input[@id="enbut" and @value="Enter!"]').click()
            entered.append(raffle)
            print("entered raffle '"+raffle+"'")
        except:
            entered.append(raffle)

def start():
    raffles = []
    driver.get("http://tf2r.com/raffles.html")
    raffles_element = driver.find_element_by_xpath('//div[@class="participants"]')

    for i in [str(i) for i in range(1,50)]:
        try:
            elem = raffles_element.find_element_by_xpath('//div[@class="pubrhead"]['+i+']')
            elem = elem.find_element_by_xpath('//div[@class="pubrhead-text-right"]')
            
            a = elem.find_element_by_css_selector('a[href*="http://tf2r.com/"]')
            raffles.append(a.get_attribute("href"))
        except:
            break

    for raffle in raffles:
        enter_raffle(raffle)

driver = webdriver.Chrome()
login()
start()
