#include <iostream>
#include <cmath>
#include <chrono>

using namespace std;

const double pi = 3.141592653589793;
const int itter = 30;
double n;
double dn;

double sin1(double x) {
	x = fmod((x + pi), (2 * pi) - pi);
	n = 0;
	dn = x;
	for (int c = 1; c <= 2 * itter + 4; c += 2) {
		n += dn;
		dn *= -pow(-x, 2) / ((c + 1) * (c + 2));
	}
	return n;
}

double cos1(double x) {
	x = fmod((x + pi), (2 * pi) - pi);
	n = 0;
	dn = pow(x, 2) / 2;
	for (int c = 2; c <= 2 * itter + 2; c += 2) {
		n += dn;
		dn *= -pow(-x, 2) / ((c + 1) * (c + 2));
	}
	return 1 - n;
}

double tan(double x) {
	return sin(x) / cos(x);
}

void user_input() {
	int user;
	while (true) {
		cout << "Enter Number: ";
		cin >> user;
		cout << "\ncos(" << user << ") = " << cos(user) << endl;
		cout << "\nsin(" << user << ") = " << sin(user) << endl;
		cout << "\ntan(" << user << ") = " << tan(user) << endl;
	}
}

void speed_test() {
	// measure cos
	auto start = chrono::high_resolution_clock::now();
	for (int i = 0; i < 1000000; i++) {
		cos1(i);
		//cos(i);
	}
	auto elapsed = chrono::high_resolution_clock::now() - start;
	long long seconds = std::chrono::duration_cast<std::chrono::microseconds>(elapsed).count();
	cout << "cos: " << seconds << " microseconds! "<< endl;
}

int main() {
	speed_test();

	system("pause");
}

// cmath::cos takes 57,998 microseconds to do 1 million
// cos1 takes 2,446,020 microseconds to do 1 million