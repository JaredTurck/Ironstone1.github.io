import os, subprocess, time, win32api, win32con

class bot(object):
    def __init__(self, bot):
        self.bot = bot
        self.steamDir = "C:/Program Files (x86)/Steam/Steam.exe"
        self.TFDir = "C:/Program Files (x86)/Steam/steamapps/common/Team Fortress 2/tf"
        self.console = (lambda data : open(self.File["RunCon"], "w").write(data))
        self.File = {"log"      : self.TFDir+"/condump000.txt",
                     "RunCon"   : self.TFDir+"/cfg/RunCommand.cfg"}

    def click(self, X, Y):
        win32api.SetCursorPos((X,Y)), time.sleep(.2)
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,X,Y,0,0)
        time.sleep(1)
        
    def getLogin(self):
        file = open("bots.txt").readlines()[self.bot-1]
        no, user, pasw = file.replace("\n","").split(",")
        return [[user, pasw] if int(no) == self.bot else None][0]

    def getLogFile(self):
        self.console("condump"), time.sleep(.3), self.console("")
        try:
            File = self.File
            if os.path.isfile(File["log"]):
                file = open(File["log"], encoding="utf-8").read()
                os.remove(File["log"])
                return file
        except:
            open(File["log"], "w").write("")

    def matchmacking(self):
        print("starting matchmacking...")
        self.click(300, 250) # find game
        self.click(480, 300) # casual
        self.click(1100,850) # start search

    def WaitUntil(self,condition, log=""):
        self.getLogFile()
        current.console("condump")
        while condition not in str(log):
            log = self.getLogFile()
            time.sleep(.5)
        current.console("")

    def joinTeam(self):
        self.click(1200,850) # continue
        self.click(1200,850) # continue
        self.click(1230,100) # random class

    def create_autoexec(self):
        open(self.TFDir + "/cfg/autoexec.cfg", "w").write("exec RunComandLoop\nloop")
        self.console("")

    def steam_login(self):
        print("Logging into steam... starting TF2...")
        username, password = self.getLogin()
        login = '"{0}" -login "{1}" "{2}" '.format(self.steamDir, username, password)
        subprocess.Popen(login + "-applaunch 440 -novid -fullscreen")

    def start_idle(self):
        self.WaitUntil("totallynota*****bot connected") # wait for connection
        print("connecting to server... starting idle..."), time.sleep(5)
        self.joinTeam()

        self.console("exec idle;Idleloop") # start idle
        time.sleep(1), self.console("")

    def matchmacking_idle(self):
        self.matchmacking()
        self.start_idle()


current = bot(1)
current.create_autoexec()
current.steam_login()

current.WaitUntil("Connection to game coordinator established.")
time.sleep(10)

current.matchmacking()
current.start_idle()

while True:
    log = current.getLogFile()
    
    if '#TF_Vote_kicked.' in str(log): # player was kicked!
        print("You where kicked! joining new server...")
        current.click(850,470) # kicked close window
        current.click(270,830) # Back
        current.matchmacking_idle()

    elif 'Lobby destroyed' in str(log): # user disconnects
        print("You disconnected... joining new server...")
        current.matchmacking_idle()

    # item drop notification
