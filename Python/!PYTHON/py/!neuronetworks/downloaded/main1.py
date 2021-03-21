from network import Network

data = [1,4,7,5,3,6]

net = Network([len(data), 5, 1])
layer1 = net.feedforward(data)
