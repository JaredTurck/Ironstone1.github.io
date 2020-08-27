from PIL import ImageGrab
import hashlib, os, time

def randint_1(num1, num2):
    RanNum = int(hashlib.sha384(ImageGrab.grab().tobytes()).hexdigest(), 16)

    return (RanNum % ((num2+1)-num1)) + num1


def ranint_2(n1, n2):
    if os.path.exists("n.txt") == False:
        open("n.txt", "w").write("0")
    else:
        f1 = int(open("n.txt", "r").read())
        open("n.txt", "w").write(str(f1 + 1))
        
    print(f1)

def randint_3(n1, n2):
    RanNum = int(hashlib.sha1(str(time.time()).replace(".","").encode("utf-8")).hexdigest(), 16)
    return (RanNum % ((n2+1)-n1) + n1)
    

def test_accuracy(n1=0, n2=1):
    dict_counter = {}
    
    for i in range(1000000):
        new_num = randint_3(n1, n2)
        if new_num in dict_counter:
            dict_counter[new_num] += 1
        else:
            dict_counter[new_num] = 1

    [print(i) for i in str(dict_counter).split(", ")]
