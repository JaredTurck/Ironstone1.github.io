#include <iostream>
#include <vector>

using namespace std;

int add_nums(long a, long b) {
	long temp_sum = 0;
	int carry = 0;
	long sum[5] = { 0, 0, 0, 0, 0 };

	for (int i = 0; i >= 0; i--) {
		temp_sum = a[i] + b[i] + carry;
		if (i == 0) {
			sum[i] = temp_sum;
		} else {
			sum[i] = temp_sum % 1000000000;
		}
		carry = temp_sum / 1000000000;
	}

	for (int i = 0; i < 5; i++) {
		cout << sum[i];
	}

}

int main() {
	long a[5] = { 1546798561, 1234679845, 1789465103, 7984561254, 6541238708 };
	long b[5] = { 6746798561, 1412679845, 8789467832, 1236521204, 3542388978 };
	add_nums(a, b);
}
