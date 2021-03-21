from selenium import webdriver
import os, time

#init
driver = webdriver.Chrome("chromedriver.exe")
your_profile_url = "https://steamcommunity.com/profiles/76561198369514012/" #input("Your Profile URL: ")
your_username = ""
your_password = ""

chrome_path = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
console_log_path = "D:/Steam/steamapps/common/Team Fortress 2/tf/console.log"

def clear_log():
    with open(console_log_path, "w") as console_file:
        console_file.close()

def main():
    # read console.log file
    file = open(console_log_path, "rb").read().decode("utf-8", "ignore")
    print("read console.log")

    # fetch data from file as array
    crit_1 = "# userid name                uniqueid            connected ping loss state"
    items = {}
    count = 0

    for line in file.split(crit_1)[1].split("\n"):
        if (line+"-")[0] == "#":
            name = line.split('"')[1]
            ID = line.split(" [")[1].split("] ")[0]
            items[int(count)] = [name, ID]
            count += 1

    # display list of names as menu
    assert len(items) > 0, "no players on server, var items == 0"
    print("Select a player from the menu below:\n")

    #print("Menu:\n"+"".join([str(i+1)+") "+items[i][0]+"\n" for i in items]))

    for i in items:
        try:
            print(str(i+1)+") "+items[i][0])
        except:
            pass

    user = input(">>> ")
    while [1 <= int(user) <= len(items) if user.isdigit() else False][0] != True:
        user = input("Invalid Input!\n>>> ")

    # get image source
    src = "https://steamcommunity.com/"
    src2 = "https://steamcdn-a.akamaihd.net/"
    items[int(user)-1][1]

    driver.get("https://steamid.xyz/")
    driver.execute_script('document.getElementById("id").value = "'+items[int(user)-1][1]+'";')
    driver.execute_script('document.getElementById("go").click();')
    profile_url = driver.execute_script('return document.querySelectorAll(\'[id="guide"] input[value^="'+src+'"]\')[0].value')

    driver.get(profile_url)
    href = driver.execute_script('return document.querySelectorAll(\'div[class="playerAvatarAutoSizeInner"] img[src^="'+src2+'"]\')[0].src')

    # open webbrowser, change steam name and profile img to match the chosen player
    #option = input("1) Open in regular web browser\n2) Open Steam thriugh selenium\n>>> ")
    #while [1 <= int(option) <= 2 if user.isdigit() else False][0] != True:
    #    option = input("Invalid Input!\n>>> ")
    option = "1"

    if option == "1":
        # open chrome, goto your profile
        url = "\"" + chrome_path + "\" \""+your_profile_url+"/edit?bot=start?name="+items[int(user)-1][0]+"&img="+href+"\""
        os.popen(url)
        print(href)

    # clear log file
    clear_log()

# using chosen players Steam ID, get profile url
# goto profile, download image
# change users profile picture to match the downloaded image.
# save changes
# sign into steam, save cookies

while True:
    try:
        main()

    except Exception as error:
        time.sleep(1)
        print("error")
