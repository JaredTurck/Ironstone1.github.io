from selenium import webdriver
import win32api, win32con, win32gui, time
from pyautogui import press, typewrite, hotkey

def click(x,y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

def get_mouse_pos():
    while True:
        time.sleep(0.1)
        print(win32gui.GetCursorPos())

def get_ids():
    IDs = [];
    time.sleep(4)
    for i in range(20):
        current_ids = driver.execute_script("return " + func1)
        for i in current_ids:
            if i not in IDs:
                IDs.append(i)
    
        click(1919, 984)
        time.sleep(1)
    click(10, 10)
    return IDs

def type_txt(text, timeout=0.01):
    for letter in text:
        press(letter)
        time.sleep(timeout)

def type_username(user):
    time.sleep(1)
    click(1810, 170)
    time.sleep(1)
    click(1701, 173)

    # type the word from
    type_txt("from:")
    type_txt(user, timeout=0.04)
    hotkey("enter")

def display():
    output = open("output.txt", "w")
    user_list = [];
    for user in users:
        user_list.append(user + ","+(users[user].replace("Result", "").replace("s","").replace(" ","").replace(",", ""))+";")
    output.write("\n".join(user_list))
    output.close()

func1 = """(function() {
	elms = document.querySelectorAll('[class^="membersWrap"] [class^="member"] [class^="avatar-"]');
	users = [];
	for (i=0;i<elms.length;i++) {
		try {
			current_id = elms[i].querySelectorAll('[class^="avatar-"]')[0].getAttribute('src').split('avatars/')[1].split('/')[0];
			users.push(current_id);
			console.log("Got User ID!");
		} catch {
			console.log("Failed to get user ID!");
		}
	}
	return users;
})();"""

driver = webdriver.Chrome("chromedriver.exe")
driver.get("https://discord.com/channels/738484352568262747/")
input("Please maximise window, then login... ")

# get IDs
IDs = get_ids()
users = {}

# get user counts
for user in IDs:
    type_username(user)
    time.sleep(4)
    users[user] = driver.execute_script("return document.querySelectorAll('[class^=\"totalResults\"]')[0].innerText")
display()
