from selenium import webdriver
from urllib.request import urlretrieve
import urllib, time

driver = webdriver.Chrome("chromedriver.exe")

func1 = """(function() {
	elms = document.querySelectorAll('div[class="thumbnail-container"] [href^="https://gelbooru.com/index.php?page=post"]');
	posts = [];
	for (i=0;i<elms.length;i++) {
		posts.push(elms[i].getAttribute("href"));
	}
	return posts;
})();"""

def download_img(url, fname):
    req = urllib.request.Request(url, data=None, headers={
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    })

    response = urllib.request.urlopen(req).read()
    with open(fname, "wb") as file:
        file.write(response)

def login():
    driver.get("https://gelbooru.com/")
    input("Press enter once you logged in... ")


posts = []
count = 4173

login()
driver.get("https://gelbooru.com/index.php?page=post&s=list&tags=all&pid=4173")
for i in range(200):
    current_posts = driver.execute_script("return " + func1)
    for url in current_posts:
        if url not in posts:
            posts.append(url)

    driver.execute_script('document.querySelectorAll(\'[class="pagination"] [alt="next"]\')[0].click();')


# gets post
for i in range(len(posts)):
    driver.get(posts[i])

    # download
    try:
        current_img = driver.execute_script("return document.querySelectorAll('div[id=\"note-container\"]')[0].parentNode.querySelectorAll('img[src^=\"https://img2.gelbooru.com/\"]')[0].getAttribute('src')")
        download_img(current_img, str(count)+".jpg")
        print("["+str(count)+"] Download image!")
        count += 1
        time.sleep(0.1)
    except:
        print("["+str(count)+"] Failed to download image!")
