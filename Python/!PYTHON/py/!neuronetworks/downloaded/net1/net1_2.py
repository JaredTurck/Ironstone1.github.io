import torch
import torch.nn as nn
from PIL import Image
import numpy as np

class network(nn.Module):
    def __init__(self):
        super(network, self).__init__()

        self.input_size = 256
        self.output_size = 1
        self.hidden_size = 64

        self.w1 = torch.rand(self.input_size, self.hidden_size)
        self.w2 = torch.rand(self.hidden_size, self.output_size)

    def forward(self, x):
        self.z = torch.matmul(x, self.w1)
        self.z2 = self.sigmoid(self.z)
        self.z3 = torch.matmul(self.z2, self.w2)
        output = self.sigmoid(self.z3)
        return output

    def sigmoid(self, s):
        return 1 / (1 + torch.exp(-s))

    def sigmoid_prime(self, s):
        return s * (1 - s)

    def backward(self, x, y, o):
        self.o_error = y - o
        self.o_delta = self.o_error * self.sigmoid_prime(o)
        self.z2_error = torch.matmul(self.o_delta, torch.t(self.w2))
        self.z2_delta = self.z2_error * self.sigmoid_prime(self.z2)
        self.w1 += torch.matmul(torch.t(x), self.z2_delta)
        self.w2 += torch.matmul(torch.t(self.z2), self.o_delta)

    def train(self, x, y):
        output = self.forward(x)
        self.backward(x, y, output)

    def save_weights(self, model):
        torch.save(model, "nn.model")
        # torch.load("nn.model") to load weights

    def predict(self):
        print(f"Input: {predict}\nOutput: {self.forward(predict)}")

class data_handler:
    def resize_img(filename, psize=[16, 16]):
        current = Image.open(filename).resize((psize[0], psize[1]))
        return [i[0] + i[1] + i[2]/3 for i in current.getdata()]

# load input data
x = torch.tensor([data_handler.resize_img("cat1.jpg")]*3)
y = torch.tensor(([10], [20], [30]), dtype=torch.float)
predict = torch.tensor(([4, 8]), dtype=torch.float) # 1 x 2 tensor

x_max = torch.max(x, 0)[0]
predict_max = torch.max(predict, 0)[0]

x = torch.div(x, x_max)
predict = torch.div(predict, predict_max)
#y = y / 100

net = network()
for i in range(100):
    loss = torch.mean((y - net(x))**2).detach().item()
    print(f"#{i} Loss={loss}")
        
    net.train(x, y)

net.save_weights(net)
#net.predict()
