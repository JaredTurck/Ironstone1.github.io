score_counter=0
name=str(input("what is your name: "))
print("===========================================")
print("Hello,",name," welcome to the quiz")
print("===========================================")
input()
def question():
    print("======================================")
    print("           Question",questions,"      ")
    print("======================================")
# ================ question 1 ================ #
questions = 1
question()
questions1=input("""question one: which of the following is a goat cheese?
A) Cheddar
B) Caprino
C) Stilton
D) brie
Enter your answer: """)
questions1=questions1.upper()
if questions1 == "B":
    print("welldone that is the correct answer")
    score_counter = score_counter+1
    print("your score is ",score_counter,"/3")
elif questions1 == "A" or questions1== "C" or questions1== "D":
    print("wrong the answer was B) caprino")
else:
    print("incorrect input")
input()
# ================ question 2 ================ #
questions = 2
question()
questions2=input("""question two: how maney physical cores does a i3 have?
A) 8 physical cores 
B) 4 physical cores 
C) 6 physical cores 
D) 2 physical cores  
Enter your answer: """)
questions2=questions2.upper()
if questions2 == "D":
    print("welldone that is the correct answer")
    score_counter = score_counter+1
    print("your score is ",score_counter,"/3")
elif questions2 == "A" or questions1== "C" or questions1== "B":
    print("wrong the answer was D) 2 physical cores")
else:
    print("incorrect input")
input()
# ================ question 3 ================ #
questions = 3
question()
questions3=input("""question three: how many bits in a byte?
A) 8
B) 10
C) 6
D) 12
Enter your answer: """)
questions3=questions3.upper()
if questions3 == "A":
    print("welldone that is the correct answer")
    score_counter = score_counter+1
    print("your score is ",score_counter,"/3")
elif questions3 == "B" or questions1== "C" or questions1== "D":
    print("wrong the answer was A) 8")
else:
    print("incorrect input")
input()


