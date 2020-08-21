import sys

Dir = "C:/Program Files (x86)/Steam/steamapps/common/Team Fortress 2/tf"

def command(data):
    with open(Dir + "/cfg/RunCommand.cfg", "w") as con:
        con.write(data)

def Getlog():
    try:
        file = open(Dir + "/condump000.txt").read()
        os.remove(Dir + "/condump000.txt")
        return file
    except:
        return ""

while True:
    log = Getlog()
    user = input(">>> ")

    if user == "exit":
        command("clear")
        sys.exit()
    command(user)

# Party destroyed
# Team Fortress\nMap:
