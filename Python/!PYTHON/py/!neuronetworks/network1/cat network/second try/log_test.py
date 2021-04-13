import numpy as np
import math

b = 5.2

print(np.log(b)) # b = e ** x
print(2.718281828459045 ** np.log(b))

softmax_output = [0.7, 0.1, 0.2]
target_output = [1, 0, 0]

loss = -(math.log(softmax_output[0]) * target_output[0] +
         math.log(softmax_output[1]) * target_output[1] +
         math.log(softmax_output[2]) * target_output[2])

print(loss)

loss = -math.log(softmax_output[0])
print(loss)

#apply loss to each weight
#loss is calculated as actul output against excepted output (not weights)
