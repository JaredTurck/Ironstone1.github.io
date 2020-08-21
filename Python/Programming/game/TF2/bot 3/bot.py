import win32com.client, win32api, win32con, os, time, getpass

shell = win32com.client.Dispatch("Wscript.Shell")
steam = "C:\\Program Files (x86)\\Steam\\Steam.exe"
launch = os.startfile
sleep = time.sleep
kill = (lambda program : os.system("taskkill /F /IM " + program))

def click(X,Y):
    win32api.SetCursorPos((X,Y)), time.sleep(0.2)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,X,Y,0,0)
    time.sleep(1)

def sendKey(key):
    shell.Sendkeys(key)
    time.sleep(0.5)


def login(username, password):
    kill("Steam.exe") # kill steam if open
    launch(steam) # launch fresh instance
    sleep(40)

    click(800, 460) # click Account name
    sendKey("{BACKSPACE}"*20) # clear field
    sendKey(username + "\t") # enter username
    sendKey(password) # enter password
    sendKey("{ENTER}") # login

def logout():
    kill("hl2.exe") # exit TF2
    launch(steam) # start steam
    sleep(2)

    click(10,20) # click steam
    click(50,35) # click Change User
    click(920,560) # click logout
    kill("steam.exe") # close steam

def start_TF2():
    launch(steam)
    click(200,50) # click Library
    click(200,70) # click Games
    click(100,80) # click search
    sendKey("Team Fortress 2")
    click(325,200) # click PLAY

def notification():
    sendKey("{ESCAPE}")
    click(1020,80) # click notification
    click(1020,250) # click view items
    click(1100,800) # continue with game
    sendKey("{ESCAPE}")

def join_server():
    click(1200,850) # click continue
    click(1200,850) # click continue again
    click(1230,100) # click ? to select random class
    
#login(username, password)
#sleep(10)

#start_TF2()
#sleep(10)
#sendKey("{ESCAPE}")
#sleep(20)

#sendKey("exec idle{ENTER}") # run idle script

#click(300,250) # click find a game
#click(480,300) # click casual
#click(1100,850) # click start search
#sleep(40) # wait for server

while True:
    join_server()

    sendKey("{ESCAPE}") # pause game - needs fixing, pause menu not appearing
    notification()
    sendKey("{ESCAPE}")
    sendKey("i") # start idle script
    
    sleep(300) # sleep for 5 minutes
