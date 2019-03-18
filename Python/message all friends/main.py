from selenium import webdriver
import pickle, time

def cookies(c):
    if (c == "save"):
        driver.get("https://steamcommunity.com/login/home/")
        while (url not in driver.current_url.lower()): pass
        pickle.dump(driver.get_cookies(), open("cookies", "wb"))

    if (c == "load"):
        try:
            driver.get(url)
            for cookie in pickle.load(open("cookies","rb")):
                driver.add_cookie(cookie)
            driver.refresh()
            
        except (FileNotFoundError, EOFError):
            with open("cookies", "w") as file:
                file.write("\n")
            cookies("save")

options = webdriver.ChromeOptions()
options.add_argument('--disable-notifications')
driver = webdriver.Chrome(chrome_options=options)

message = "ok"
url = "https://steamcommunity.com/id/JaredCat".lower()
cookies("load")

#

driver.get(url + "/friends")
#wait for page to load here <--

queryText = 'document.querySelectorAll(\'div[id="search_results"] div[class^="selectable friend_block"][data-miniprofile] a[class="selectable_overlay"]\');'
users = [i.get_attribute("href") for i in driver.execute_script('return ' + queryText)]

for userUrl in users:
    # send the message
    driver.get(userUrl)
    steam_username = driver.execute_script('return document.querySelectorAll(\'div[class="persona_name"] span[class="actual_persona_name"]\')[0].innerText')

    profile_window = driver.window_handles[0]
    driver.execute_script('document.querySelector(\'a[href^="javascript:OpenFriendChat("]\').click()')
    driver.switch_to.window(driver.window_handles[1])

    elm_query = 'document.querySelector(\'textarea[class^="chatentry_chatTextarea"]\')'
    while driver.execute_script('return ' + elm_query) == None: pass
    driver.execute_script(elm_query + '.value = "' + message + '"')

    # ask user for conformation to send message
    try: user_input = input("Would you like to send a message to '" + steam_username + "'? Yes or No\n> ").lower()
    except UnicodeEncodeError: user_input = input("Would you like to send a message to '" + userUrl + "'? Yes or No\n> ").lower()
    
    while user_input not in ["y", "n", "yes", "no"]:
        user_input = input("Invalid Input!\n> ").lower()

    if user_input == "y" or user_input == "yes":
        driver.execute_script('document.querySelector(\'textarea[class^="chatentry_chatTextarea"]\').focus()')
        driver.execute_script('document.querySelector(\'form[class^="chatentry_chatEntryControls"] button[class^="chatSubmitButton"][type="submit"]\').click()')
        time.sleep(3)

    driver.close()
    driver.switch_to.window(profile_window)


# click send button.
#document.querySelector('form[class^="chatentry_chatEntryControls"] [class^="chatSubmitButton"]').click();
