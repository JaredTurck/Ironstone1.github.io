import selenium, random, time
from selenium import webdriver
from urllib.request import urlretrieve

driver = webdriver.Chrome("chromedriver.exe")

cat_memes = []

file_count = int(input("File Count: "))
source = input("Enter Source: ")

def get_meme(file_count):
    # get meme
    if source.replace("https://","").replace("http://","") not in driver.current_url:
        driver.get(source)

    #scroll to bottom of page
    driver.execute_script("for (i=0;i<1;i++) {setTimeout(function(){window.scrollTo(0,document.body.scrollHeight);},100*i,i)}")
    time.sleep(1)

    # pick a random cat meme
    js_selector = """(function() {
    elms = document.querySelectorAll('img[alt="Post image"][src^="https://preview.redd.it/"]');
	urls = [];
	for (i=0;i<elms.length;i++) {
		urls.push(elms[i].getAttribute("src"));
	}
    return urls;})();"""
    
    urls = driver.execute_script("return " + js_selector)

    # download meme
    for url in urls:
        if url not in cat_memes:
            urlretrieve(url, "heli_"+str(file_count)+".png")
            print("["+str(len(cat_memes))+"]downloaded cat meme! ")
            file_count += 1
            cat_memes.append(url)
            time.sleep(0.02)
        else:
            pass

    # append url to cat meme
    return file_count

while True:
    file_count = get_meme(file_count);
    time.sleep(0.5)
