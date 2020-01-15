import hashlib
password = input("Type password: ")
passHash = hashlib.sha512(password.encode("ascii")).hexdigest()
check = input("Enter your password again: ")
checkHash = hashlib.sha512(check.encode("ascii")).hexdigest()
password = check = None
if passHash == checkHash:
    print("Acsess Granted")
else:
    print("Your Passwords Do not Match")

password = input("Type password: ")
Check = input("Type password again:")
if password == Check:
    print("acsess granted")
else:
    print("Your password Do not match")
