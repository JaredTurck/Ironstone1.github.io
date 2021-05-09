import urllib, urllib.request

url = "https://img2.gelbooru.com/samples/5d/22/sample_5d22c12b63377c308ecfc09dbc6ddfd5.jpg"
req = urllib.request.Request(url, data=None, headers={
    "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
})

response = urllib.request.urlopen(req).read()
with open("file_1.png", "wb") as file:
    file.write(response)
