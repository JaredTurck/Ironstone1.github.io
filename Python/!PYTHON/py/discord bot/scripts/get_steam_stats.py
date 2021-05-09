from urllib.request import urlopen

data = {}
url = "https://steamcommunity.com/id/conaxian/"
html = urlopen(url + "?xml=1").read().decode("utf-8")
tags = ['steamID64', 'steamID', 'customURL', 'onlineState', 'privacyState', 'visibilityState',
        'vacBanned', 'tradeBanState', 'isLimitedAccount', 'memberSince', 'location', 'realname', 'summary']

replaces = ["<![CDATA[", "]]</", "</", "]]/", "]]", "<", ">"]
for item in replaces:
    html = html.replace(item, "")

for tag in tags:
    try:
        data[tag] = html.split(tag)[1].split(tag)[0]
    except:
        print("failed to add tag! " + tag)

# cleanup data
data["vacBanned"] = ["No", "Yes"][int(data["vacBanned"])]
data["visibilityState"] = ["Private", "Friend's Only", "Public"][int(data["visibilityState"])-1]
data["isLimitedAccount"] = ["No", "Yes"][int(data["isLimitedAccount"])]

file = open("steam_data_output.txt", "w")
for key in data.keys():
    file.write(key + ": " + data[key] + "\n")

file.close()

# inventory value
# no. games
# amount worth
