import neuralnet
import numpy as np


shape = [64, 32, 10]
net = neuralnet.neuralnet(shape)

#data = net.generate_dataset('images/data_src/')
#inputs = np.array(data[0]).T
#outputs = np.array(data[1]).T
net.generate_dataset('images/data_src/')

#8x8 pixel images, we consider each pixel has only a single greyscale value so 8x8 = 64 inputs
#Consider a neural net with 1 hidden layer of 32 nodes with 64 input nodes and 10 output nodes

weights = net.generate_network()
weights = net.train_network_main(training_rate=0.01, itterations=10000)

#Training is done now, we can test the network
net.test_network()


# format data
