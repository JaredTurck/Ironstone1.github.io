from selenium import webdriver

driver = webdriver.Chrome("chromedriver.exe")
driver.get("https://scrap.tf/login")
input("Continue...")

driver.get("https://scrap.tf/raffles")
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
