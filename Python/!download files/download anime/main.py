from selenium import webdriver
import time, urllib

driver = webdriver.Chrome("chromedriver.exe")
scroll_count = 50
file_counter = 0

driver.get("https://www.pinterest.co.uk/raiceto75/cute-anime-pictures/")


for i in range(scroll_count):
    driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
    time.sleep(1)

urls = driver.execute_script("return" + open("main.js", "r").read())

driver.quit()

for url in urls:
    try:
        urllib.request.urlretrieve(url, str(file_counter)+".jpg")
        print("File downloaded!")
        file_counter += 1
    except:
        print("Failed to get URL:", url[0])
