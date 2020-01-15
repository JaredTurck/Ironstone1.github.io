import tkinter, os, time
from tkinter import filedialog
print(open("Start.txt","r").read(),end=""),input()
validFile = False
while validFile !=True:
    try:
        location = tkinter.filedialog.askopenfilename()
        path, extension = os.path.splitext(location)
        file, menu,validFile = open(location,"r").read(), "", True
    except:
        print("You file can not be read!")
while True:
    while not menu in ["1","2","3"]:
        menu = input(open("menu.txt","r").read() % (os.path.basename(location)
        ,os.path.dirname(location),len(file),extension,
        (os.stat(location)).st_size,time.ctime(os.path.getmtime(location)),
        time.ctime(os.path.getctime(location))))
        if menu == "1":
            try:
                Outputfile = open(location,"r").readlines()
                for I in range(0,len(Outputfile),30):
                    print((open("output.txt","r").read()%(os.path.basename(location))),"\n'...' = Press enter!")
                    print(*Outputfile[:I+30],sep=""), input("...")
            except:
                print(*Outputfile,sep="") # used to print file < 30 lines
        elif menu == "2":
            print("careful your input is case sensitive!")
            Str,found = input("Enter your keyword to search for: "), 0
            for II in range(len(file)):
                try: 
                    if[file[II+X]==Str[X]for X in range(len(Str))]==[True]*len(Str):
                        found += 1
                except:
                    pass
            print("found",found,"matchs for the string '"+Str+"'")
        elif menu == "3":
            validFile = False
            while validFile == False:
                try:
                    saveLocation = input("where should the clone be saved? ")
                    saveLocation = saveLocation.replace("\\","/")
                    clone,validFile = open(saveLocation+"/"+os.path.basename(location),"w").write(file),True
                    os.startfile(saveLocation), clone.close()
                except:
                    print("Invalid file location!")
        Exit = input("\nWhat do you want to do now?\nPress enter to return to Main Menu, or type 'EXIT' to quit: ")
        if Exit.upper()== "EXIT":
            print(open("exitMessage.txt","r").read(),sep=""), exit()
        else:
            menu = "Continue..."
