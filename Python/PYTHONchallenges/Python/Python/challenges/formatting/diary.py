import msvcrt, time, ast
file = open("Text.txt").read()
Main = input(open("Info.txt","r").read())
while not Main in ["1","2","3"]:
          Main = input("Inccorect Input!\n>>> ")
if Main == "1":
          valid = print("Enter in the path + file you want to import. e.g 'C:\...\Session.txt':")
          while valid != True:
                    try:
                              path = input("Path+file > ")
                              text, valid = tuple(ast.literal_eval(open(path,"r").read())), True
                    except:
                              print("Not a valid Path!")
elif Main == "2":
          text = tuple("_" for i in range(3400))
elif Main == "3":
          input("Press enter to EXIT!"),exit()
count = 0
key = b"\x08"
while True:
          if count >= 3400:
                    count = 0
          if key != b'\xff':
                    if ord(key) == 13:
                              line = 0
                              for i in range(0,count,100):
                                        line += 1
                              count = line*100
                    elif ord(key) == 224:
                              key = msvcrt.getch()
                              if ord(key) == 72: # UP
                                        count -= 100+1
                              elif ord(key) == 80: # DOWN
                                        count += 100-1
                              elif ord(key) == 75: # LEFT
                                        count -= +2
                              elif ord(key) == 77: # RIGHT
                                        count += 0
                              elif ord(key) == 71: # HOME
                                        count = input("COUNT: ")
                                        while count.isdigit()==False:
                                                  count = input("Incorect Input: ")
                                        count = int(count)
                              elif ord(key) == 79: # END
                                        menu = input("Menu:\n1) Save Session\n2) EXIT without saving\n>>> ")
                                        while not menu in ["1","2"]:
                                                  menu = input("Inccorect Input!\n>>> ")
                                        if menu == "1":
                                                  name = input("Enter name for this session: ")
                                                  save = open("Sessions/"+name+".txt","w").write(str(TextList))
                                        elif menu == "2":
                                                  exit()
                    elif ord(key) == 27: # ESC
                              text = tuple("_" for i in range(3400))
                              count = 0
                    try:
                              TextList = list(text)
                              if key.decode("ascii") in list(open("Ascii.txt","r").read()):
                                        TextList[count] = key.decode("ascii")
                                        count += 1
                              elif key == b'\x08':
                                        TextList[count-1] = "_"
                                        count -= 1
                                        if count < 0:
                                                  count = 0
                                                  
                              text = tuple(TextList)
                              if key.decode("ascii") in list(open("Ascii.txt","r").read()):
                                        print("\n"*2,file % (text+tuple((key).decode("utf-8"))),"\n"*2,sep="")
                              else:
                                        print("\n"*2,file % (text+tuple("_")),"\n"*2,sep="")
                              time.sleep(0.04)
                    except:
                              pass
          key = msvcrt.getch()
