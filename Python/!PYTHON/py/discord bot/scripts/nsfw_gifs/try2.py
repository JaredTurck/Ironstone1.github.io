from selenium import webdriver
import win32api, win32con, time

driver = webdriver.Chrome("chromedriver.exe")

def right_click(x,y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTUP,x,y,0,0)

def left_click(x,y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

get_urls = """(function () {
	elms = document.querySelectorAll('[id="boximg"] img[src^="https://cdn.porngifs.com"]')
	urls = [];
	for (i=0;i<elms.length;i++) {
		urls.push(elms[i].getAttribute('src'))
	}
	return urls;
})();"""

def save_dialog():
    right_click(500, 500)
    time.sleep(0.2)
    left_click(540, 530)
    time.sleep(0.5)
    left_click(800, 515)
    time.sleep(2)
    print("[+] downloaded image!")

urls = []

#driver.get("https://porngifs.com/")
#for i in range(500):
#    time.sleep(0.2)
#    urls.extend(driver.execute_script("return " + get_urls))
#    time.sleep(0.2)
#    driver.execute_script("window.scrollTo(0,"+str(i*200)+");")

#url_set = set(urls)
#for url in url_set:
#    driver.get(url)
#    save_dialog()

# last photo downloaded 1000

url = "https://cdn.porngifs.com/img/"

for i in range(1,1000):
    driver.get(url + str(i))
    save_dialog()
