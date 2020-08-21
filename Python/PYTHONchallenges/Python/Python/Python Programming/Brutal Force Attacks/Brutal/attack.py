a = "abcdefghijklmnopqrstuvwxyz"
current = ""
for ii in range(len(a)+1):
    for i in range(len(a)):
        print(current + a[i])
    current = a[ii]
