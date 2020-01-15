class Challenge(object):
    __doc__ = """Python Programming challenges Advanced Level"""
    def __init__(self, task):
        self.task = task

    class IO_Problems():
        """I/O (Input / Output) Problems (string and numberic varibles)"""
        def task_1():
            name = input("Name: ")
            age = input("Age: ")
            while age.isdigit()!=True:
                age = input("Not a valid Input!\nAge: ")
            tv = input("favourite TV program: ")
            print("%s is %d years old and likes %s" % (name, int(age), tv))

        def task_2():
            f = input("First name: ")
            s = input("Surname: ")
            print(s, f,"\nYour names have",len(s),"and",len(f),"letters\n"+ \
                  "Your initials are %s %s" % (s[0], f[0]))

        def task_3():
            C = input("Carbon Atoms: ")
            while C.isdigit()!=True:
                C = input("Not a valid Input!\nCarbon Atoms: ")
            H = (int(C)*2)+2
            Mass = int(C)*12 + H
            print("The molecular mass of C%sH%d is %s" % (C, H, Mass))

    class Selection_Problems():
        """Selection Problems (IF, ELSE, ELIF)"""
        def task_1():
            T = str(print("Enter the Number of current temperature!"))
            while isinstance(T, int)!=True:
                try:
                    T = int(input("Temperature: "))
                except:
                    print("Not a valid Input!")
            if T <= 0:
                state = "Solid"
            elif  1 <= T <= 99:
                state = "Liquid"
            else:
                state = "Gas"
            print("At %d degrees centigrade, water will be %s" % (T, state))

        def task_2():
            total = []
            for i in range(3):
                while isinstance(total, int)!=True:
                    try:
                        total = sum([int(input("Friend %s: "%(i+1))) \
                                     for i in range(3)])
                    except:
                        print("Not a valid Input!")
            if total < 1000:
                bonus = total+100
            elif 1000 <= total <= 2000:
                bonus = total*2
            else:
                bonus = total
            print("Your have raised £%d, your total is £%d" % (total, bonus))

        def task_3():
            H, M = ("","")
            while isinstance(M, int)!=True:
                try:
                    H = float(input("Enter your height(M): "))
                    M = int(input("Enter your mass(kg): "))
                except:
                    print("Not a valid Input!")
            bmi = M / (H**2)
            if bmi < 18.5:
                state = "underweight"
            elif 18.6 <= bmi <= 24.9:
                state = "healthy weight"
            elif 25 <= bmi <= 25.9:
                state = "overweight"
            elif 30 <= bmi <= 39.9:
                state = "obese"
            else:
                state = "very obese"
            print("Your BMI is %s, you are %s." % (bmi, state))

    class Iteration():
        """Iteration (Unconditional loops)"""
        def task_1():
            print("Enter the time in seconds for each pupil:")
            total = 0
            for i in range(50):
                time = input("Pupil %d: " % (i+1))
                while time.isdigit()!=True:
                    time = input("Not a valid Input!\nPupil %d: " % (i+1))
                total += int(time)
            print("The average time was",round(total/50,2),"seconds")

        def task_2():
            List = [0,1]
            for i in range(10):
                List.append(List[len(List)-1]+List[len(List)-2])
            print("Fibonacci:",*List)

        def task_3():
            user = input("Iterations: ")
            while user.isdigit()!=True:
                user = input("Not a valid Input!\nIterations: ")
            List = [0,1]
            for i in range(int(user)):
                List.append(List[len(List)-1]+List[len(List)-2])
            print("Fibonacci (to %s places):" % (len(List)-2),*List)

        def task_4():
            loan = rate = year = ""
            while isinstance(loan+rate, float)!=True:
                try:
                    loan = float(input("Initial loan: £"))
                    year = int(input("Duration (years): "))
                    rate = float(input("Intrest rate: "))
                except:
                    print("Not a valid Input!")
            for i in range(year):
                print("Year %d: £%sx %s%s=£%s Total=£%s" %
                      (i+1, loan, rate, "%", loan/rate, (loan/rate)+loan))
                loan = (loan/rate)+loan

    class Iteration_Conditional():
        """Iteration (Conditional loops)"""
        def task_1():
            List = []
            for i in range(7):
                temp = 100
                while temp not in range(-40,56):
                    try:
                        temp = int(input("Temperature "+str(i+1)+": "))
                        if temp not in range(-40, 56):
                            print("Out of range Temperature!")
                    except:
                        print("Not a valid Input!")
                List.append(int(temp))
            print("This weeks average temperature was",str(int(sum(List)/7))+"°C")

        def task_2():
            import random
            number = random.randint(1,100)
            guess = str(print("Guess the hidden number between 1 and 100:"))
            count = 0
            while guess != number:
                guess = input("Guess: ")
                while guess.isdigit()!=True:
                    guess = input("Not a valid Input!\nGuess: ")
                guess = int(guess)
                if guess < number:
                    print("Higher!")
                else:
                    print("Lower!")
                count += 1
            print("Correct! Well Done. you took %s guesses!" % (count))

    class Lists():
        """Lists (Storing multiple examples of data)"""
        def task_1():
            Data = open("Challenge.Lists.Data.csv").readlines()
            Data = [i.split(",") for i in [line.replace("\n","") for line in Data]]
            for line in range(len(Data)):
                while len(Data[line][0]) < 10:
                    Data[line][0] += " "
                    
            H = A = ""
            while (H+A).isdigit()!=True:
                H = input("Max Horse Height (hands): ")
                A = input("Max Horse Age (years): ")
                if (H+A).isdigit()!=True:
                    print("Not a valid Input!")
            print("\nName:\t\t\tHeight:\t\tAge:")
            for Horse in Data:
                if int(H) >= int(Horse[1]) and int(A) >= int(Horse[2]):
                    print(*Horse,sep="\t\t")

        def task_2():
            Data = open("Challenge.Lists.task_2.csv").readlines()
            Data = [line.replace("\n","") for line in Data]
            Dict = {"Y":True,"N":False}
            going = []
            for friend in Data:
                user = input("Is %s Going? " % (friend))
                while user.upper() not in ["Y","N"]:
                    user = input("Not a valid Input!\nIs %s Going? "%(friend))
                going.append([friend,Dict[user.upper()]])
            print("\nParty List:")
            [print(friend[0]) for friend in going if friend[1] == True]

    class Functions():
        """Functions and Procedures"""
        def task_1():
            def multiply(num1, num2):
                return "%d X %d = %d" % (num1, num2, num1*num2)

            num1, num2 = ("", "")
            while (num1+num2).isdigit()!=True:
                num1 = input("Enter the first number: ")
                num2 = input("Enter the second number: ")
                if (num1+num2).isdigit()!=True:
                    print("Not a valid Input!")
            print(multiply(int(num1), int(num2)))

        def task_2():
            def drawstars(spaces, stars):
                print("_"*spaces + "*"*stars)
            print("Usage:>>> drawstars(<Spaces>,<starts>)\ne.g. drawstars(3,5)")
            user = ""
            while user[:10] != "drawstars(" or user[10:user.find(",")] \
            .isdigit()!=True or user[user.find(",")+1:-1].isdigit()!=True:
                user = input(">>> ")
            eval(user)

        def task_3():
            def drawstars(spaces, stars):
                return "_"*spaces + "*"*stars
            sp = st = ""
            while (sp+st).isdigit()!=True:
                sp = input("Spaces: ")
                st = input("Stars: ")
                if (sp+st).isdigit()!=True:
                    print("Not a valid Input!")
            print(drawstars(int(sp), int(st)))

        def task_4():
            user = [[""],[""]]
            grade = {"A":[80,100],"B":[70,79],"C":[60,69],"D":[50,59],
                     "E":[40,49],"F":[30,39],"U":[0,29]}
            def USMtoGrade(UMS):
                for mark in grade:
                    if UMS in range(grade[mark][0], grade[mark][1]+1):
                        return mark
            while str(user[0]+user[1]).isdigit()!=True:
                try:
                    user=[int(input("Enter Module %s: "%(i+1))) for i in range(2)]
                except:
                    print("Not a valid Input!")
            for i in range(2):
                print("Module %s:"%(i+1),USMtoGrade(user[i]))
            print("Overall Result:",USMtoGrade(int((user[0]+user[1])/2)))

while True:
    import codecs, sys
    option = ""
    MainMenu = codecs.open("menu.txt","r","utf-8").read()
    while option not in [str(i+1) for i in range(18)]:
        option = input("\n"*30+MainMenu)

    taskDir = {1:1,2:2,3:3,4:1,5:2,6:3,7:1,8:2,9:3,10:4,
            11:1,12:2,13:1,14:2,15:1,16:2,17:3,18:4}
    funcDir = {0:[1,3,"IO_Problems"],1:[4,6,"Selection_Problems"],2:[7,10,"Iteration"],
            3:[11,12,"Iteration_Conditional"],4:[13,14,"Lists"],5:[15,18,"Functions"]}
    for i in range(len(funcDir)):
        if int(option) in [i for i in range(funcDir[i][0], funcDir[i][1]+1)]:
            Class = funcDir[i][2]
    task = "task_"+str(taskDir[int(option)])
    getattr(getattr(Challenge, Class),task)()

    close = input("\npress enter to continue, or type exit to close...")
    if close.upper() == "EXIT":
        sys.exit()
