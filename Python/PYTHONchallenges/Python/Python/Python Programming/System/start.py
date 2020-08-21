import os

def MSCONFIG_TOOLS():
    while True:
        menu = input(open("SystemToolsMenu.txt").read())
        while menu not in [str(i+1) for i in range(18)] + ["exit"]:
            menu = input("Not a valid Input!\n>>> ")

        if menu == "exit":
            exit()

        Dict = {1:"winver.exe",2:"UserAccountControlSettings.exe",3:"wscui.cpl",
                4:"control.exe /name Microsoft.Troubleshooting",5:"compmgmt.msc",
                6:"msinfo32.exe",7:"eventvwr.exe",8:"appwiz.cpl",9:"control.exe system",
                10:"inetcpl.cpl",11:"cmd.exe /k %windir%\system32\ipconfig.exe",
                12:"perfmon.exe",13:"resmon.exe",14:"taskmgr.exe",15:"cmd.exe",
                16:"regedt32.exe",17:"msra.exe",18:"rstrui.exe"}

        os.system("start " + Dict[int(menu)])

def CMD_TOOLS():
    os.system("START cmd_tools.exe")

def SYSTEM32_TOOLS():
    def menu():
        for line in open("SYSTEM32_TOOLS.txt").readlines():
            if line == "^\n":
                input(line[:1] + "...")
            else:
                print(line,end="")
        return ""

    menu()
    while True:
        user = input(">>> ")
        while user not in [str(i) for i in range(1,117)] + ["exit"]:
            user = input("Not a valid Input!\n>>> ")

        if user == "exit":
            exit()

        file = [i.replace("\n","") for i in open("SYSTEM32.txt").readlines()]
        Dict = dict([[i+1,file[i]] for i in range(len(file))])
        os.system("start %s" % (Dict[int(user)]))
        print("Type 'exit' to quit, or choose option from menu above!")
