from selenium import webdriver

script1 = """(function() {
	elms = document.querySelectorAll('[class="container-fluid"] li a[href^="/"]');
	urls = [];
	for (i=0;i<elms.length;i++) {
		urls.push("https://nnfs.io/" + elms[i].getAttribute('href').replace('/', ''));
	}
	return urls;
})();"""

driver = webdriver.Chrome("chromedriver.exe")
driver.get("https://nnfs.io/neural_network_animations")

urls = driver.execute_script('return ' + script1)

yt_urls = []

for url in urls:
    driver.get(url)
    yt_urls.append(driver.execute_script('return document.querySelectorAll(\'[href^="https://www.youtube.com/watch?v="]\')[0].getAttribute("href")'))
