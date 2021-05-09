#include <iostream>
#include <vector>

int fib(int n) {
	std::vector<int> x = {0, 1};
	int t = 0;
	std::cout<<"Fib Sequence "<<n<<" itterations!\n";
	for (int i=0;i<n;i++) {
		t = x[0];
		x[0] = x[0] + x[1];
		x[1] = t;
		std::cout << x[0] << ", ";
	}
}

int main() {
	fib(10);
}