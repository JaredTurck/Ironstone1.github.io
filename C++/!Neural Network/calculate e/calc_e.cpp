#include <iostream>

using namespace std;

double calc_e(unsigned long long int x) {
	double n = 1;
	for (int i = 0; i < x; i++) {
		n = n + (n / x);
	}
	return n;
}

int main() {
	cout << "every year: " << calc_e(1) << endl;
	cout << "every month: " << calc_e(12) << endl;
	cout << "every week: " << calc_e(52) << endl;
	cout << "every day: " << calc_e(365) << endl;
	cout << "every hour: " << calc_e(365 * 24) << endl;
	cout << "every min: " << calc_e(365 * 24 * 60) << endl;
	cout << "every second: " << calc_e(365 * 24 * 60 * 60) << endl;
	cout << "every millisecond: " << calc_e(31536000000) << endl;
	system("pause");
	return 0;
}