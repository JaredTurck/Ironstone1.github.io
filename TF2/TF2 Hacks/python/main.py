import time, random, os
from selenium import webdriver

#" ᠌ ᠌ ᠌᠌ ᠌ ᠌ ᠌ ᠌ ᠌ "
#changename;status;


path = "D:/Steam/steamapps/common/Team Fortress 2/tf/console.log"
criteria1 = "Unknown command: changename"
criteria2 = "# userid name                uniqueid            connected ping loss state"
chrome_path = "\"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe\""

#stats = [i.split(i.split("#    ")[-1])[0] for i in [open(path, "r", encoding="utf-8").read().split(criteria)[1]]][0]
#with open(path, "w") as f:
#    f.close()
#
#print(stats)
#
# open file as read, hen close, to clear console.log
#

#driver = webdriver.Chrome("chromedriver.exe")

def main():
    while True:
        try:
            file = open(path, "r", encoding="utf-8").read() + "{END}"
            url = "https://steamcommunity.com/profiles/76561198369758573/edit?bot=start"
            img = "_"
            special_chr = " "
    
            if criteria1 in file:
                file = open(path, "r", encoding="utf-8").read() + "{END}"
                stats = [i.split(i.split("#    ")[-1])[0] for i in [file.split(criteria1)[1]]][0]
                with open(path, "w") as fw:
                    fw.close()
            
                while True:
                    try:
                        part = stats.split(criteria2)[1].split("\"")[1:-1:2]
                        ran_name = part[random.randint(0, len(part)-1)]
                        os.popen(chrome_path + " \""+url +"?name="+ ran_name + special_chr + "&img=" + img)

                        print(ran_name)
                        break
            
                    except:
                        print("failed to change name!")
                        pass
        
            time.sleep(1)

        except:
            print("failed to open file!")
            time.sleep(0.5)

def login_gmail():
    email = "totallynotasteambot@gmail.com"
    password = "Password1234_"

    driver.get("https://accounts.google.com/signin/v2/identifier")
    
    driver.execute_script('document.getElementById("identifierId").value = "'+email+'"')
    driver.execute_script('document.getElementById("identifierNext").click()')
    time.sleep(1)
    driver.execute_script('document.querySelectorAll(\'input[type="password"]\')[0].value = "'+password+'"')
    driver.execute_script('document.getElementById("passwordNext").click();')
    


#part = stats.split(criteria2)[1].split("\"")[1:-1:2]
#ran_name = part[random.randint(0, len(part)-1)]

# get Steam ID
# lookup profile url from id



# download img
main()
