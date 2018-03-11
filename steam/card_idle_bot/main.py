from selenium import webdriver
import pickle

# Copyright © 2018 Jared Turck (Ironstone1)

# Plan:
# - load up cookies
# - get list of games with cards left
# - Main methods:
# -- run multiple games windowed
# -- run one game, wait 5 mins, close game, then open it again and so one
# -- alternates between multiple games ^

# --- LOAD COOKIES ---
driver = webdriver.Chrome();

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
        input("Please login to Steam, then press enter to continue...")
        pickle.dump(driver.get_cookies(), open("cookies.txt", "wb"))
        load_cookies()

load_cookies()
badges_url = driver.execute_script("""
return (function() {
	var action_container = document.getElementById("global_actions");
	return action_container.getElementsByClassName("user_avatar playerAvatar online")[0].href
})() + "/badges";
""")
driver.get(badges_url)

# --- GET LIST OF GAMES ---
games = driver.execute_script("""
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

print(games)
driver.quit()

# launch games.
# could use steamAppId lookup?
