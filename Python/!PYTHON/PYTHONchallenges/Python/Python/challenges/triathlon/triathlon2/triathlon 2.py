menu = input(open("Menu.txt","r").read())
while not menu in ["1","2"]:
    menu = input("Inccorect input!\n>>> ")
if menu == "1":
    File = (open("Info.txt","r").readlines())
    option = str()
    while option.upper() != "Y":
        DataValues = [[],[]]
        for i in range(len(File)):
            File[i] = File[i].rstrip("\n")
            user = input(File[i])
            DataValues[1].append(user), DataValues[0].append(File[i])
        print("\nIs the information bellow correct? [Y/N]:")
        for x in range(len(DataValues[1])):
            print(File[x],DataValues[1][x])
        option = input(">>> ")
        while not option.upper() in ["Y","N"]:
            option = input("Inccorect Input\n>>> ")
    input("Press enter to continue...")
    import csv, shutil, os
    CSVFile = open(str("CSVFiles/"+DataValues[1][1])+".csv","w", newline="")
    Writer = csv.writer(CSVFile)
    for II in range(len(DataValues[0])):
        Values = (DataValues[0][II],DataValues[1][II])
        Writer.writerow(Values)
    CSVFile.close()
