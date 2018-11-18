from selenium import webdriver

driver = webdriver.Chrome()

email = "totallynotasteambot@gmail.com"

driver.get("https://store.steampowered.com/join/")
driver.execute_script("""
document.getElementById("email").value = "{EMAIL}";
document.getElementById("reenter_email").value = "{EMAIL}";
document.getElementById("i_agree_check").checked = true;
""".replace("{EMAIL}", email))

