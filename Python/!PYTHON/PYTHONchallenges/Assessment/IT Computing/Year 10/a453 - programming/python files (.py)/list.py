hightscore = [125,63,35,12]
print(hightscore)
print(hightscore[0])
print(hightscore[1])
print("\n")

hightscore = [125,63,35,12]
print(len(hightscore)) #print how maney numbers are in the list
print("\n")

hightscore = [125,63,35,12]
hightscore[0] = 127 #chages the value of the first number in list to 127
print(hightscore)
print("\n")

hightscore = [125,63,35,12]
hightscore.append(8) #adds a exra value to the end of list
print(hightscore)
print("\n")

hightscore = [125,63,35,12]
print(hightscore[:2]) #prints hightscore vlaue 1 and 2
print(hightscore[1:2]) #prints hightscore value 2
print("\n")

hightscore = [125,63,35,12,35]
hightscore.sort() # sort the numbers from smallest to largest
print(hightscore)
hightscore.reverse() # prints the list in reverse
print(hightscore)
x=hightscore.count(35) # counts how maney 35's there are in the variable hightscore then prints the number
print(x)

input("")
