import win32com.shell.shell

command = 'netsh interface set interface "Ethernet" enable'
win32com.shell.shell.ShellExecuteEx(lpVerb="runas", lpFile="cmd.exe", lpParameters="/c "+command)
