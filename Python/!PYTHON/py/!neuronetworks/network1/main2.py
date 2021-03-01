import numpy as np

# softmax used for clasification
# softmax normalizes data

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

class loss:
    # calculate the loss for the given data
    def calculate(self, output, y):
        # calculate sample loss
        sample_losses = self.forward(output, y)

        # calculate mean loss
        data_loss = np.mean(sample_losses)

        # return loss
        return data_loss

class loss_categorical_crossentropy(loss):
    def forward(self, y_prediction, y_true):
        # number of samples in batch
        samples = len(y_prediction)

        # clip data to prevent division by 0
        y_prediction_clipped = np.clip(y_prediction, 1e-7, 1 - 1e-7)

        # probabilities for target values
        if len(y_true.shape) == 1:
            correct_confidences = y_prediction_clipped[
                range(samples),
                y_true
            ]

        # mask values
        elif len(y_true.shape) == 2:
            correct_confidences = np.sum(
                y_prediction_clipped*y_true,
                axis=1
            )

        # loss
        negative_log_likelihood = -np.log(correct_confidences)
        return negative_log_likelihood

# input data
X = [[1.5, 6.5, 7.2, 4.6],
     [5.9, 3.2, 0.4, 4.7],
     [6.2, 7.2, 6.8, 1.4]]

y = np.array(
    [[0, 0, 0],
     [0, 0, 0],
     [0, 0, 0]])

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

# the los function is also refered to as cost function
# softmax activation function only used on output layer
# softmax commonly used for classification networks
# relu used on input and hidden layers

# init loss function
loss_function = loss_categorical_crossentropy()

loss = loss_function.calculate(activation2.output, y)

