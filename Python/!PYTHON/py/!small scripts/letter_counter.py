import tkinter, re, time
from tkinter import filedialog

def isprintable(s):
    if s == "\n":
        return "New Line"
    elif s == "\t":
        return "Tab"
    elif s == " ":
        return "Space"
    
    if s.isprintable():
        return s
    else:
        return f"0x{ord(s)}"

r = tkinter.Tk()
r.withdraw()
file_path = filedialog.askopenfilename()

print("[+] Reading file...")
file = open(file_path, encoding="ISO-8859-1").read()
print("[+] File read!\n[+] Getting list of characters...")
alpha = list(set(file))
print("[+] Got list of characters!")
used = {}

print("[+] Counting characters!")
last = time.time()
for i,letter in enumerate(alpha):
    used[letter] = file.count(letter)
    if time.time() > last+5:
        last = time.time()
        print(f"[+] Counted {i}/{len(alpha)} letters")

print("[+] Finished counting!")

# sort dict
print(file_path+"\nMost used letters: ")
s = list(reversed(sorted([[used[key], key] for key in used.keys()])))
for i in s:
    print(i[0], "\t", isprintable(i[1]))

# remove special chars
for i in [' ', '\n', '\t']:
    if i in alpha:
        alpha.remove(i)

# count double chars
file = file.lower()
used2 = {}
for i in range(len(alpha)):
    for ii in range(len(alpha)):
        current_letters = alpha[i] + alpha[ii]
        used2[current_letters] = file.count(current_letters)
        if time.time() > last+5:
            last = time.time()
            print(f"[+] Counted {i}:{(ii/len(alpha))*100} of {len(alpha)}")

# sort dict
print(file_path+"\nMost used letter combinations: ")
s = list(reversed(sorted([[used2[key], key] for key in used2.keys()])))
for i in s:
    if i[0] > 0:
        print(f"{i[0]}\t{isprintable(i[1][0])}{isprintable(i[1][1])}")
