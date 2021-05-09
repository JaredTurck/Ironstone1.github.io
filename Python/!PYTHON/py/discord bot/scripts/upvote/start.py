from selenium import webdriver
import time

driver = webdriver.Chrome("chromedriver.exe")
password = input("password")

driver.get("https://discord.com/login")
time.sleep(1)
driver.execute_script('document.querySelectorAll(\'[name="email"]\')[0].value = "jaredturck8@gmail.com"')
time.sleep(1)
driver.execute_script('document.querySelectorAll(\'[name="password"]\')[0].value = "'+password+'"')
