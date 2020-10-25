from pyautogui import press, typewrite, hotkey
from win32com import client
import time, win32com

#press('/')
#typewrite('chunk enable')
#press('ENTER')


#shell = win32com.client.Dispatch("WScript.Shell")
#shell.SendKeys("chunk enable")
#time.sleep(0.1)
#press('ENTER')

from pywinauto.application import Application

app = Application().start("notepad.exe")
app.UntitledNotepad.Edit.type_keys("/hello", with_spaces=True)

