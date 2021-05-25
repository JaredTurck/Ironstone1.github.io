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

    def cost_layer(self, inputs, target_output):
        """ cost function add the output subtract excepted output, sqaured
        (network output - expected output)^2 + (... - ...)^2 """
        values = 0
        for i in range(len(inputs)):
            values += (inputs[i] - target_output[i]) ** 2
        self.cost = values

    def cost_one_weight(self, inputs, target_output):
        return (inputs - target_output) ** 2
            
class data_handler:
    def resize_img(filename, psize=[16, 16]):
        current = Image.open(filename).resize((psize[0], psize[1]))
        return [i[0] + i[1] + i[2]/3 for i in current.getdata()]

# load cat image - input data
X = np.array([data_handler.resize_img('cat1.jpg')])

# init layers - init weights and bias for layer 1
# inputs, neurons is the shape of inputs
layer1 = network(len(X[0]), 64) # init layer 1
layer2 = network(64, 16) # init layer 2
layer3 = network(16, 5) # init output layer
# output layer gives output the same length as input

# make the target values 0 and 1 (one hot encoding)
target_output = [0,0,0,1,0]

for i in range(80): # 10 itterations

    # pass through layer 1
    layer1.forward(X) # pass data into layer 1
    layer1.relu(layer1.output) # use relu activation function
    #print("layer 1: ", layer1.output) # print layer 1 output

    # pass through layer 2
    layer2.forward(layer1.output) # pass data through layer 2
    layer2.relu(layer2.output) # use relu activation on hidden layer
    #print("layer 2: ", layer2.output) # print layer 2 output

    # pass through output layer
    layer3.forward(layer2.output) # pass data through layer 3
    layer3.softmax(layer3.output) # use softmax activation
    #print("layer 3: ", layer3.output) # print layer 3 output

    # back prop
    #print("layer 3 weights before backprop: ", layer3.weights)

    # itterate through each layer
    for layer in [layer1, layer2, layer3]:
        # itterate through each wieght in layer
        for weight_index in range(len(layer.weights[0])):
            # calculate cost of that weight against excepted output
            # cost_one_weight(input, expect_output)
            #     method returns new value for that weight
            #new_weight_value = layer.cost_one_weight(layer.weights[0][weight_index], target_output[weight_index])

            # update the weight with it's new value
            #layer.weights[0][weight_index] = new_weight_value

            # apply loss to weight
            #layer.loss(layer.output[0][weight_index], target_output[weight_index])

    # cost of whole network
    #layer3.cost_layer(layer3.output[0], target_output[0])
    #print("network cost: ", layer3.cost)

    # print a single neuron and expected output
    print(layer3.output[0][0], target_output[0][0], layer3.output[0][0]-target_output[0][0])

    # print a single weight from layer 3
    #print("weight layer 3 [0]:", layer3.weights[0][0])
