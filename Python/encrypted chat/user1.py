import Crypto
from Crypto.PublicKey import RSA
from Crypto import Random

random_generator = Random.new().read
key = RSA.generate(1024, random_generator)

publickey = key.publickey

encrypted = publickey.encrypt('encrypt this message', 32)


decrypted = key.decrypt(message)
