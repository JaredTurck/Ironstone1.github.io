from selenium import webdriver

opt = webdriver.chrome.options.Options()
opt.add_argument("--headless")
opt.add_argument("--disable-gpu")
driver = webdriver.Chrome(chrome_options=opt);
driver.get("https://steamcommunity.com/")
print(driver.execute_script("return document.getElementById(\"global_header\").innerText"))
