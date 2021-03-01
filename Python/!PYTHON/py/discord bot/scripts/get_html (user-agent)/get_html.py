import requests, json, os

user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:38.0) Gecko/20100101 Firefox/38.0"

head =  {
    "User-Agent": user_agent,
}

def process():
    url = input("url: ")
    if "http" not in url:
        url = "https://" + url
    
    req = requests.get(url, headers=head)
    html = req.content
    print(req.status_code)

    with open("output.html", "wb") as file:
        file.write(html)

os.popen('explorer.exe "' + os.path.dirname(os.path.realpath(__file__)) + '"')

while True:
    process()
