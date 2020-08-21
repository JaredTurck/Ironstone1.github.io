import urllib.request, platform, os

OS = input("what OS do you have? [MAC/WIN/DIS]: ")
while OS not in ["mac", "dis", "win"]:
    OS = input("Not a valid input!\n>>> ")

print("Looking for updates...")
url = "https://www.python.org/downloads/"
platform_os = {"mac" : b"Download the latest version for Mac OS X",
               "dis" : b"Download the latest source release",
               "win" : b"Download the latest version for Windows"}
html = urllib.request.urlopen(url).read()

element = html[html.index(platform_os[OS]):]
py3 = element[element.index(b'href=')+6: element.index(b"Download Python 3")-2]
element = element[element.index(py3):]
py2 = element[element.index(b"href")+6: element.index(b"Download Python 2")-2]

new = {"3" : py3[34 : py3[34:].index(b"/") + 34].decode("utf-8"),
       "2" : py2[34 : py2[34:].index(b"/") + 34].decode("utf-8")}

current = platform.python_version()
ver = current[:current.index(".")]

print("\nA new version of python is avalible!")
print("current version: %s" % current)
print("updated version: %s" % new[ver])
prompt = input("\nWould you like to install the update? ")

if prompt.upper() in ["YES","Y"]:
    url = {"3" : py3, "2" : py2}[ver].decode("utf-8")
    print("\nDownloading... " + url)
    file = urllib.request.urlopen(url).read()
    open("download\python-update.exe","wb").write(file)

    print("finished downloading the file...")
    command = "start " + os.getcwd()+"\\download\\python-update.exe"
    os.system(command)
