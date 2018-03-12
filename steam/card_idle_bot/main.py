from selenium import webdriver
import pickle, os, time

# Copyright © 2018 Jared Turck (Ironstone1)

# Plan:
# - load up cookies
# - get list of games with cards left
# - Main methods:
# -- run multiple games windowed
# -- run one game, wait 5 mins, close game, then open it again and so one
# -- alternates between multiple games ^

# --- INIT ---
print(("*"*34) + "\n* CARD IDLE BOT - by Jared Turck *\n" + ("*"*34) + "\n[+] Please wait...")
SteamPath = "D:\Steam\Steam.exe"

# --- LOAD COOKIES ---
driver = webdriver.Chrome();
    # headless browser
    # PhantomJS

def load_cookies():
    driver.get("https://steamcommunity.com/login/home/")
    try:
        for i in range(3):
            driver.get("http://steamcommunity.com/")
            for cookie in pickle.load(open("cookies.txt", "rb")):
                try:
                    driver.add_cookie(cookie)
                except:
                    print("[-]: Message: unable to set cookie")
                    
        username = driver.find_element_by_id("account_pulldown").text
        print("[+] Hello '" + username + "' successfully loged into Steam!")
        return;

    except Exception as error:
        print("[-]:", error)
        driver.get("https://steamcommunity.com/login/home/")
        input("[+] Please login to Steam, then press enter to continue...")
        pickle.dump(driver.get_cookies(), open("cookies.txt", "wb"))
        load_cookies()

load_cookies()
url = driver.execute_script("return document.querySelectorAll('a[class^=\"user_avatar playerAvatar\"]')[0].href") + "/badges"

# --- GET LIST OF GAMES ---
def get_list_of_games():
    driver.get(url)
    return driver.execute_script("""
return (function() {
	var div = document.getElementsByClassName("badges_sheet")[0];
	var container = div.getElementsByClassName("badge_row is_link");
	var games_list = [];

	for (i=0;i<container.length;i++) {
		try {
			var drop_container = container[i].getElementsByClassName("progress_info_bold")[0];
			var drops = drop_container.innerText.replace(/\t/g, "");
		
			if (/\d/.test(drops) == true) {
				var No_drops = parseInt(drops.split(" ")[0]);
				var Name_container = container[i].getElementsByClassName("badge_title")[0]
				var Name = Name_container.innerText.replace(/\t/g, "").slice(0, -1);
				games_list.push(Name);
			}
		} catch(error) {}
	} return games_list;
})();
    """)

def get_appid(gameName):
    driver.get("https://steamdb.info/search/?a=app&q=" + gameName.replace(" ","+") + "&type=1&category=0")
    return int(driver.execute_script(
        'return document.getElementById("table-sortable").getElementsByClassName("app odd")[0].getAttribute("data-appid")'
    ));


        
def run_mutiple_games(): pass
def alternate_games(): pass

def run_one_game():
    games = get_list_of_games()

    print("\nMenu:")
    for i, game in enumerate(games):
        print(str(i)+":", game)

    user = input("\nSelect a game from the Menu above!\nMake sure you have the game installed first\n>>> ")
    while (user not in [str(i) for i in range(len(games))]): user = input("Invalid Input!\n>>> ")
    Timeout = input("Timeout: How long should the program wait after opening a game before it closes it again?\n>>> ")
    while (Timeout.isdigit() != True): Timeout = input("Invalid Input!\n>>> ")

    gameName = games[int(user)]
    appid = get_appid(gameName)
    
    while (gameName in games):
        os.popen("\"" + SteamPath + "\" -applaunch " + str(appid) + " -windowed -w 500 -h 500")
        print("[+] launched '" + gameName+"'!")
        
        time.sleep(int(Timeout))
        os.popen('taskkill /f /fi "windowtitle eq '+gameName+'"')
        print("[+] closed game '" + gameName+"'!")

        time.sleep(1)
        games = get_list_of_games()

    # get games app id
    # while cards left:
    #   launch game
    #   wait n mins
    #   close game


# Main Menu
while True:
    print("\nMenu:\n1. Run mutiple games\n2. Run one game\n3. Alternate between games\n4. Exit")
    user = input(">>> ")
    while (user not in ["1", "2", "3", "4"]):
        user = input("Invalid Input!\n>>> ")

    if (user == "4"): driver.quit(); exit();
    {"1" : run_mutiple_games,
     "2" : run_one_game,
     "3" : alternate_games}[user]()
