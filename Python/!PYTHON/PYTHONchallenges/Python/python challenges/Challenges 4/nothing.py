import urllib.request
StartValue = "12345"
def NothingFunction(nothing, Divide):
    counter, NothingList = 0, []
    while nothing != "":
        try:
            if Divide == True:
                nothing = str(int(int(nothing) / 2))
            url = "http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing="+nothing
            html = ((urllib.request.urlopen(url).read()).decode("utf-8"))
            nothing = ""
            for i in range(len(html)):
                if html[i].isdigit()==True:
                    nothing = nothing + html[i]
            counter += 1
            print(str(counter)+")",html), NothingList.append(nothing)
        except:
            input("nothing",counter,"cound not be loaded! press enter to continue...")
    return NothingList[len(NothingList)-2]
divide = False
Nothing = NothingFunction(StartValue, divide)

divide =  True
NothingFunction(Nothing, divide)
