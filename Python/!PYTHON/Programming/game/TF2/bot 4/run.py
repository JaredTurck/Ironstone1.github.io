import os, time, win32com.client, win32api, win32con

Dir = "C:/Program Files (x86)/Steam/steamapps/common/Team Fortress 2/tf"
shell = win32com.client.Dispatch("Wscript.Shell")
data = ""

# steam login
user = "Ironstone1_"
pasw = input("Enter Password (G*****1234): ")

login = '-login "{0}" "{1}" -applaunch 440 -novid'.format(user, pasw)
print(os.popen('"C:/Program Files (x86)/Steam/Steam.exe" ' + login).read())

def click(X,Y):
    win32api.SetCursorPos((X,Y)), time.sleep(.2)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,X,Y,0,0)
    time.sleep(.2)

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

command("condebug")
while True: # main loop
    time.sleep(1)
    log = Getlog()

    if "Party destroyed" in log: # player Kicked / Disconnected
        shell.SendKeys("{ENTER}")
        
    if "Team Fortress\nMap:" in log: # server map changed
        click(1200,850) # continue 1
        click(1200,850) # continue 2
        click(1230,100) # random class

    command(data + "clear")
    data = ""
