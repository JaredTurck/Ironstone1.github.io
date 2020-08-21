import os, getpass, subprocess
user = getpass.getuser()
newpass = "abc123"
File = open("commond.bat","w")
File.write("net user "+user+" "+newpass), File.close()
File = open("commond.bat","w").write()
input("Press enter to continue... after you have run the cmd file!")
print("Your User accounts password, has been Successfully changed!")
