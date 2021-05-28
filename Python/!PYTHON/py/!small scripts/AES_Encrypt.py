import hashlib, base64
from Crypto import Random
from Crypto.Cipher import AES

class AESCipher():
    def __init__(self, key):
        self.private_key = hashlib.sha256(key.encode()).digest()
        self.bs = AES.block_size

    def encrypt(self, data):
        # generate public key
        public_key = Random.new().read(self.bs)

        # setup AES Cipher using public key and private key
        cipher = AES.new(self.private_key, AES.MODE_CBC, public_key)

        # enrpyt the data and convert to base64
        return base64.b64encode(public_key + cipher.encrypt(self.pad(data).encode()))

    def decrypt(self, enc):
        # convert encrypted data to base 64
        enc = base64.b64decode(enc)

        # get public key
        public_key = enc[:AES.block_size]

        # setup AES Cipher using public and private key
        cipher = AES.new(self.private_key, AES.MODE_CBC, public_key)

        # decrypt data using the public key
        return self.unpad(cipher.decrypt(enc[AES.block_size:])).decode("utf-8")

    def pad(self, s):
        # pads data so that it's a multiple of 16
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    def unpad(self, s):
        # removes padding
        return s[:-ord(s[len(s)-1:])]

cipher = AESCipher("your secret key")
