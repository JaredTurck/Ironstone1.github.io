import neuralnet
import numpy as np


net = neuralnet.neuralnet()
data = net.generate_dataset('images/data_src/')
inputs = np.array(data[0]).T
outputs = np.array(data[1]).T

#8x8 pixel images, we consider each pixel has only a single greyscale value so 8x8 = 64 inputs
#Consider a neural net with 1 hidden layer of 32 nodes with 64 input nodes and 10 output nodes
shape = [64, 32, 10]

weights = net.generate_network(shape)
weights = net.train_network_main(inputs, outputs, 0.01, shape, weights, itterations=10000)

#Training is done now, we can test the network
net.test_network()
