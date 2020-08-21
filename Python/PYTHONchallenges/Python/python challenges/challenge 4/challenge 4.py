import urllib.request
number, html, counter = str(), str(), 0
while not ".html" in html:
    counter = counter + 1
    url = ("http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing="+number)
    html = (urllib.request.urlopen(url).read()).decode("utf-8")
    number = str()
    for i in range(len(html)):
        try:
            number = number + str(int(html[i]))
        except:
            pass
    print(str(counter)+".",html)
        
