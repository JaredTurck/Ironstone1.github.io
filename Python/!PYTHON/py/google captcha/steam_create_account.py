from selenium import webdriver

driver = webdriver.Chrome("chromedriver.exe")

url = "https://store.steampowered.com/join/?&snr=1_60_4__62"
email = "jaredturck8@gmail.com"

driver.get(url)

driver.execute_script('document.getElementById(\'email\').value = "'+email+'";')
driver.execute_script('document.getElementById(\'reenter_email\').value = "'+email+'";')
driver.execute_script('document.getElementById(\'i_agree_check\').click();')
