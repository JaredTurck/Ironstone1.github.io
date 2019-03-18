import time

open("count.txt", "w").write("0")
while True:
    time.sleep(1)
    f = open("count.txt").read()
    with open("count.txt", "w") as file:
        file.write(str(int(f) + 1))
