import time

def func_1():
    pass_input = int("120") #pass_input = int(input("Please enter your credit at pass:"))
    defer_input = int("0")#defer_input = int(input("Please enter your credit at defer:"))
    fail_input = int("0")#fail_input = int(input("Please enter your credit at fail:"))

    if pass_input == 120 and defer_input == 0 and fail_input==0:
        print("Progress")

def func_2():
    #(lambda n : [print("Progress") if True in[n[0]=="120" and n[1]==n[2]=="0"]else None])([input("Please enter your credit at "+["pass","defer","fail"][i]+": ") for i in range(3)])
    

def func_3():
    values = []
    for i in ["pass", "defer", "fail"]:
        values.append(input("Please enter your credit at "+i+": "))

    [print("Progress") if True in [values[0]=="120" and values[1]==values[2]=="0"] else None]

def measure(func_name):
    start = time.time()
    func_name()
    print(time.time() - start)
