import urllib.request, pickle
file = pickle.load(urllib.request.urlopen(
    "http://www.pythonchallenge.com/pc/def/banner.p"))
[print("".join(ii[0]*ii[1] for ii in line)) for line in file]
