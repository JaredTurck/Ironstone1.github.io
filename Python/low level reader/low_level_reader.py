import os

def show_open_help(drive):
    help(drive)
    while True:
        input()

def is_empty(drive):
    """ Checks if a drive contains no data"""
    a = drive.read(1024)
    while a != None:
        b = drive.read(1024)
        if a != b:
            return True
        b = a
    return False

try:
    letter = "E"
    drive = open(r"\\.\\"+letter+":", "rb+")

    # itterate through data of drive
    p = drive.read(1024)
    print(p)
    
    
except PermissionError:
    print("[-] Failed to read drive, please run as admin!")

