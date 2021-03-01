import requests, json

API_key = "AIzaSyDlWqALrqu7ZHFaO-OKliElkFN5SRXdOdI"
url = "https://safebrowsing.googleapis.com/v4/threatMatches:find"

phishing_link = input("> ")

body =  {
    "client": {"clientId": "JaredBot", "clientVersion": "1.0.0"},
    "threatInfo": {"threatTypes": ["SOCIAL_ENGINEERING", "MALWARE"],
                   "platformTypes":    ["ANY_PLATFORM"],
                   "threatEntryTypes": ["URL"],
                   "threatEntries": [{"url": phishing_link}]}}

r = requests.post(url, params={"key" : API_key}, json=body)

print(r)
print(r.json())
