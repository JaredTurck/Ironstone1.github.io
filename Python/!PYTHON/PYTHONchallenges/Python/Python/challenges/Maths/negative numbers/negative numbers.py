import random
score = 0
print(open("logo.txt","r").read())
for Questions in range(5):
    print("\nQUESTION",str(Questions+1)+"/5:")
    orderValues = ["Smallest","Largest"]
    order = orderValues[random.randint(0,1)]
    numbers = []
    while len(numbers) < 5:
        temp = random.randint(-100,100)
        if not temp in numbers:
            numbers.append(temp)
    print("Write the following numbers in size order,",order,"first:\n",*numbers)
    userList = []
    for I in range(len(numbers)):
        user = input("Number "+str(I+1)+": ")
        valid = False
        while valid != True:
            while not user in [str(numbers[ii]) for ii in range(len(numbers))]:
                user = input("Invalid Input!\nNumber "+str(I+1)+": ")
            if user in userList:
                user = print("You have allready entered this number or,")
            else:
                valid = True
        userList.append(user)
    userList = [int(userList[i]) for i in range(len(userList))]
    if order == "Smallest" and userList == sorted(userList):
        score = score + 1
    elif order == "Largest" and userList == sorted(userList, reverse = True):
        score = score + 1
    else:
        print("Wrong! the correct answer:\nSmallest to largest:",*sorted(userList))
        print("Largest to smallest:",*sorted(userList, reverse = True))
if score <= 2:
    print(open("notgood.txt","r").read())
elif score >= 3:
    print(open("welldone.txt","r").read())
print("You scored",score,"/ 5")
