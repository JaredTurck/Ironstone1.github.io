from urllib.request import urlopen

url = "https://steamcommunity.com/id/jaredcat"
html = urlopen(url + "?xml=1").read()
