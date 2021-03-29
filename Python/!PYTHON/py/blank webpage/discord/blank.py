from selenium import webdriver
import getpass, time

driver = webdriver.Chrome('chromedriver.exe')
driver.get('https://discord.com/login')

email = "jaredturck9@gmail.com"
password = getpass.getpass("Enter password: ")

driver.execute_script("document.querySelectorAll('[name=\"email\"]')[0].value = '" +email+ "'")
driver.execute_script("document.querySelectorAll('[type=\"password\"]')[0].value = '" +password+ "'")
time.sleep(1)
driver.execute_script("document.querySelectorAll('[type=\"submit\"]')[0].click();")
