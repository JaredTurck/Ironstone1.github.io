from selenium import webdriver
import pickle, os, time, getpass


def open_JS_file(FName, subdir="\\scripts\\"):
    return open(os.path.dirname(__file__) + subdir + FName).read().replace("\n","").replace("\t","")

commands = {
    "!check" : "[+] Steam Bot: Yes I am online, how can I help you?",
    "!help" : open_JS_file("help.txt").replace(".", "\n")
}


# --- LOAD COOKIES ---
#opt = webdriver.chrome.options.Options()
#opt.add_argument("--headless")
#opt.add_argument("--disable-gpu")
#opt.add_argument("--ignore-certificate-errors")
#driver = webdriver.Chrome(chrome_options=opt);
driver = webdriver.Chrome()
#driver = webdriver.PhantomJS()

def Wait4Elm(elm, con):
    errors_list = [
        "The account name or password that you have entered is incorrect.",
        "There have been too many login failures from your network in a short time period. Please wait and try again later."]
    
    while True:
        if (driver.execute_script("return " + elm+" == undefined") == con):
            return;

        try:
            if (driver.execute_script("return document.getElementById(\"error_display\").innerText") in errors_list):
                print("\n"+driver.execute_script("return document.getElementById(\"error_display\").innerText"));
                input("\nPress Enter to Exit...");driver.quit();exit();
        except: pass
        time.sleep(0.1)

def load_cookies():    
    driver.get("https://steamcommunity.com/")
    if (driver.execute_script('return document.getElementById("account_pulldown") == null') == True):
        avatar_elmt = "document.querySelectorAll('div[id=\"global_actions\"] [class^=\"user_avatar playerAvatar\"]')[0]"
        driver.get("https://steamcommunity.com/login/home/")
        try:
            for i in range(3):
                driver.get("https://steamcommunity.com/")
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

            print("[+] Please login to Steam...")
            driver.execute_script("document.getElementById(\"steamAccountName\").value = \"" + input("Steam username: ") + "\"")
            driver.execute_script("document.getElementById(\"steamPassword\").value = \"" + getpass.getpass("Password: ") + "\"")
            driver.execute_script("document.getElementById(\"SteamLogin\").click();")
            
            Wait4Elm("document.querySelectorAll('div[class=\"newmodal\"][style^=\"position: fixed\"]')[0]", False)
            driver.execute_script("document.getElementById(\"twofactorcode_entry\").value = \"" + input("Authenticator Code: ") + "\"")
            driver.execute_script("document.querySelectorAll('div[id=\"login_twofactorauth_buttonset_entercode\"] div[type=\"submit\"]')[0].click()")

            Wait4Elm(avatar_elmt, False)
            driver.get("https://steamcommunity.com/")
            pickle.dump(driver.get_cookies(), open("cookies.txt", "wb"))
            load_cookies()

        finally:
            global profile_url
            driver.get("https://steamcommunity.com/")
            profile_url = driver.execute_script("return " + avatar_elmt+".href")
            
    else:
        print("[+] Already logged in!")

# --- TRADE OFFER ---
load_cookies()
driver.get("https://steamcommunity.com/chat/")
inbox = driver.execute_script("return " + open_JS_file("get_unread_messages_by_username.js"))
#inbox = ['vuzimanzi']

for username in inbox:
    driver.refresh()
    driver.execute_script(open_JS_file("click_on_username.js").replace("{USERNAME}", username))

    Wait4Elm("document.getElementsByClassName(\"whiteLink\")[0]", False)
    chat_lines = driver.execute_script("return document.querySelectorAll('div[class=\"chat_dialog_content_inner\"]')[0].innerText;")
    lines = [];[[lines.append(ii) for ii in i.split(":")] for i in chat_lines.split("\n")]

    for line in lines:
        if "!check" in line:    # !check - checks to see if the bot is online and ready to serve you.
            driver.execute_script("document.getElementById(\"chatmessage\").value = \""+commands["!check"]+"\";")
            driver.execute_script("document.querySelectorAll('form[id=\"chatform\"] button[type=\"submit\"]')[0].click();") # send message

        if "!buy" in line:
            pass
            # Data:
            AppId = 753 # Steam client
        
            # goto steam users profile
            profile_partner = driver.execute_script("return document.querySelectorAll('div[id=\"chatlog\"] h2[class=\"ellipsis\"] a')[0].href;")
            driver.get(profile_partner)
            # offer a trade
            driver.execute_script("document.querySelectorAll('a[onclick^=\"StartTradeOffer\"]')[0].click();")
            driver.switch_to_window(driver.window_handles[-1])
            #
            #   Does the user have a trade hold?
            #   Is the User Banned from trading?
            #
            # The Trade:
            #   select your inventory
            driver.execute_script("document.getElementById(\"inventory_select_your_inventory\").click();")
            #   select Steam/Game
            driver.execute_script("TradePageSelectInventory( UserYou, "+AppId+", 0 );")
            
            #   search for the item
            #   add the chosen item to the trade
            #   select partners inventory
            #   select Steam
            #   calculate price
            #   add items there going to pay with, e.g. gems to the trade
            #
            # Conformation:
            #   check the 'Click here to confirm trade contents' checkbox.
            #   click "Make Offer"
            #
            # Steam Guard:
            #   Confirm trade offer
            #   2 step-authentication
            

        #elif "!buy"
        #elif "!sell"
        #elif "!check"
    
    


#user sends message saying "buy 1", "sell 1"
#if buy:
#	select the items they are going to buy
#	calculate price
#	create the trade
#if sell:

# buy trading cards for gems.

# PHantumJS
