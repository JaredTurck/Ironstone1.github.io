#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

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

// greater then
bool gt(string a, string b) {
	int len_a = a.length();
	int len_b = b.length();

	// check length
	if (len_a > len_b) {
		return true;
	} else if (len_b > len_a) {
		return false;
	}

	// check each digits
	for (int i = 0; i < len_a; i++) {
		if (a[i] < b[i]) {
			return false;
		} else if (a[i] > b[i]) {
			return true;
		}
	}
	return false;
}

// greater then or equal too
bool gte(string a, string b) {
	if (a == b) {
		return true;
	}
	return gt(a, b);
}

// less than
bool ls(string a, string b) {
	return gt(b, a);
}

// less than or equal too
bool lse(string a, string b) {
	return gte(b, a);
}

string divide(string a, string b, int prec) {
	string exponent = "";
	string significand = "";

	int len_a = a.length();
	int carry = 0;
	int x = 0;
	int temp_sum = 0;
	int counter = 0;
	int temp_sum2 = 0;
	int int_b = stoi(b);

	// calc exponent
	for (int i = 0; i < len_a; i++) {
		x = (a[i] - '0') + (carry * 10); // subtract '0' to convert char to int
		temp_sum = 0;
		counter = 0;

		while (temp_sum < x) {
			temp_sum2 = stoi(add_nums(b, to_string(temp_sum)));
			if (temp_sum2 > x) {
				break;
			} else {
				temp_sum = temp_sum + int_b;
				counter++;
			}
		}
		carry = x - temp_sum;
		exponent += to_string(counter);
	}

	// calc significand
	for (int i = 0; i < prec; i++) {
		x = carry * 10;

		temp_sum = 0;
		counter = 0;

		while (temp_sum < x) {
			temp_sum2 = stoi(add_nums(b, to_string(temp_sum)));
			if (temp_sum2 > x) {
				break;
			} else {
				temp_sum = temp_sum + int_b;
				counter++;
			}
		}
		carry = x - temp_sum;
		significand += to_string(counter);
	}
	return exponent;
}

//string calc_e(int itterations) {
//	int n = "1";
//	for (int i = 0; i < itterations; i++) {
//		n = n + (n / x);
//	}
//	return n;
//}

int main() {
	divide("968782", "3", 50);
	system("pause");
}