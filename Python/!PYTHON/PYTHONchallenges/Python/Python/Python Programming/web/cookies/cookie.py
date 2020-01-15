import pickle, time
from selenium import webdriver

try:
    driver = webdriver.Chrome("chromedriver.exe")
    driver.get("https://google.co.uk")

    for cookie in pickle.load(open("cookie.pkl", "rb")):
        driver.add_cookie(cookie)
    driver.get("https://google.co.uk")
except:
    driver.get("https://google.co.uk")
    input("Press enter once you have logined in!")
    pickle.dump(driver.get_cookies(), open("cookie.pkl","wb"))
