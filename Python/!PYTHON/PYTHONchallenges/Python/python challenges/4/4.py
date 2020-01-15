import urllib.request
response = urllib.request.urlopen(
        "http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing=12345")
while True:
    try:
        page = False
        html = (response.read()).decode("UTF-8")
        digit = str()
        for I in range(len(html)):
            if html[I].isdigit()==True:
                digit = digit + html[I]
            else:
                page = True
        if page == True:
            print(html)
        else:
            print(digit)
        response = urllib.request.urlopen(
            "http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing="+digit)
    except:
        print("error! HTML page not responding!")

