from matplotlib import pyplot as plt
import numpy as np

data = [[3,     1.5,    1],
        [2,     1,      0],
        [4,     1.5,    1],
        [3,     1,      0],
        [3.5,   0.5,    1],
        [2,     0.5,    0],
        [5.5,   1,      1],
        [1,     1,      0]]

myster_flower = [4.5, 1]

w1 = np.random.randn()
w2 = np.random.randn()
b = np.random.randn()

def sigmoid(x):
    return 1/(1+np.exp(-x))

def sigmoid_p(x):
    return sigmoid(x) * (1-sigmoid(x))

T = np.linspace(-5, 5, 10)
Y = sigmoid(T)

#plt.plot(T, Y)

#training loop

learning_rate = 0.005
costs = []

for i in range(10000):
    ri = np.random.randint(len(data))
    point = data[ri]

    z = point[0] * w1 + point[1] * w2 + b
    pred = sigmoid(z)

    target = point[2]
    cost = np.square(pred - target)

    costs.append(cost)

    if i % 1000 == 0:
        print(cost)

    dcost_pred = 2 * (pred - target)
    dpred_dz = sigmoid_p(z)
    dz_dwl = point[0]
    dz_dw2 = point[1]
    dz_db = 1

    dcost_dz = dcost_pred * dpred_dz

    dcost_dwl = dpred_dz * dz_dwl
    dcost_dw2 = dpred_dz * dz_dwl
    dcost_db = dcost_dz * dz_db

    w1 = w1 - learning_rate * dcost_dwl
    w2 = w2 - learning_rate * dcost_dw2
    b = b - learning_rate * dcost_db


