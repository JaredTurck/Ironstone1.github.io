import hashlib

username = hashlib.sha1(b"jaredcat").hexdigest()[:24]
input(username)
