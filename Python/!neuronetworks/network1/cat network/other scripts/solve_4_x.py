import random, time

x = "8÷2(x+2)=16"

def cost(value, target):
    return value - target

def solve(equation):
    # get left hand side of equation
    equation = equation.replace('÷', '/')
    if equation.count('=') != 1:
        return "Failed to solve, please use only 1 equals sign in the equation!"
    part2solve = equation.split('=')[0]
    
    # add multiply sign before brackets
    i = 0
    while i < len(part2solve):
        if part2solve[i] == "(" and i > 1:
            part2solve = part2solve[:i] + "*" + part2solve[i:]
            i += 1
        i += 1
    
    # check that answer is number rather then equation
    answer = equation.split('=')[1]
    if answer.replace('.', '').replace('-', '').isdigit() != True:
        return "Failed to solve, please make sure you answer is a number!"
    answer = float(answer)
    
    # check that theres only 1 unknown variable
    values_to_solve = list(filter(None, [i if i.isalpha() else None for i in equation]))
    if len(values_to_solve) != 1:
        return "Failed to solve, please make sure there is only 1 unknow value!"
    
    # back propogation
    x = answer # init x equals answer
    learning_rate = 10**len(str(int(x)))
    last_move = 0 # left is 0, right is 1
    diffrence = 1
    time_last = time.time()+1

    while diffrence != 0:
        output = eval(part2solve.replace(values_to_solve[0], str(x)))
        diffrence = cost(output, answer)
        if type(diffrence) == complex:
            return "Unable to solve equation, x is an imaginary number!"

        # print
        if time.time() > time_last:
            #print(f"diffrence: {diffrence} leanring rate: {learning_rate}")
            time_last = time.time()+1
        print(f"diffrence: {diffrence} leanring rate: {learning_rate}")

        # check if its solved
        if diffrence == 0:
            print(f"{values_to_solve[0]} = {x}")

        # update weight x
        if diffrence > 0: # move left
            x -= learning_rate
            # adjust learning rate
            if last_move != 0:
                last_move = 1
                learning_rate /= 10
        else: # move right
            x += learning_rate
            # adjust learning rate
            if last_move != 1:
                last_move = 0
                learning_rate /= 10
