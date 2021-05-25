from selenium import webdriver
import random, time

url = "https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount%3Fnc%3D1&dsh=S2130763045%3A1607279509151372&gmb=exp&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp"
count = 0

driver = webdriver.Chrome("chromedriver.exe")

# email


# google part
driver.get(url)

# form (screen 1)
fname = "jared"
lastn = "turck"
username = "jared.alt.4dc82aa87." + str(count)
password = "#KittensXOXO1234"

driver.execute_script('document.getElementById("firstName").value = "'+fname+'"')
driver.execute_script('document.getElementById("lastName").value = "'+lastn+'"')
driver.execute_script('document.getElementById("username").value = "'+username+'"')
driver.execute_script('document.querySelectorAll(\'[type="password"]\')[0].value ="'+password+'"')
driver.execute_script('document.querySelectorAll(\'[type="password"]\')[1].value ="'+password+'"')
driver.execute_script('document.querySelectorAll(\'button[jsaction^="click:"][class^="VfPpkd"][jsname][jscontroller]\')[1].click();')
time.sleep(2)
