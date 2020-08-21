import csv
def Conform(aa,a,bb,b,cc,c,dd,d,ee,e):
    print("\n"+aa,a,"\n"+bb,b,"\n"+cc,c,"\n"+dd,d,"\n"+ee,e)
    conforms = input("is the information above correct? [Y/N]\n>>> ")
    while not conforms.upper() in ["Y","N"]:
        conforms = input("Inccorect input!\n>>> ")
    if conform.upper() == "Y":
        input("Press enter to continue...")
    elif conform.upper() == "N":
        print("Enter the following information!")
    return conforms

Logo = print(open("Logo.txt","r").read())
menu = input(open("Wellcome.txt").read())
while menu not in ["1","2"]:
    menu = input("Inccorect input!\n>>> ")
if menu == "1":
    conform = str()
    while conform.upper() != "Y":
        Name = input("Enter your Name: ")
        Event = input("Enter your Event: ")
        Location = input("Enter the location: ")

        AA, A, BB, B, CC, C, DD, D, EE, E = ("Name: ",Name,"Event: ",Event,"Location: ",
        Location,"","","","")
        conform = Conform(AA, A, BB, B, CC, C, DD, D, EE, E)

    conform = str()
    while conform.upper() != "Y":
        swim = input("Please enter the times for the following:\nSwim: ")
        T1, Cycle = input("Transition 1: "), input("Cycle: ")
        T2, Run = input("Transition 2: "), input("Run: ")
        AA, A, BB, B, CC, C, DD, D, EE, E = ("Swim: ",swim,"Transition 1: ",T1,
        "Cycle: ",Cycle,"Transition 2: ",T2,"Run: ",Run)
        conform = Conform(AA,A,BB,B,CC,C,DD,D,EE,E)
    File = csv.writer(str(Name)+".csv","w")
    File.write(Name), File.write(Event), File.write(Location), File.close()
