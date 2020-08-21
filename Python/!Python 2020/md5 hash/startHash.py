import hashlib

Hash = "Sabrina1#"
digest = hashlib.md5(Hash.encode("UTF-8")).hexdigest()
print(digest)
