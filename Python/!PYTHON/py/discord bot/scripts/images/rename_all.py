import os

path = "/".join(__file__.split("\\")[:-1])
files = os.listdir(path)

count = 0
for index, file in enumerate(files):
    extension = file.split(".")[-1]
    if extension in ["jpg", "png", "gif"]:
        os.rename(os.path.join(path, file), os.path.join(path, "%05d"%count+"."+extension))
        count += 1
        print("["+str(count)+"]renamed file " + file)

input("Press enter to close...")
