from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome("chromedriver.exe")
driver.get(
    "http://www.sporcle.com/games/vinocchiogr/extreme-space-bar-challenge")
driver.find_element_by_id("button-play").click()

for i in range(300):
    element = driver.find_element_by_id("gameinput")
    element.send_keys(" ")
    element.send_keys(Keys.RETURN)
