menu = input(open("Menu.txt","r").read())
while not menu in ["1","2"]:
    menu = input(open("Menu.txt","r").read())
score = 0
if menu == "1":
    for i in range(10):
        print("\nQuestion ",i+1,"/10:",sep="")
        import random
        Number = []
        WordList = open("Words.txt","r").readlines()
        WordTens = open("Tens.txt","r").readlines()
        Word = [x.strip("\n") for x in WordList]
        WordTens = [X.strip("\n") for X in WordTens]
        for _ in range(4):
            Number.append(random.randint(1,9))
        print("Write the number",Word[Number[0]],"thousand,",Word[Number[1]]
              ,"hundred and",WordTens[Number[2]],Word[Number[3]],"in Figures:")
        user = input(">>> ")
        if list(map(int, user)) == Number:
            print("Welldone! you have entered the correct answer: ",*Number,sep="")
            score = score + 1
        else:
            print("Wrong! the correct answer was: ",*Number,sep="")
    print("Your total score is",score,"/",i+1)
    if score <= 6:
        print(open("notgood.txt","r").read())
    elif score >= 7:
        print(open("welldone.txt","r").read())
elif menu == "2":
    input("Press enter to continue..."), exit()
