import hashlib
hashedText = hashlib.sha512(b,)
hexHash = hashedText.hexdigest()
print(hexHash)
