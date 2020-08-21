from selenium import webdriver
import time

driver = webdriver.Chrome("chromedriver.exe")
profile_url = "https://steamcommunity.com/id/jaredcat"
friends = []

driver.get(profile_url)
last_page = int(driver.find_elements_by_xpath('//span[@class="commentthread_pagelink"]')[-1].text)

for page in range(last_page):
    try:
        driver.find_elements_by_xpath('//a[@class="pagebtn"]')[-1].click()
        time.sleep(1)
    
        current_list = driver.execute_script("return" + open("main_func.js", "r").read())
        time.sleep(0.5)
        for item in current_list:
            if item not in friends:
                friends.append(item)

        print("page "+str(page)+" done")
    except:
        print("Error in page "+str(page)+"!")
