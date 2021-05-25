import bcrypt, getpass, gc
from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Cipher import PKCS1_OAEP

# ask user to vote
print("""Who are you voting for:
1. Conservative and Unionist Party
2. Labour Party
3. Scottish National Party
4. Liberal Democrats
5. Democratic Unionist Party
6. blank - don't vote for anyone""")
vote = getpass.getpass("> ")
while vote not in [str(i) for i in range(6)]:
    vote = getpass.getpass("Invalid Input!\n> ")
vote = vote.encode('utf-8')

# ask user for password
password = getpass.getpass("Enter password: ")
salt = bcrypt.gensalt()
hashedpw = bcrypt.hashpw(vote, salt)

# encrypt the vote using the hashed password
key = RSA.generate(1024, Random.new().read)
public_key = key.publickey()

encryptor = PKCS1_OAEP.new(public_key)
encrypted_text = encryptor.encrypt(vote)

# clear password and vote from memory
del password
del vote
gc.collect()
