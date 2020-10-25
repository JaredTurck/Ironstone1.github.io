from selenium import webdriver

driver = webdriver.Chrome()

driver.get("https://steamcommunity.com/id/JaredCat/friends/")
driver.execute_script("return "+open("fr_js.txt").read())
