import os

file = """\n________________________________________
<-================->
 Advanced CMD Tools
<-================->
Menu:
1)  chkdsk - Error Checking
2)  sfc - fix file corruption
3)  defrag - reorganise data
4)  ping - test protocal
5)  tracert - track data packets
6)  ftp - run File Transfer Protocol
7)  diskpart - Partitioning tool
8)  driverquery - Display installed drivers
9)  ipconfig - Display Internet Protocal configuration
10) net - networking commands
11) netsh - networking service
12) start - start an application
13) taskkill - end proccess
14) Command Propt(CMD) as ADMINISTRATOR
15) EXIT

>>> """

while True:
    menu = input(file)
    while menu not in [str(i+1) for i in range(15)]:
        menu = input("Not a valid Input!\n>>> ")

    Dict = {1:"chkdsk",2:"sfc",3:"defrag",4:"ping",5:"tracert",8:"driverquery",
            9:"ipconfig",10:"net",11:"netsh",12:"start",13:"taskkill"}

    example = {1:"chkdsk C: /F",2:"sfc /scannow",3:"defrag C: /U /V /A",
               4:"ping google.co.uk",5:"tracert google.co.uk",6:"ftp -d",
               7:"diskpart /?",8:"driverquery /FO TABLE",9:"ipconfig /ALL",
               10:"net user ADMINISTRATOR",11:"netsh wlan show all",
               12:"start notepad.exe",13:"taskkill /IM notepad.exe"}

    if int(menu) in Dict:
        print("Define attributes for '%s' below!" % (Dict[int(menu)]))
        print("Exmaple:",example[int(menu)])
        user = input("\n>>> %s " % (Dict[int(menu)]))
        command = Dict[int(menu)] + " " + user
        os.system(command)

    elif int(menu) in {6:"ftp",7:"diskpart"}:
        Dict = {6:"ftp",7:"diskpart"}
        os.system(Dict[int(menu)])

    elif menu == "14":
        os.system("START CMD")
    elif menu == "15":
        exit()

    input("\nPress any key to continue...")
