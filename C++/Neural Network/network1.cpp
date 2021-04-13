#include <iostream>
#include <vector>
#include <ctime>
#include <cmath>
#include <string>

using namespace std;

// random class used for generating random numbers
class random {
	public:
	long int big = pow(10, 8);
	long int seed = reinterpret_cast<long int>(time(0));

	// generate random value
	long int rand() {
		seed = abs(static_cast<long int>((pow(seed, 0.1) * big)) % big);
		return seed;
	}

	// random integer in range start to end
	long int randint(int start, int end) {
		return (this->rand() % (end - start)) + start;
	}

	// random unsigned float in range start to end
	double randfloat_range(int start, int end) {
		return (static_cast<float>(this->randint(1000, 9999)) / 10000) + this->randint(start, end);
	}

	// random unisgn float in range 0 to 1
	double randfloat() {
		return static_cast<double>(this->randint(1000, 9999)) / 10000;
	}

	// random choice
	int choice(vector<int> n) {
		return n[this->randint(0, n.size())];
	}
};

// number methods
class num_methods {
	public:
	random rand;

	// generates random matrix in given shape
	vector<vector<float>> random_matrix(int rows, int colms) {
		vector<vector<float>> output = {};
		for (int y = 0; y < colms; y++) {
			output.push_back({});
			for (int x = 0; x < rows; x++) {
				output[y].push_back(rand.randfloat());
			}
		}
		return output;
	}

	// generate matrix of zeros
	vector<vector<float>> zeros(int rows, int colms, float data=0.0) {
		vector<vector<float>> output = {};
		for (int y = 0; y < colms; y++) {
			output.push_back({});
			for (int x = 0; x < rows; x++) {
				output[y].push_back(data);
			}
		}
		return output;
	}

	// print matrix displays the contents of a matrix
	void cout_matrix(vector<vector<float>> m) {
		cout << "matrix([" << endl;
		for (int y = 0; y < m.size(); y++) {
			cout << "[ ";
			for (int x = 0; x < m[y].size(); x++) {
				cout << m[y][x] << ", ";
			}
			cout << "]" << endl;
		}
		cout << "])" << endl;
	}

	// print vector displays the contents of a vector
	void cout_vector(vector<float> m) {
		cout << "vector([)" << endl;
		for (int i = 0; i < m.size(); i++) {
			cout << m[i] << ", ";
		}
		cout << "])" << endl;
	}

};

// neural network
class network {
	public:
	num_methods numm;
	vector<vector<float>> weights;
	vector<vector<float>> biases;

	void create_layer(int inputs, int neurons) {
		weights = numm.random_matrix(inputs, neurons);
		biases = numm.zeros(1, inputs);
	}

	// forward propogate through network
	vector<float> forward(vector<float> inputs) {
		// dot matrix
		vector<float> neuron_output = {};
		for (int i = 0; i < inputs.size(); i++) {
			neuron_output[i] = 0;
			for (int l = 0; l < this->weights[i].size(); l++) {
				neuron_output[i] += inputs[i] * this->weights[i][l];
			}
		}
		return neuron_output;
	}
};

int main() {
	// data
	vector<float> x = { 4,6,2,4,9,6 };
	
	// layer 1
	network layer1;
	layer1.create_layer(6, 2);
	layer1.numm.cout_matrix(layer1.weights);
	layer1.numm.cout_matrix(layer1.biases);
	
	vector<float> output = layer1.forward(x);
	layer1.numm.cout_vector(output);

	system("pause");
	return 0;
}