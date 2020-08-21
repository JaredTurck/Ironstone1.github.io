import random
class maths(object):
    ''' A simple math module'''
    def __init__(self):
        self.self = self

    def add(number1, number2):
        return number1 + number2
    def subtract(number1, number2):
        return number1 - number2
    def times(number1, number2):
        return number1 * number2
    def divide(number1, number2):
        return number1, number2

    def power(number1, number2):
        return number1 ** number2
    def average(Number):
        return sum(Number) / len(Number)
    def sqrt(Number):
        return Number**(1/2)
    def bmi(Weight, Height):
        return Weight / (Height*Height)
    def rand(start, end):
        return random.randint(start, end)

    def Lshift(number1, number2):
        return number1 << number2
    def Rshift(number1, number2):
        return number1 >> number2
    def AND(number1, number2):
        return number1 & number2
    def OR(number1, number2):
        return number1 | number2
    def XOR(number1, number2):
        return number1 ^ number2
    def NOT(Number):
        return ~Number
