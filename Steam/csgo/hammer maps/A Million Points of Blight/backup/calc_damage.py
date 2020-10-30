import os

def calc():
    count = 0
    bot_count = 0
    try:
        with open("damage.txt", "r") as file:
            for line in file.read().split("\n"):
                if "Damage Given to" in line:
                    count += int(line.split(" - ")[1].split(" ")[0])
                    bot_count += 1
                    
    except FileNotFoundError:
        with open("damage.txt", "w") as file:
            file.write("\n")

    finally: 
        print("\nbot count :"+str(bot_count)+"\nTotal Damage: "+str(count))
        os.popen("notepad.exe damage.txt")

calc()
