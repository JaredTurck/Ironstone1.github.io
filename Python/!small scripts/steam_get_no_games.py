from urllib.request import urlopen

url = "http://api.steampowered.com/ISteamApps/GetAppList/v2"

file = urlopen(url).read()
