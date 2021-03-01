import win32gui, win32api, win32con, time, pyautogui

def generate_coord(file_name="coordinates.txt", tm=5):
    coordinates = []

    time.sleep(2)
    print("start now")

    start = time.time()
    while time.time() < start+tm:
        flags, hcursor, (x,y) = win32gui.GetCursorInfo()
        coordinates.append([x, y])

    with open(file_name, "w") as file:
        for c in coordinates:
            file.write(str(c[0]) +","+ str(c[1]) + "\n")

def read_cord(file_name="coordinates.txt"):
    try:
        fr = open(file_name, "r").read().split("\n")
        coordinates = []
        for i in fr:
            try:
                coordinates.append([int(i.split(",")[0]), int(i.split(",")[1])])
            except:
                print("failed to append coordinate to list!")
        return coordinates
    
    except FileNotFoundError:
        return []

def click(x, y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

def move(x, y):
    win32api.SetCursorPos((x,y))

def move_mouse(step=100):
    coordinates = read_cord()
    count = 0
    for c in coordinates:
        if count % step == 0:
            # move mouse
            move(c[0], c[1])
    # click mouse
    click(c[0], c[1])

def steam_create_account():
    # email
    click(185, 395)
    pyautogui.typewrite("jaredturck8@gmail.com")

    click(350, 491)
    pyautogui.typewrite("jaredturck8@gmail.com")

    # confirmation
    click(86,744)

    # captcha
    move_mouse(step=1)
    time.sleep(2)

    #continue
    click(147, 842)

    #open new tab
    click(270, 22)

    #load gmail
    click(218, 58)
    pyautogui.typewrite("https://gmail.com/")
    time.sleep(1)
    click(238, 90)
    click(348, 23)
    time.sleep(3)

    #sign into alt_8 gmail
    click(923, 135)
    time.sleep(0.5)
    click(741, 439)
    time.sleep(0.5)
    click(712, 474)

    #signin screen
    #time.sleep(2)
    #click(614, 588)
    #time.sleep(3)
    #click(379, 559)
    #pyautogui.typewrite(password)
    #click(607, 635)

    #open email
    time.sleep(5)
    click(360, 282)
    time.sleep(1)
    click(465, 341)

    #click link in email
    time.sleep(1)
    click(723, 822)

    #go back to steam tab
    click(99, 27)

user = input("Menu:\n1. Write Coordinates\n2. Read coordinates\n3. Steam Sign in\n> ")
while user not in ["1", "2", "3"]:
    user = input("Invalid Input!\n> ")
    
password = input("Enter password for gmail: ")
    
if user == "1":
    generate_coord()
elif user == "2":
    move_mouse(step=1)
elif user == "3":
    steam_create_account()
