import requests, json, os

user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:38.0) Gecko/20100101 Firefox/38.0"

head =  {
    "User-Agent": user_agent,
}


# get html
text = input("Text: ").replace(' ', '+')
url = f"https://www.google.co.uk/search?q='{text}'"

req = requests.get(url, headers=head)
html = req.content
print(req.status_code)

with open("a.html", "wb") as file:
    file.write(html)

# filter html
parts = html.split(b'https://')
urls = []
for part in parts:
    current_url = part.split(b'"')[0].split(b"'")[0].decode("UTF-8")
    print(current_url)
    if "google" not in current_url:
        if "." not in current_url.split('/')[-1]:
            if "<" not in current_url:
                urls.append(current_url)
