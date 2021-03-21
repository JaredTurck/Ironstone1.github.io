import math, time, random, os
import matplotlib.pyplot as plot
from decimal import Decimal

def check_digits(num, do_return=False):
    print("Checking digits!")
    correct_digits = open("10_million_digits.txt", "r").read().replace(".", "")
    num = str(num)

    for i in range(len(num)):
        if num[i] != correct_digits[i]:
            if do_return == True:
                return i
            else:
                wrong = "num '" +num[i-2:i+3]+ "' correct '"+correct_digits[i-2:i+3]+"'"
                print(f"Failed at digit {i}! {wrong}")
                return i
    print(f"passed, accurate up to {i}!")
    return i

def pi_chudnovsky(one=1000000, do_check=True, itter=None):
    """
    Calculate pi using Chudnovsky's series

    This calculates it in fixed point, using the value for one passed in
    """

    if do_check == True:
        dif = Decimal("0.0003415306235038056316982386523")*itter / 60
        print(f"Estimated to take {dif} mins!")
    
    k = 1
    a_k = one
    a_sum = one
    b_sum = 0
    C = 640320
    C3_OVER_24 = C**3 // 24
    while 1:
        a_k *= -(6*k-5)*(2*k-1)*(6*k-1)
        a_k //= k*k*k*C3_OVER_24
        a_sum += a_k
        b_sum += k * a_k
        k += 1
        if a_k == 0:
            break
        
        if do_check == True:
            if k % 1000 == 0:
                print(f"Itteration={k}!")
            
    total = 13591409*a_sum + 545140134*b_sum
    pi = (426880*sqrt(10005*one, one)*one) // total
    return pi

def sqrt(n, one):
     """
     Return the square root of n as a fixed point number with the one
     passed in.  It uses a second order Newton-Raphson convergence.  This
     doubles the number of significant figures on each iteration.
     """
     # Use floating point arithmetic to make an initial guess
     fpp = 10**16
     n_float = float((n * fpp) // one) / fpp
     x = (int(fpp * math.sqrt(n_float)) * one) // fpp
     n_one = n * one
     while 1:
         x_old = x
         x = (x + n_one // x) // 2
         if x == x_old:
             break
     return x

def main(itterations=10000, write_2_file=False, do_check=True, do_return=True):
    result = pi_chudnovsky(1000000**int(itterations/5.9), do_check=do_check, itter=itterations)
    accuracy = check_digits(result, do_return=do_return)
    
    if accuracy >= itterations:
        if write_2_file == True:
            with open("output.txt", "w") as file:
                file.write("3." + str(result)[1:itterations+1])
            check_file()
        else:
            return "3." + str(result)[1:itterations+1]
    else:
        raise ValueError(f"Result only accurate too {accuracy} places!")

def time_func(func, arg1, arg2, arg3):
    start = time.time()
    func(arg1, arg2, arg3)
    end = time.time()
    duration = (end-start)
    print(f"took {duration} seconds to process {arg1} digits!")
    return duration

def benchmark():
    time_func(main, 1000, False, False)
    time_func(main, 10000, False, False)
    time_func(main, 100000, False, False)
    time_func(main, 200000, False, False)
    time_func(main, 1000000, True, True)

def graph(itter=100):
    points = []
    for i in range(1, itter):
        points.append([i, time_func(main, 1000*i, False, False)])

    # write points to csv
    try:
        file = open("graph_points.csv", "w")
    except:
        file = open(str(random.randint(1000,10000)) + ".csv", "w")
        
    for i in points:
        file.write(str(i[0]) + "," + str(i[1]) + "\n")
    file.close()

    # get average diffrence
    averages = []
    previous_av = 0
    for i in points:
        current_av = Decimal(i[1] / i[0])
        diffrence = current_av - previous_av
        previous_av = current_av
        averages.append(diffrence)
        
    print("Average diffrence between points: ", Decimal(sum(averages)/len(averages)))
    
    # graph
    y = [i[0] for i in points]
    x = [i[1] for i in points]
    plot.fill_between(x, y)
    plot.show()

def check_file(filename="output.txt"):
    print("Checking digits stored in file!")
    file = open(filename, "r").read()
    check_digits(file.replace(".", ""))

def add_commas(n):
    p = [i[1]+"," if (i[0]+1)%3==0 else i[1] for i in enumerate(str(n)[::-1])]
    return (lambda x : [x[1:] if x[0]=="," else x][0])("".join(p)[::-1])

def get(itter=1000000):
    print("generating "+add_commas(itter)+" digits of π!")
    main(itter, True, True, False)
    os.popen("pause")

get(1000000)
