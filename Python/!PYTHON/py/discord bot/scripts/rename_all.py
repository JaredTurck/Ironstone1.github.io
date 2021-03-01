import os

path = "/".join(__file__.split("\\")[:-1])
files = os.listdir(path)

count = 0
for index, file in enumerate(files):
    if file.split(".")[-1] == "jpg" or file.split(".")[-1] == "png":
        os.rename(os.path.join(path, file), os.path.join(path, "%05d"%count+".png"))
        count += 1
        print("["+str(count)+"]renamed file " + file)

input("Press enter to close...")
