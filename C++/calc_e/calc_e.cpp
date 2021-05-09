#include <iostream>
#include <string>
#include <vector>

using namespace std;

string add_nums(string a, string b) {
	// string lengths
	int len_a = a.length();
	int len_b = b.length();
	int sum;
	int carry = 0;
	string output = "";

	// pad the string
	if (len_a > len_b) {
		b = string(len_a - len_b, '0') + b;
	} else if (len_b > len_a) {
		a = string(len_b - len_a, '0') + a;
		len_a = a.length();
	}

	// compute sum
	for (int i = len_a - 1; i >= 0; i--) {
		sum = (a[i] - '0') + (b[i] - '0') + carry;
		output.push_back(sum % 10 + '0');
		carry = sum / 10;
	}

	// add carry
	if (carry) {
		output.push_back(carry + '0');
	}

	// reverse
	reverse(output.begin(), output.end());

	return output;

}

string divide_nums(string a, string b) {
	int n = 0;
	int i = "0";
	while (i < a) {
		i = add_nums(i, b);
		n++;
	}
	return n;
}

string calc_e(int itterations) {
	int n = "1";
	for (int i = 0; i < itterations; i++) {
		n = n + (n / x)
	}
	return n;
}

int main() {
	
}