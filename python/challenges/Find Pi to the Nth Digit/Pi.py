def pi():
    M = "How many digits of Pi would you like to display? "; N = input(M)
    while (N.isdigit() != True):
        N = input("Invalid Input!\n" + M)
    return [3 if N == "0" else float(open("pi-10^9.txt", "r").read()[:int(N)+2])][0]

print("Pi:", pi())
