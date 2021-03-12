# input function added to beginning of file
def input(*args):
    # check if modules imported
    modules = ["time", "hashlib"]
    for mod in modules:
        if mod not in locals():
            import time, hashlib

    # read the files contents
    try:
        # get initial hashs
        file_contents = open("input.txt", "rb").read()
        first_hash = hashlib.md5(file_contents).hexdigest()
        current_hash = hashlib.md5(file_contents).hexdigest()
        
        # loop until file contents changes
        while first_hash == current_hash:
            time.sleep(0.1)
            file_contents = open("input.txt", "rb").read()
            current_hash = hashlib.md5(file_contents).hexdigest()

        # return the files contents and resume execuation of script
        return file_contents.decode("utf-8")

    # input.txt doesn't exist create it
    except FileNotFoundError:
        open("input.txt", "w")
        return ""

    # the file cant be read for some other reason so return an empty string
    except:
        return ""

# the users code
def fib(x):
    a, b = 0, 1
    for i in range(x):
        a, b = b, a+b
        print(a, end=" ")

fib(int(input("places: ")))
