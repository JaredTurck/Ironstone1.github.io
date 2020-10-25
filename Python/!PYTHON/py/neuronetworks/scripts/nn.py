import numpy

# measurement 1-2, weight 1-2, bias
def NN(m1, m2, w1, w2, b):
    z = m1 * w1 + m2  * w2 + b
    return sigmoid(z)

# squshification function, produces output between 0 and 1
def sigmoid(x):
    return 1/(1 + numpy.exp(-1))

# takes in data, and predicion, then returns number based on how bad the computers predicion is
# 4 is target value, so returned number is higher the further the predicions is from target
def cost(b): # b is predicion
    return (b - 4) ** 2 # square(prediction - target)

def num_slope(b):
    h = 0.0001 # learning rate, how much to adjust the weights by
    return (cost(b+h) - cost(b))/h

def slope(b):
    return 2 * (b - 4)


# wegihts and bias are random to start with
w1 = numpy.random.randn()
w2 = numpy.random.randn()
b = numpy.random.randn()


b = 9999

# training loop
for i in range(100):
    b = b -.1 * slope(b)
    print(b)
