from selenium import webdriver
from urllib.request import urlretrieve
import time, random, requests

driver = webdriver.Chrome("chromedriver.exe")
driver.get("https://www.sex.com/gifs/")

head = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/gif,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    "Dnt": "1",
    "Host": "cdn.sex.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    "X-Amzn-Trace-Id": "Root=1-5ee7bae0-82260c065baf5ad7f0b3a3e3"
}

user_agent_list = [
    'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
    'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
    'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
]

def write_data(r):
    if b"403 Forbidden" in r:
        return False;
    else:
        with open("content.gif", "wb") as file:
            file.write(r);


urls = []
file_count = 0

func1 = """(function() {
	elms = document.querySelectorAll('[class="image lazy-loaded"]');
	output = [];
	for (i=0;i<elms.length;i++) {
		output.push(elms[i].getAttribute("src"));
	}
	return output
})();"""

time.sleep(2)
for i in range(1, 2):
    driver.get("https://www.sex.com/gifs/?page="+str(i))
    for ii in range(1200):
        current_urls = driver.execute_script("return " + func1)
        time.sleep(0.01)
        for iii in current_urls:
            if iii not in urls:
                urls.append(iii)

    time.sleep(1)
    input("next page...")

for url in urls:
    try:
        # random user agent
        head["User-Agent"] = user_agent_list[random.randint(0, len(user_agent_list)-1)]

        # request data
        r = requests.get(urls[0], headers=head)

        # write data to file
        o = write_data(r.content)

        if o == True:
            print("["+str(file_count)+"] downloaded gif!")
        else:
            print("["+str(file_count)+"] failed to download gif!")
        file_count += 1
    except:
        print("failed to download!")
    
