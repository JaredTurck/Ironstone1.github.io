

F = lambda x, y, z : (((x) & (y)) | ((~x) & (z)))
G = lambda x, y, z : (((x) & (z)) | ((y) & (~z)))
H = lambda x, y, z : ((x) ^ (y) ^ (z))
I = lambda x, y, z : ((y) ^ ((x) | (~z)))

def FF(a, b, c, d, x, s, ac):
    a += F((b), (c), (d)) + (x) + ac
    a = ROTATE_LEFT((a), (s))
    a += (b)
    
def GG(a, b, c, d, x, s, ac):
    a += G((b), (c), (d)) + (x) + ac
    a = ROTATE_LEFT((a), (s))
    a += (b)
 
def HH(a, b, c, d, x, s, ac):
    a += H((b), (c), (d)) + (x) + ac
    a = ROTATE_LEFT ((a), (s))
    a += (b)
 
def II(a, b, c, d, x, s, ac):
    a += I((b), (c), (d)) + (x) + ac
    a = ROTATE_LEFT ((a), (s))
    a += (b)



FF(a, b, c, d, x[ 0], S11, 0xd76aa478)
FF(d, a, b, c, x[ 1], S12, 0xe8c7b756)
FF(c, d, a, b, x[ 2], S13, 0x242070db)
FF(b, c, d, a, x[ 3], S14, 0xc1bdceee)
FF(a, b, c, d, x[ 4], S11, 0xf57c0faf)
FF(d, a, b, c, x[ 5], S12, 0x4787c62a)
FF(c, d, a, b, x[ 6], S13, 0xa8304613)
FF(b, c, d, a, x[ 7], S14, 0xfd469501)
FF(a, b, c, d, x[ 8], S11, 0x698098d8)
FF(d, a, b, c, x[ 9], S12, 0x8b44f7af)
FF(c, d, a, b, x[10], S13, 0xffff5bb1)
FF(b, c, d, a, x[11], S14, 0x895cd7be)
FF(a, b, c, d, x[12], S11, 0x6b901122)
FF(d, a, b, c, x[13], S12, 0xfd987193)
FF(c, d, a, b, x[14], S13, 0xa679438e)
FF(b, c, d, a, x[15], S14, 0x49b40821)
