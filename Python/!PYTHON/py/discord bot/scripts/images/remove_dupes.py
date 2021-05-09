import os, pathlib, hashlib

def hash_file(filename):
    md5 = hashlib.md5()
    with open(filename, 'rb') as f:
        while True:
            data = f.read(65536)
            if not data:
                break
            md5.update(data)
            
    return md5.hexdigest()

def remove_duplicates(dir):
    count = 0
    unique = []
    for filename in os.listdir(dir):
        if os.path.isfile(filename):
            filehash = hash_file(filename)
            if filehash not in unique: 
                unique.append(filehash)
            else: 
                os.remove(filename)
                print("[+] removed duplicate " + filename)
        count += 1
        if count % 100 == True:
            print("checking file " + str(filename))

def rename_files():
    path = "/".join(__file__.split("\\")[:-1])
    files = os.listdir(path)

    count = 0
    for index, file in enumerate(files):
        extension = file.split(".")[-1]
        if extension in ["jpg", "png", "gif"]:
            os.rename(os.path.join(path, file), os.path.join(path, "%05d"%count+"."+extension))
            count += 1
            print("["+str(count)+"]renamed file " + file)
            
# main
path = pathlib.Path(__file__).parent.absolute()
input("[+] Duplicate files in '"+str(path)+"' will be removed!\nPress enter to continue...")
print("[+] running script 5 times...")
for i in range(1, 4):
    remove_duplicates(path)
    print("[+] Itteration "+str(i)+"/3 Complete!")

# rename files
rename_files()
