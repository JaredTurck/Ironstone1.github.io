import selenium.webdriver, time

#open website
driver = selenium.webdriver.Chrome("chromedriver.exe")
driver.get("https://academy.globalteach.com/st")

#get username and password
def validate(text):
    input1 = input(text)
    while input1 == "":
        input1 = input("Error. Must be at least 1 character(s) long.\n"+text)
    return input1

#login
driver.find_element_by_id("ctl00_plhContentRight_txtUsername").send_keys(validate("Enter Username: "))
driver.find_element_by_id("ctl00_plhContentRight_txtPassword").send_keys(validate("Enter Password: "))
driver.find_element_by_id("ctl00_plhContentRight_btnLogin").click()

#open administration ui 
administration_ui = driver.find_element_by_id("tabAui").click()

#questions tab has to be opened manually due to the id, xpath or css of the questions button is invalid
while "academy.globalteach.com/Twi.Gt.Aui/default.aspx" not in driver.current_url: pass
