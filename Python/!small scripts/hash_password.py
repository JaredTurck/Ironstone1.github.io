import hashlib, getpass

while True:
    paswd = getpass.getpass("Enter Password: ")
    ohash = hashlib.md5(paswd.encode("utf-8")).hexdigest()
    print("Password Hash:", ohash)
    input()
