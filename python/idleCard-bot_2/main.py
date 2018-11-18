from selenium import webdriver
import pickle, os, time


co = webdriver.chrome.options.Options()
co.add_argument("--log-level 3")
driver = webdriver.Chrome("chromedriver.exe", chrome_options=co)
url = "https://steamcommunity.com/id/Ironstone1"

def main():
    driver.get(url+"/badges/")
    games = []
    
    last_page = driver.execute_script("""
    return (function() {
	elms = document.querySelectorAll('div[class="pageLinks"]')[0].querySelectorAll('a[href^="?p="][class="pagelink"]')
	return parseInt(elms[elms.length-1].href.split("/?p=")[1])
    })();""")

    for i in range(last_page):
        driver.get(url + "/badges/?p=" + str(i+1))
        games += driver.execute_script("""
            return (function() {
                url = "https://steamcommunity.com/id/Ironstone1/gamecards/";
                elms = document.querySelectorAll('[class="badge_row is_link"]');
                result = [];

                for (i=0;i<elms.length;i++) {
                    if (elms[i].querySelectorAll('div[class="badge_title_playgame"]').length > 0) {
                        result.push(parseInt(elms[i].querySelectorAll('[href^="'+url+'"]')[0].href.split("gamecards/")[1].replace("/","")));
                    }
                } return result
            })();
        """)
    return sorted(list(set(games)))

def cookies(c):
    if (c == "save"):
        driver.get("https://steamcommunity.com/login/home/")
        while (url not in driver.current_url): pass
        pickle.dump(driver.get_cookies(), open("cookies", "wb"))

    if (c == "load"):
        driver.get(url)
        for cookie in pickle.load(open("cookies","rb")):
            driver.add_cookie(cookie)
        driver.refresh()

def idle_games(timeout=10, delay=5, game_count=1, individual_idle=False, AppId=0):
    while True:
        for i in range(len(games)):

            if individual_idle == True:
                assert AppId != 0
                os.popen(os.getcwd() + "\\install\\steam-idle.exe " + str(AppId))

            else:
                for ii in range(game_count):
                    os.popen(os.getcwd() + "\\install\\steam-idle.exe " + str(games[(i+ii-1) % len(games)]))
            
            time.sleep(timeout)
            os.popen("taskkill /f /im steam-idle.exe")
            time.sleep(delay+0.1)

def validate(n1, n2, text):
    user = input(text)
    while [True, False][len(["_" for i in [user] if i.isdigit() if n1 <= int(i) <= n2])]:
        user = input("Invalid Input, Try again!\n>>> ")
    return int(user)

print("\n[+] logging into Steam...")
cookies("load")
print("[+] Reading badge page Information Please wait...")
games = main()

choice = validate(1, 2, "\nMenu:\n1. Alternate Games\n2. One game at-a time\n>>> ")
if choice == 1:
    idle_games(timeout=validate(1, 3600, "\nTimeout: "),
               delay=validate(1, 3600, "\nDelay: "),
               game_count=validate(1, 30, "\nNo. Games simultaneously: "),
               individual_idle = False)

if choice == 2:
    menu = "";print("[+] Getting App info...\n")
    for i,g in enumerate(games):
        driver.get("https://steamdb.info/app/" + str(games[i]))
        menu += str(i+1)+ ". " + driver.execute_script("return document.querySelectorAll('tr td[itemprop=\"name\"]')[0].innerText") + "\n"
    
    idle_games(
        AppId           = games[validate(1, len(games), "\nMenu:\n"+menu+"\n>>> ")-1],
        timeout         = validate(1, 3600, "\nTimeout: "),
        delay           = validate(0, 3600, "\nDelay: "),
        individual_idle = True,
        game_count      = 1)
