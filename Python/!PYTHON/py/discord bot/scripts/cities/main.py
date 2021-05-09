from selenium import webdriver
from PIL import Image
from io import BytesIO
import urllib, time

url = "https://www.google.com/maps/place/"

def get_data(fname="major_cities.csv"):
    data = open(fname, "r", encoding="utf-8").read().split("\n")
    output = []
    for i in data:
        c = i.split(',')
        if len(c) == 4:
            output.append(c)
    return output[1:]

def remove_html_elms(driver):
    try:
        driver.execute_script('document.querySelectorAll(\'[id="pane"] [class="widget-pane-toggle-button noprint"]\')[0].click();')
        driver.execute_script('document.querySelectorAll(\'[id="gb"]\')[0].remove();')
        driver.execute_script('document.querySelectorAll(\'[id="minimap"]\')[0].remove();')
        driver.execute_script('document.querySelectorAll(\'[class="app-vertical-widget-holder noprint"]\')[0].remove();')
        driver.execute_script('document.querySelectorAll(\'[id="runway-expand-button"]\')[0].remove();')
        driver.execute_script('document.querySelectorAll(\'[id="pane"] [class="widget-pane-toggle-button-container"]\')[0].remove();')
        time.sleep(1)
    except:
        print("[-] Failed to remove HTML elements!")

data = get_data()
dupes = len(data) - len(set([i[0] for i in data]))
print(f'number of cities: {len(data)}!')
print(f"duplicate names: {dupes}")

driver = webdriver.Chrome("chromedriver.exe")
driver.get(url + "London")
input("Please maximise the window then press enter to continue...")

for city in data:
    try:
        # file name
        fname = ",".join(city[:3])
        
        # get URL
        current_url = url + urllib.parse.quote(fname)

        # open google maps page
        driver.get(current_url)

        # remove HTML elements
        time.sleep(1)
        remove_html_elms(driver)

        # take screenshot
        raw = driver.get_screenshot_as_png()

        # convert raw bytes to image object
        img = Image.open(BytesIO(raw))

        # save image
        img.save(fname + ".png")

        # sleep
        time.sleep(0.1)
        print("Took screenshot of " + fname + "!")
    except Exception as error:
        print("[-] Failed to capture city! " + str(error))
