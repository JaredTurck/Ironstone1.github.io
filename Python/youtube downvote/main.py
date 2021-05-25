from selenium import webdriver
import time

script_1 = """function get_videos() {
	var a = document.querySelectorAll('[id="video-title"]');
	var videos = [];
	for (i=0;i<a.length;i++) {
		current = a[i].getAttribute('href');
		if (current != null) {
			videos.push(current);
		}
	}
	return videos;
}get_videos();"""

url = "https://www.youtube.com/channel/UCaiL2GDNpLYH6Wokkk1VNcg/videos"

password = input("Password: ")

driver = webdriver.Chrome("chromedriver.exe")
driver.get("https://accounts.google.com/")

time.sleep(1)
driver.execute_script("document.querySelectorAll('[type=\"email\"]')[0].value = 'jaredturck9@gmail.com';")
driver.execute_script("document.querySelectorAll('[id=\"identifierNext\"] button')[0].click();")
time.sleep(2)
driver.execute_script("document.querySelectorAll('[type=\"password\"]')[0].value = '" + password + "';")
driver.execute_script("document.querySelectorAll('[id=\"passwordNext\"] button')[0].click();")

input("Please sign in then press enter to continue...")

driver.get(url)
videos = driver.execute_script("return " + script_1)

