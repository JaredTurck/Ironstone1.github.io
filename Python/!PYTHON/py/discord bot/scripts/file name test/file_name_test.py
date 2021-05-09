import os

min_chr = 0
max_chr = 1114111

banned_chrs = {}

# create files
input("press enter to start... ")
for c in range(min_chr, max_chr):
    try:
        with open(chr(c)+".txt", "wb") as file:
            file.write(b'')
    except:
        print("The character '" + chr(c) + "' failed!")
        banned_chrs[c] = chr(c)
        
    finally:
        if c % 1000 == 0:
            print("Checked " + str(c) + " characters!")

# delete files
for c in range(min_chr, max_chr):
    try:
        os.remove(chr(c)+".txt")
    except: pass
    finally:
        if c % 1000 == 0:
            print("deleted " + str(c) + " files!")
            
print(str(len(banned_chrs.keys())) + " banned characters found")
