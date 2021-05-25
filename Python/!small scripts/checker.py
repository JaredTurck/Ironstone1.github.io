import requests
import json

url = "https://safebrowsing.googleapis.com/v4/threatMatches:find"
payload = {'client': {'clientId': "mycompany", 'clientVersion': "0.1"},
        'threatInfo': {'threatTypes': ["SOCIAL_ENGINEERING", "MALWARE"],
                       'platformTypes': ["ANY_PLATFORM"],
                       'threatEntryTypes': ["URL"],
                       'threatEntries': [{'url': "http://www.urltocheck1.org"}]}}
params = {'key': api_key}
r = requests.post(url, params=params, json=payload)
# Print response
print(r) 
print(r.json())
