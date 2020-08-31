# Copyright © 2016 erilyth <vishalvenkat71@gmail.com>
# Copyright © 2020 Jared <jaredturck9@gmail.com>
#
# Distributed under terms of the MIT license.

import numpy as np
from PIL import Image
import copy, time

class neuralnet():
    def __init__(self):
        np.random.seed(1)
        self.data_dst_path = 'images/data_dst/'
        self.data_src_path = 'images/data_src/'
    
    def sigmoid(self, x):
        '''Keeps the output in the range of -1 to 1 with a smooth transition'''
        return 1 / (1 + np.exp(-x))


    def sigmoid_derivative(self, x):
        '''Derivative of the sigmoid function'''
        return x * (1 - x)


    def generate_network(self, network_shape):
            '''
            Given a shape of the network, generate randomized weight matrices for the network
            '''
            self.shape = network_shape
            weight_arrays = []
            for i in range(0, len(network_shape) - 1):
                cur_idx = i
                next_idx = i + 1
                #Rows correspond to next set of nodes
                #Columns correspond to current set of nodes
                weight_array = 2*np.random.rand(network_shape[next_idx], network_shape[cur_idx]) - 1
                weight_arrays.append(weight_array)

            return weight_arrays


    def run_network(self, input, network_shape, network_weights):
        '''
        Given a trained network and the input(s), predict the possible output
        '''
        #Rows in the weight matrix correspond to nodes of the next layer 
        #whereas columns correspond to nodes of the previous layer
        #print network_weights
        current_input = input
        outputs = []
        for network_weight in network_weights:
            current_output_temp = np.dot(network_weight, current_input)
            #Apply the sigmoid function to smooth out and range the outputs
            current_output = self.sigmoid(current_output_temp)
            outputs.append(current_output)
            current_input = current_output

        return current_output.T


    def train_network_main(self, Input, output, training_rate, shape, weights, itterations=10000):
            '''
            Take untrained weights and return trained weights for the neural network
            '''
            # assign parameters to local variables of class
            self.input = Input
            self.output = output
            self.training_rate = training_rate
            self.shape = shape
            self.weights = weights
            self.itterations = itterations
            
            #Train the network multiple times to make it more accurate
            weight_arrays = weights
            for i in range(itterations):
                weight_arrays = self.train_network(self.input, self.output, self.training_rate, self.shape, weight_arrays)
            return weight_arrays


    def train_network(self, input, output, training_rate, network_shape, network_weights):
        '''
        Given an untrained network, inputs and expected outputs, train the network
        '''
        #print network_weights
        current_input = input
        #Our predicted outputs
        outputs = []
        for network_weight in network_weights:
            current_output_temp = np.dot(network_weight, current_input)
            #Apply the sigmoid function to smooth out and range the outputs
            current_output = self.sigmoid(current_output_temp)
            outputs.append(current_output)
            current_input = current_output

        #This will be in the reverse order
        #Deltas will contain the error along with a few other terms which we come across
        # due to how we formulate gradient descent of the neural network
        deltas = []

        #We get these deltas according to the formula for gradient descent
        final_error = output - outputs[len(outputs)-1]
        final_delta = final_error * self.sigmoid_derivative(outputs[len(outputs)-1])
        deltas.append(final_delta)

        cur_delta = final_delta
        back_idx = len(outputs) - 2

        #Delta for layer i requires the weight matrix, delta of layer i+1 and expected output of layer i
        #Going backwards (Backprop)
        for network_weight in network_weights[::-1][:-1]:
            next_error = np.dot(network_weight.T, cur_delta)
            next_delta = next_error * self.sigmoid_derivative(outputs[back_idx])
            deltas.append(next_delta)
            cur_delta = next_delta
            back_idx -= 1

        cur_weight_idx = len(network_weights) - 1

        #These deltas will be in the reverse order, so we move backwards through the layers
        for delta in deltas:
            input_used = None
            if cur_weight_idx - 1 < 0:
                input_used = input
            else:
                input_used = outputs[cur_weight_idx - 1]

            #The weights of layer i are changed based on the input to layer i (or the output of layer i-1) and the delta of layer i
            #This is again due to the formulation of gradient descent
            network_weights[cur_weight_idx] += training_rate*np.dot(delta, input_used.T)
            cur_weight_idx -= 1

        #print network_weights
        return network_weights

    def normalize_image(self, imgArr):
        '''
        RGB to greyscale normalization
        '''
        newImgArr = copy.deepcopy(imgArr)
        for row in range(len(imgArr)):
            for col in range(len(imgArr[row])):
                new_value = (int(imgArr[row][col][0]) + int(imgArr[row][col][1]) + int(imgArr[row][col][2])) / 3
                if new_value != 0.0:
                    #Values are either 0 or 255
                    new_value = 255.0
                newImgArr[row][col][0] = new_value
                newImgArr[row][col][1] = new_value
                newImgArr[row][col][2] = new_value

        return newImgArr

    def generate_dataset(self, ImgPath):
        '''
        Generate the images dataset which will be used by run_dataset
        '''
        imgArrList = []
        numbersWeHave = range(0, 10) #We have 10 digits 
        versionsWeHave = range(1, 16) #We have 15 versions of each digit
        outputs = []
        self.data_src_path = ImgPath

        for number in numbersWeHave:
            for version in versionsWeHave:
                cur_output = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
                cur_output[int(number)] = 1.0
                outputs.append(cur_output)
                imgPath = self.data_src_path + str(number) + '.' + str(version) + '.png'
                imgCur = Image.open(imgPath)
                #Make it black and white
                imgCurArr = self.normalize_image(np.array(imgCur))
                imgArrList.append(imgCurArr)

        inputs = []
        for imgArr in imgArrList:
            pixels = []
            for row in imgArr:
                for col in row:
                    #Use normalized images here, so considering either R or G or B will be the same
                    pixels.append(col[0]/255.0)
            inputs.append(pixels)

        return [inputs, outputs]

    def generate_test_data(self, imgPath):
        '''
        Take an image and generate the required inputs for the network
        '''
        imgCur = Image.open(imgPath)
        imgCurArr = self.normalize_image(np.array(imgCur))
        inputs = []
        pixels = []
        for row in imgCurArr:
            for col in row:
                pixels.append(col[0]/255.0)
        inputs.append(pixels)
        return np.array(inputs).T

    def test_network(self):
        '''
        Run a test to see how the networks preforms
        '''
        for i in range(10): # 10 is number of dst images
            test_inputs = self.generate_test_data(self.data_dst_path + str(i) + ".png")
            test_outputs = self.run_network(test_inputs, self.shape, self.weights)

            print("Input -",i,"Output - ", end="")
            for output in test_outputs:
                best_match = max(output)
                for x in range(len(output)):
                    if output[x] == best_match:
                        print(x)

    def ips(self):
        '''
        Measures the Iterations Per Second (IPS)
        '''
        counter = 0
        weight_arrays = self.weights
        end_time = time.time() +1
        while True:
            weight_arrays = self.train_network(self.input, self.output, self.training_rate, self.shape, weight_arrays)
            counter += 1
            if time.time() > end_time:
                return counter

        
        
