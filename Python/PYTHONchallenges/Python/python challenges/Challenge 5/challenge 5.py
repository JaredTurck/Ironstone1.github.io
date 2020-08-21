import urllib.request, pickle
url = urllib.request.urlopen("http://www.pythonchallenge.com/pc/def/banner.p")
file = pickle.load(url)
for line in file:
    print("".join(I * II for I, II in line))
