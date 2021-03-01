import numpy as np
from PIL import Image
from random import random as ran

psize = [16, 16]

# resize photo
def resize_img(file_name):
    current = Image.open(file_name).resize((psize[0],psize[1]))
    return [i[0]+i[1]+i[2]/3 for i in current.getdata()]

# network
inputs = resize_img('cat1.jpg')

weights = [ran() for i in range(psize[0] * psize[1])]

biases = [ran()]

output = np.dot(np.array(weights).T, inputs) + biases

# output matrix contains 256 vectors (each vector contains 256 values)
