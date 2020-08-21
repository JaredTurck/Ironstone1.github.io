import getpass, bcrypt
user = input("Enter your Account username: ")
try:
    file = open("Data.csv","r").read()
except:
    open("Data.csv","w").close()
    file = open("Data.csv","r").read()

while user in file:
    user = input("Your user name is taken!\nUserName: ")
    
password, conform = "password", "conform"
while password != conform:
    password = getpass.getpass("Enter your Password: ")
    conform = getpass.getpass("Conform your password: ")
    if password != conform:
        print("Your Passwords do not match!")
        
salt = bcrypt.gensalt()
Hash = bcrypt.hashpw(password.encode("utf-8"),salt)
open("Data.csv","a").write(user+","+Hash.decode("utf-8")+","+salt.decode("utf-8")+"\n")
