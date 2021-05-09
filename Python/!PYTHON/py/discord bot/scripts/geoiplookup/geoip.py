import requests, json

ip = "216.58.205.46"
url = "https://www.ultratools.com/tools/geoIpResult"

headers =  {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,ru;q=0.7",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "Content-Length": "24",
    "Content-Type": "application/x-www-form-urlencoded",
    "DNT": "1",
    "Host": "www.ultratools.com",
    "Origin": "https://www.ultratools.com",
    "Referer": "https://www.ultratools.com/tools/geoIpResult",
    "sec-ch-ua": '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
    "sec-ch-ua-mobile": "?0",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
}

payload = {
    "ipAddress": "209.173.53.167"
}

session = requests.Session()
session.post(url, headers=headers, data=payload)
data = session.get(url)

print(data)

with open("stdout.html", "wb") as file:
    file.write(data.text.encode("utf-8"))
