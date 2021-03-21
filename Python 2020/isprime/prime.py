
def isprime(n):
    if n==2 or n==3: return True
    if n%2==0 or n<2:return False
    for i in range(3, int(n**.5)+1, 2):
        if n % i == 0:
            return False
    return True

def isprime2(n):
    return [True if True in [n==2, n==3, n%2==0, n<2] else [[False for i in range(3, int(n**.5)+1, 2) if n%i==0]!=[]]]

def testRange(n,start=3):
    for i in range(start,n):
        print(i, isprime2(i))

# is the number divisible by 2
# loop - do the same for all number up to the sqr_root(number)
# - skip all even numbers (except 2)


