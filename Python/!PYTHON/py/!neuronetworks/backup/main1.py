# --- a single neuron ---
inputs = [1.5, 6.5, 7.2] # inputs (output from previous neuron, or input data e.g. pixel)
weight = [4.6, 6.8, 2.7] # same number of wights as inputs (every input has a weight)
bias = 3 # a single bias value (one number)

# compute the weighted sum, input times weight + input[2] times weight[2] ... - bias
output = (inputs[0]*weight[0]) + (inputs[1]*weight[1]) + (inputs[2]*weight[2]) - bias
print("single neuron", output)


# --- 1 layer containing 3 neurons ---
inputs = [1.5, 6.5, 7.2]

weight1 = [4.6, 4.8, 2.7]
weight2 = [2.2, 9.8, 1.7]
weight3 = [8.0, 1.8, 9.7]

bias1 = 3
bias2 = 2
bias3 = 7

output = [(inputs[0]*weight1[0]) + (inputs[1]*weight1[1]) + (inputs[2]*weight1[2]) - bias1,
          (inputs[0]*weight2[0]) + (inputs[1]*weight2[1]) + (inputs[2]*weight2[2]) - bias2,
          (inputs[0]*weight3[0]) + (inputs[1]*weight3[1]) + (inputs[2]*weight3[2]) - bias3]

print("3 neurons in 1 layer", output)


# --- better code (1 layer contaning 3 neurons) ---
inputs = [1.5, 6.5, 7.2]

weights = [[4.6, 4.8, 2.7],
           [2.2, 9.8, 1.7],
           [8.0, 1.8, 9.7]] # shape (3, 3) - 3 lits contaning 3 values

biases = [3, 2, 7]

# tensor dobject like an array
# list with sublists is a matrix (2D list)
# vector is single list (1D list)

# --- numpy dot product ---
import numpy as np

inputs = [1.5, 6.5, 7.2]
weights = [4.6, 4.8, 2.7]
bias = 7

output = np.dot(weights, inputs) + bias
print(output)

# np.dot multiples each element at the same index in the 2 vectors e.g.
# input 1.5 times weight 4.6
# input 6.5 times weight 4.8
# input 7.2 times weight 2.7
# it then adds all of those values together, basically does the calculation
# 1.5*4.6 + 6.5*4.8 + 7.2*2.7
# then we add the bias


# --- np.dot with a layer (contaning 3 neurons) ---
inputs = [1.5, 6.5, 7.2]
weights = [[4.6, 4.8, 2.7],
           [2.2, 9.8, 1.7],
           [8.0, 1.8, 9.7]]
biases = [3, 2, 7] # bias helps to determine if neuron is firing

# weights comes before inputs in np.dot
output = np.dot(weights, inputs) + bias
print(output) # output returns [ 64.54  86.24 100.54]

# np.dot(weights, inputs) + bias
# will add the bias to all of the values in the vector

# when passing a matrix of weights
# np.dot will preform input1*weight1 + input2*weight2 + ...
# for each vector in the matrix, basically the same as typing
# np.dot(weights[0], inputs)
# np.dot(weights[1], inputs)
# np.dot(weights[2], inputs)
# then returns vector containing the 3 output values
# e.g. [ 64.54  86.24 100.54]


# --- batches ---

# batch is the number of inputs
# input = [[1.5, 6.5, 7.2]] # batch size 1 (1 input in matrix)

inputs = [[1.5, 6.5, 7.2],
          [5.9, 3.2, 0.4],
          [6.2, 7.2, 6.8]] # batch size 3 (3 vectors in the matrix)


weights = [[4.6, 4.8, 2.7],
           [2.2, 9.8, 1.7],
           [8.0, 1.8, 9.7]]

biases = [3, 2, 7]

output = np.dot(weights, inputs) + biases
print(output)

# when using a dot product on 2 matrixes this is called matrix product
# the matrix product is calculated by taking the weights row times input column
# 4.6*1.5 + 4.8*5.9 + 2.7*6.2
# so take the first vector in the weights and multiple
# each value by the first item in each vector of the inputs

#             4.6  4.8  2.7
#              ↓    ↓    ↓
# weights = [[4.6, 4.8, 2.7],
#           [2.2, 9.8, 1.7],
#           [8.0, 1.8, 9.7]]

# inputs = 1.5 → [[1.5, 6.5, 7.2],
#          5.9 → [5.9, 3.2, 0.4],
#          6.2 → [6.2, 7.2, 6.8]]

#                ↓
#biases = [3, 2, 7]

# dot product result of the weight and input matrixs
#  w1*in1 + w2*in2  + w3*in3  + bias
# 4.6*1.5 + 4.8*5.9 + 2.7*6.2 + 7 = 58.96
#
#     ↓
# [[ 58.96  71.7   60.4 ]
#  [ 78.66  64.9   38.32]
#  [ 89.76 134.6  131.28]] 


# --- transpose ---
# transpose switches rows and colums
# so you can have the first value in the first vector of the weights matrix
# times the first value of the first vector of the inputs matrix

weights = [[4.6, 4.8, 2.7, 3.6],
           [2.2, 9.8, 1.7, 8.2],
           [8.0, 1.8, 9.7, 2.6]]

inputs = [[1.5, 6.5, 7.2, 4.6],
          [5.9, 3.2, 0.4, 4.7],
          [6.2, 7.2, 6.8, 1.4]]

biases = [9, 2, 4, 5]

# convert weights to an numpy array then transpose .T
output = np.dot(np.array(weights).T, inputs) + biases
print(output)

# transpose weights - np.array(weights).T
#
#   4.6  4.8  2.7  3.6
#    ↓    ↓    ↓    ↓
# [[4.6, 4.8, 2.7, 3.6],     4.6 → [[4.6, 2.2, 8.0],
#  [2.2, 9.8, 1.7, 8.2],  =  4.8 →  [4.8, 9.8, 1.8],
#  [8.0, 1.8, 9.7, 2.6]]     2.7 →  [2.7, 1.7, 9.7],
#                            3.6 →  [3.6, 8.2, 2.6]]

# weights after transpose
#
# weights = 4.6 → [[4.6, 2.2, 8.0],
#           4.8 →  [4.8, 9.8, 1.8],
#           2.7 →  [2.7, 1.7, 9.7],
#           3.6 →  [3.6, 8.2, 2.6]]

#            1.5  6.5  7.2  4.6
#             ↓    ↓    ↓    ↓
# inputs = [[1.5, 6.5, 7.2, 4.6],
#           [5.9, 3.2, 0.4, 4.7],
#           [6.2, 7.2, 6.8, 1.4]]

# 4.6*1.5 + 4.8*6.5 + 2.7*7.2 + 3.6*4.6 + 5


# -- 2 layers ---
inputs = [[1.5, 6.5, 7.2, 4.6],
          [5.9, 3.2, 0.4, 4.7],
          [6.2, 7.2, 6.8, 1.4]]

weights1 = [[4.6, 4.8, 2.7, 3.6],
           [2.2, 9.8, 1.7, 8.2],
           [8.0, 1.8, 9.7, 2.6]]

weights2 = [[5.8, 6.7, 3.5, 1.7],
            [6.5, 2.7, 2.7, 3.5],
            [5.3, 3.5, 6.7, 6.7],
            [6.4, 8.5, 4.8, 9.5]]

biases = [9, 2, 4, 2]
biases2 = [4, 6, 1, 4]

layer1_outputs = np.dot(np.array(weights1).T, inputs) + biases

layer2_outputs = np.dot(np.array(weights2).T, layer1_outputs) + biases2


# --- object ---
# import random, the weights and biases are random on first itteration
import random

# the dinput ata that you will be training
X = [[1.5, 6.5, 7.2, 4.6],
     [5.9, 3.2, 0.4, 4.7],
     [6.2, 7.2, 6.8, 1.4]] # inputs commonly called X

class layer_dense:
    def __init__(self, n_inputs, n_neurons):
        self.weights = 0.10 * np.random.randn(n_inputs, n_neurons) # initialize random weights
        self.biases = np.zeros((1, n_neurons)) # initialize random biases

    def forward(self, inputs):
        self.output = np.dot(inputs, self.weights) + self.biases # do the itteration

# initialize the layers (create weights and biases)
layer1 = layer_dense(4, 5) # size of input vector, number of neurons

# make sure the input size of your second layer
# matches the output vector shape of the first layer
# layer 1 contains 5 neurons, so layer 2 must have 5 inputs
layer2 = layer_dense(5, 2) # input size, neurons

# pass inputs X through layer 1 (layer contains 5 neurons)
layer1.forward(X)
print(layer1.output)

# pass the output of layer 1 into layer 2 (layer contains 2 neurons)
layer2.forward(layer1.output)
print(layer2.output)

# sigmoid is common activation function
# sigmoid is better then a step function (outputs 0 or 1), becuase sigmoid
# is more accurate, gives more information about how close a neuron was to being activated

# relu mains rectified linear function
# relu - if x is less then 0 output 0, else output x
# very fast, lot faster then sigmoid becuase less calculations are required
# relu is commonly used over sigmoid due to speed

# relu doesn't give as much information about how close a neuron
# was to activating like sigmoid but it is a lot faster


# --- relu ---
inputs = [4.5, 7.8, 6.4, 9.7, 2.5, 4.6, 2.5, 7.4]

# returns the input if it's greater then 0, else returns 0
def relu(inputs):
    output = []
    for i in inputs:
        if i > 0:
            output.append(i)
        elif i <= 0:
            output.append(0)
    return output

print(relu(inputs))

# --- object ---
X = [[1.5, 6.5, 7.2, 4.6],
     [5.9, 3.2, 0.4, 4.7],
     [6.2, 7.2, 6.8, 1.4]]

inputs = [4.5, 7.8, 56.4, 9.7, 2.5, 4.6, 2.5, 7.4]

class layer_dense:
    def __init__(self, n_inputs, n_neurons):
        self.weights = 0.10 * np.random.randn(n_inputs, n_neurons) # initialize random weights
        self.biases = np.zeros((1, n_neurons)) # initialize random biases

    def forward(self, inputs):
        self.output = np.dot(inputs, self.weights) + self.biases # do the itteration

class activation_relu:
    def forward(self, inputs):
        # np.maximum is numpys built in relu function
        # does the extract same thing as relu
        self.output = np.maximum(0, inputs)

layer1 = layer_dense(4,5)
layer1.forward(X)

activation1 = activation_relu()
activation1.forward(layer1.output)
print(activation1.output)

# after using relu no negative values are output only positive
#
# [[0.08014799 0.5821879  0.30129826 0.59222849 0.        ]
#  [0.54918076 0.28490223 0.         0.         0.        ]
#  [0.         1.85707631 0.13307717 1.32530282 0.        ]]
#
# 0 indicates that the neuron is not active

# if too many of the values are 0, then the network is dead
# to fix a dead network change the initial weights slightly


# --- exponentiation with math ---
# exponentiation ensures the values at output node will never be negative
import math

layer_output = [4.8, 1.21, 2.385]
E = math.e # 2.718281828459045 (Euler's number)

exp_values = []

for output in layer_output:
    # raises the output to the power of 2.718
    # this ensures the numbers will never be negative
    exp_values.append(E**output)

print(exp_values) # exponentiation values (values greater then 0)

# normalise takes values and ensurses they are between 0 and 1
norm_base = sum(exp_values)
norm_values = []

for value in exp_values:
    norm_values.append(value / norm_base) # normalised values

print(norm_values) # vector of normalised values (between 0 and 1)
print(sum(norm_values)) # sum of values


# --- exponentiation with numpy ---
layer_output = [4.8, 1.21, 2.385]
E = math.e # 2.718281828459045 (Euler's number)

# exponens each value in vector, ensuring it is not negative
exp_values = np.exp(layer_output)
print(exp_values)

# normalise each value, ensuring it is between 0 and 1
norm_values = exp_values / np.sum(exp_values)
print(norm_values)

# exponentiate + normalise is called softmax


# --- batch softmax ---
layer_output = [[4.8, 5.6, 5.5],
                [2.5, 4.4, 9.6],
                [7.8, 2.1, 4.3]]

exp_values = np.exp(layer_output)

# axis=1 sums each row in matrix
print(np.sum(layer_output, axis=1))

# axis=1 sums each row in matrix and keepdims=True changes the shape (transpose)
print(np.sum(layer_output, axis=1, keepdims=True))

norm_values = exp_values / np.sum(exp_values, axis=1, keepdims=True)
print(norm_values)

# overflow prevention
# it's possible to get very long decimals numbers
# and eventually reach overflow error


# --- full code ---
class layer_dense:
    def __init__(self, n_inputs, n_neurons):
        self.weights = 0.10 * np.random.randn(n_inputs, n_neurons) # initialize random weights
        self.biases = np.zeros((1, n_neurons)) # initialize random biases

    def forward(self, inputs):
        self.output = np.dot(inputs, self.weights) + self.biases # do the itteration

class activation_relu:
    def forward(self, inputs):
        # np.maximum is numpys built in relu function
        # does the extract same thing as relu
        self.output = np.maximum(0, inputs)

class activation_softmax:
    def forward(self, inputs):
        # exp exponentiate + normalise values
        # subtract max (relu) to prevent overflow error
        exp_values = np.exp(inputs - np.max(inputs, axis=1, keepdims=True))

        # sum each row
        probabilities = exp_values / np.sum(exp_values, axis=1, keepdims=True)
        self.output = probabilities

# input data
X = [[1.5, 6.5, 7.2, 4.6],
     [5.9, 3.2, 0.4, 4.7],
     [6.2, 7.2, 6.8, 1.4]]

# init layer 1
dense1 = layer_dense(4, 4)
activation1 = activation_relu()

# init layer 2
dense2 = layer_dense(4, 3)
activation2 = activation_softmax()

# pass input data through player 1
dense1.forward(X)

# relu data
activation1.forward(dense1.output)

# pass layer 1 output into layer 2
dense2.forward(activation1.output)

# exponentiate and normalise data
activation2.forward(dense2.output)

# display output
print(activation2.output)

# --- calculate loss ---
# categorical cross entropy, used to calculate loss
# logirithm does the calculation, solve for x, e ** x = b

b = 5.2
print(np.log(b))

#e = 2.718281828459045 (Euler's number)
# b is your input value
# e ** x = b
# log is 2.718281828459045 ** x = b

softmax_output = [0.7, 0.2, 0.3]
target_output = [1, 0, 0]

# loss with math
loss = -(math.log(softmax_output[0])*target_output[0] +
        math.log(softmax_output[1])*target_output[1] +
        math.log(softmax_output[2])*target_output[2])

print(loss)

# loss with numpy
loss = -math.log(softmax_output[0])
print(loss)

