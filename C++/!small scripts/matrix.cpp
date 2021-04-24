#include <iostream>
#include <vector>
#include <cmath>
#include <ctime>

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

int main() {
	system("color 2");
	random r;
	while (true) {
		cout << r.randint(0, 2) << r.randint(0, 2) << r.randint(0, 2) << r.randint(0, 2) << r.randint(0, 2) << r.randint(0, 2) << r.randint(0, 2);
	}
	return 0;
}