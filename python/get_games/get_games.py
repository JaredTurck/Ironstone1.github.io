import time, subprocess, sys
from selenium import webdriver

# GET GAMES
driver = webdriver.Chrome("chromedriver.exe")
driver.get("https://steamcommunity.com/id/Ironstone1/games/?tab=all")
with open("games.txt", "w") as games:
    games.write(driver.execute_script("""return (function() {
        var elms = document.querySelectorAll('div[id^="game_"]');
        var games = "";
        for (var i=0;i<elms.length;i++) {
            games += "\\n" + elms[i].id.replace(/game_/g, "");
        } return games.slice(2,-1);
    })();
"""))
driver.quit();

# IDLE
exe = "D:\Desktop\computing\Steam\HourBoostr\SingleBoostr.Game.exe"
games = [int(i) for i in open("games.txt", "r").read().split("\n")]
count = (len(games)//30)+1
MaxIdle = 32
error = 0
timeout = 300

info = subprocess.STARTUPINFO()
info.dwFlags = 1
info.wShowWindow = 0

def main():
    open("file.log", "a").close()
    open("n.txt", "a").close()
    startAt = [0 if open("n.txt", "r").read() == "" else int(open("n.txt", "r").read())][0]

    try:
        for i in range(startAt, count):
            for ii in range(i*MaxIdle, (i+1)*MaxIdle):
                if ii >= len(games): break;
                subprocess.Popen("" + exe + " " + str(games[ii]) + " " + str(error), startupinfo=info)

            f1 = open("file.log", "r").read()
            with open("file.log", "w") as f:
                f.write(f1 + "\nRound "+str(i+1)+"/"+str(count)+"... " + str((timeout*(count-i))/60) + " mins left...")

            n = [0 if open("n.txt", "r").read() == "" else int(open("n.txt", "r").read())][0]
            with open("n.txt", "w") as f:
                if n >= count:
                    f.write("0")
                else:
                    f.write(str(n+1))

            time.sleep(timeout)
            subprocess.Popen("taskkill /f  /im SingleBoostr.Game.exe", startupinfo=info)
            time.sleep(1)
            
        print("Finished!")
        with open("n.txt", "w") as f: f.write("0")
        time.sleep(timeout)
        return None
        
    except:
        print("[-] Error occured!")

while True:
    main()
