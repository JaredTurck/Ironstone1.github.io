import numpy as np
from PIL import Image
import math

class network:
    def __init__(self, inputs, neurons):
        self.weights = 0.01 * np.random.randn(inputs, neurons)
        self.biases = np.zeros((1, neurons))

    def forward(self, inputs):
        """ forward pass p1*w1 + p2*w2 + p3*w3 + ... """
        self.output = np.dot(inputs, self.weights) + self.biases

    def relu(self, inputs):
        """ relu activation - if n > 0 return n, else return 0 """
        self.output = np.maximum(0, inputs)

    def softmax(self, inputs):
        """ exponentiate and  normalise values """
        normalised = np.exp(inputs - np.max(inputs, axis=1))
        self.output = normalised / np.sum(normalised, axis=1)

    def sigmoid(self, inputs):
        """ sigmoid activation, e=euler's number, sigmoid = 1 / (1 + e^-x)"""
        self.output = 1 / (1 + np.exp(-inputs))

    def linear_activation(self, inputs):
        self.output = inputs

    def loss(self, inputs, target_output):
        self.loss = -sum([math.log(inputs[i])*target_output[i] for i in range(len(inputs))])

    def cost(self, inputs):
        values = 0
        for i in range(len(inputs)):
            values += inputs[i] ** 2
        self.cost = values
            
class data_handler:
    def resize_img(filename, psize=[16, 16]):
        current = Image.open(filename).resize((psize[0], psize[1]))
        return [i[0] + i[1] + i[2]/3 for i in current.getdata()]

# load cat image - input data
X = np.array([data_handler.resize_img('cat1.jpg')])

# init weights and bias for layer 1
# inputs, neurons is the shape of inputs
layer1 = network(len(X[0]), 64)
layer1.forward(X) # pass data into layer 1
layer1.relu(layer1.output) # use relu activation function
print(layer1.output) # print layer 1 output

# init layer 2
layer2 = network(64, 32)
layer2.forward(layer1.output) # pass data through layer 2
layer2.relu(layer2.output) # use relu activation on hidden layer
print(layer2.output) # print layer 2 output

# init output layer
layer3 = network(32, 2) # init output layer
layer3.forward(layer2.output) # pass data through layer 3
layer3.softmax(layer3.output) # use softmax activation
print(layer3.output) # print later 3 output

# loss
target_output = [1, 0]
layer3.loss(layer3.output[0], target_output)
loss = layer3.loss
print(loss)

layer3.cost(layer3.output[0])
print(layer3.cost)
