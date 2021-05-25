import hashlib, getpass

password = getpass.getpass("Enter password: ")
digest = hashlib.sha512(password.encode("utf-8")).hexdigest()
print(digest)
