import os
file = open("start.txt","r").read()
question, score = open("questions.txt","r").readlines(), 0
for i in range(int(len(question)/6)):
          print("\n"*8,*file % (i+1),*question[i*6:(i*6)+5],sep="")
          if i == 3:
                    os.system("start img/Death.png") 
          elif i == 10:
                    os.system("start img/Logo.png")
          user = input(">>> ")
          while not user in ["1","2","3","4"]:
                    user = input("Inccorect Input!\n>>> ")
          if user == question[(i*6)+5][0]:
                    score += 1
if score <= int(int(len(question)/6)/2):
          print(open("bad.txt","r").read())
else:
          print(open("welldone.txt","r").read())
print("You scored",str(score)+"/"+str(int(len(question)/6))),input()
