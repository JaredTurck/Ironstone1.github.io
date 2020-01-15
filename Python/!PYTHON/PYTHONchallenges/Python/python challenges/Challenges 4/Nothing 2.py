import urllib.request
def Nothing(nothing):
    while nothing != "":
        url = "http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing="+nothing
        html = ((urllib.request.urlopen(url).read()).decode("utf-8"))
        nothing = ""
        for i in range(len(html)):
            if html[i].isdigit()==True:
                nothing = nothing + html[i]
        print(html)
        if nothing == "8268363579":
            nothing = "63579"
round1 = Nothing("12345")
round2 = Nothing("8022")
