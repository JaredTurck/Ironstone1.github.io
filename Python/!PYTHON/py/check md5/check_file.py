import hashlib, tkinter, os
from tkinter import filedialog

window = tkinter.Tk()
window.withdraw()

def check_md5(fname):
    md5_hash = hashlib.md5()
    with open(fname, "rb") as file:
        for chunk in iter(lambda: file.read(), b""):
            md5_hash.update(chunk)
        return md5_hash.hexdigest()

file_path = filedialog.askopenfiles()

for file in file_path:
    print("\nName:", file.name.split("/")[-1])
    print("Size:", str(round(os.path.getsize(file.name) /1024 /1024, 2))+"MB")
    print("MD5:", check_md5(file.name))
