import urllib.request, os, time
url = "https://scrap.tf/raffles"
data = urllib.request.Request(url, headers={"User-Agent":"Magic Browser"})
http = urllib.request.urlopen(data).read()

found = []
for i in range(5000):
    if b"""<a href="/raffles/""" in http:
        index = http.index(b"""<a href="/raffles/""")
        if http[index+18:index+18+8].isupper()==True:
            found.append(http[index+18:index+18+6].decode("utf-8"))
        else:
            print("Replacing!",http[index:index+18+6])
        http = http.replace(http[index:index+18+6], b"")
print("Done!")
for i in range(len(found)):
    os.system("start chrome https://scrap.tf/raffles/"+found[i])
