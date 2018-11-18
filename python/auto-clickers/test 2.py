import pyautogui, time

pyautogui.keyDown("ctrl")
pyautogui.keyDown("alt")
pyautogui.keyDown("del")
time.sleep(1)
pyautogui.keyUp("ctrl")
pyautogui.keyUp("alt")
pyautogui.keyUp("del")
