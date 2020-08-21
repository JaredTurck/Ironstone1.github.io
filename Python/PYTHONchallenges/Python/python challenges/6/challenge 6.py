import urllib.request, zipfile
url = "http://www.pythonchallenge.com/pc/def/channel.zip"
file = urllib.request.urlretrieve(url, "channel.zip")
file = (zipfile.ZipFile("channel.zip","r")).extractall("file")

nothing = "90052"
comments = []
while nothing != "":
    file = open("file/"+nothing+".txt","r").read()
    nothing = ""
    for i in range(len(file)):
        if file[i].isdigit()==True:
            nothing += file[i]
    print(zipfile.comment(nothing))
    print(file)
