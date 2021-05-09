import urllib.request

url = "https://www.ultratools.com/tools/geoIpResult?&ipAddress=216.58.205.46"
html = urllib.request.urlopen(url).read()

with open("stdout.html", "wb") as file:
    file.write(html)
