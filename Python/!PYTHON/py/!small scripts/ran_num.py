from PIL import ImageGrab
import hashlib

def randint(num1, num2):
    RanNum = int(hashlib.sha384(ImageGrab.grab().tobytes()).hexdigest(), 16)

    return (RanNum % ((num2+1)-num1)) + num1

def test_accuracy(n1=0, n2=1):
    dict_counter = {
        0 : 0,
        1 : 0,
    }
    
    for i in range(100):
        dict_counter[randint(n1, n2)] += 1

    [print(i) for i in str(dict_counter).split(", ")]
