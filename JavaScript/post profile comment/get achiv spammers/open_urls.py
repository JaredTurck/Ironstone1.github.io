import os

with open("accounts.txt", "r") as file:
    for line in file.readlines():
        os.popen('start chrome.exe "'+line.replace("\n","")+'"')
