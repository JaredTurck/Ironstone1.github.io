import hashlib
hashlib.md5()
hashlib.sha1()
hashlib.sha224()
hashlib.sha256()
hashlib.sha384()
hashlib.sha512()
hashlib.new
    # md4 / md5
    # sha 1/224/256/384/512
    # ripemd160
    # whirlpool

Hash = ["md4","md5","sha1","sha224","sha256","sha384","sha512",
        "ripemd160", "whirlpool"]

def Hash(Algorithm, key):
    return [hashlib.new(Algorithm, key).hexdigest()][0]
