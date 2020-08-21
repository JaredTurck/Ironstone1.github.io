#multiple of 3 = Fizz
#multiple of 5 = Buzz
#multiple of both = FizzBuzz

def fizzbuzz(n):
    if [n % 3, n % 5] == [0, 0]:
        return "FizzBuzz"
    elif n % 3 == 0:
        return "Fizz"
    elif n % 5 == 0:
        return "Buzz"
    else:
        return n

#for i in range(1,100):
#    print(fizzbuzz(i))

def fizzbuzz2(n):
    return (lambda x,n : [n if x=="" else x])(["Fizz","",""][n % 3]+["Buzz","","","",""][n % 5], n)[0]
