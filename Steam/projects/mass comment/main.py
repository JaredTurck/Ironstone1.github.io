from selenium import webdriver
import pickle, os

url = "https://steamcommunity.com/id/jaredcat"

def cookies(c):
    if (c == "save"):
        driver.get("https://steamcommunity.com/login/home/")
        while (url not in driver.current_url.lower()): pass
        pickle.dump(driver.get_cookies(), open("cookies", "wb"))

    if (c == "load"):
        if os.path.isfile("cookies") == True:
            driver.get(url)
            for cookie in pickle.load(open("cookies","rb")):
                driver.add_cookie(cookie)
            driver.refresh()
        else:
            cookies("save")


driver = webdriver.Chrome("chromedriver.exe")
cookies("load")

for name in open("names.txt").read().split("\n"):
    try:
        driver.get(name)
        driver.execute_script(open("comment.js").read())
        print("commented on: " + name)

    except:
        print("failed to comment on: " + name)



driver.quit()
