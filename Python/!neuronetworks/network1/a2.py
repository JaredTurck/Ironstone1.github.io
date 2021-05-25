import numpy as np

def sigmoid(x):
    return 1  / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)

X = np.array([[0, 0, 1],
              [1, 1, 1],
              [1, 0 ,1],
              [0, 1, 1]])

training_outputs = np.array([[0, 1, 1, 0]]).T

weights = 2 * np.random.random((3, 1))-1

print('weights before training', weights)

for itter in range(100000):
    layer1_input = X
    output = sigmoid(np.dot(layer1_input, weights))
    error = training_outputs - output
    adjustments = error * sigmoid_derivative(output)

    weights += np.dot(layer1_input.T, adjustments)

print('weights after training', weights)

print('output after training', output)
