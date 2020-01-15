import os
def diskCheck():
    menu = input(open("diskCheckMenu.txt").read())
    while menu not in [str(i+1) for i in range(4)]:
        menu = input("Not a valid option!\n>>> ")

    Drive = input("Enter drive letter, e.g. 'C:'\n>>> ")
    while Drive.upper() not in [chr(i)+":" for i in range(65,91)]:
        Drive = input("Not a valid Drive!\n>>> ")

    Dict = {"1":"chkdsk %s","2":"chkdsk %s /f","3":"chkdsk %s /f /b"}
    for key in Dict:
        if menu == key:
            print(">>> %s"%(Dict[key]%(Drive.upper())))
            os.system(Dict[key] % (Drive.upper()))

diskCheck()
