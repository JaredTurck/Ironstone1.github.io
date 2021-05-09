import win32com.client, keyboard, time

shell = win32com.client.Dispatch("WScript.Shell")

key = "k"

while True:
    start = False
    if keyboard.is_pressed(key) == True:
        if start == False:
            start = True
            for i in range(301):
                shell.Sendkeys(key)
            start = False
