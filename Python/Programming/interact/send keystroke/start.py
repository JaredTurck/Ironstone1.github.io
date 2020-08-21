import win32com.client
import os, time

shell = win32com.client.Dispatch("WScript.Shell")
os.startfile("chrome.exe")
time.sleep(5)

shell.Sendkeys("google{ENTER}")

# http://ss64.com/vb/sendkeys.html - sendkeys
