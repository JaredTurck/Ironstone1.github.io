import urllib, selenium, os
from selenium import webdriver
from urllib import request

search_q = input("Type in the name of a person to download images from Google of them.\nMake sure to spell the name correctly\nGoogle> ")
url = "https://www.google.com/search?tbm=isch&q=" + search_q
count = 0

#urllib.request.urlretrieve("{IMG_URL.jpg}", "{FILENAME}.jpg")
#url = "https://www.google.com/search?tbm=isch&q=Donald+Trump"
#Donald Trump

driver = webdriver.Chrome()
driver.get(url)

if not os.path.exists(search_q):
    os.makedirs(search_q)

for image in driver.find_elements_by_xpath('//div[@id="rg"]//a[@jsname="hSRGPd"]'):
    try:
        img_url = image.get_attribute("href")
        with open(search_q + "/" + str(count)+".jpg", "wb") as file:
            file.write(request.get(img_url, stream=True))

        count += 1

    except:
        print("failed to get image!", str(image))
    


#//div[@jsname="BN6WQc"]//div//div//div//div//div//div//div//div
