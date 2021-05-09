#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <ctime>

#include <cmath>
#include <assert.h>
#include <chrono>

using namespace std;

void add_nums(vector<long long int> a, vector<long long int> b) {
	long temp_sum = 0;
	int carry = 0;
	vector<long long int> sum = {0, 0, 0, 0, 0 };

	for (int i = a.size(); i >= 0; i--) {
		temp_sum = a[i] + b[i] + carry;
		if (i == 0) {
			sum[i] = temp_sum;
		} else {
			sum[i] = temp_sum % 1000000000;
		}
		carry = temp_sum / 1000000000;
		cout << "[" << sum[i] << ", " << carry << "]" << endl;

	}

	for (int i = 0; i < 5; i++) {
		cout << sum[i] << endl;
	}

}

string add_nums2(string a, string b) {
	
	// make sure b is longer then a
	if (a.length() > b.length()) {
		swap(a, b);
	}

	string output = "";

	// get string lengths
	int n1 = a.length();
	int n2 = b.length();

	// reverse strings
	reverse(a.begin(), a.end());
	reverse(b.begin(), b.end());

	// compute numbers
	int carry = 0;
	for (int i = 0; i < n1; i++) {
		// compute sum
		int sum = ((a[i] - '0') + (b[i] - '0') + carry);
		output.push_back(sum % 10 + '0');

		// get carry
		carry = sum / 10;
	}

	// add remanining digits of larger number
	for (int i = n1; i < n2; i++) {
		int sum = ((a[i] - '0') + carry);
		output.push_back(sum % 10 + '0');

		// get carry
		carry = sum / 10;
	}

	// add remaining carry
	if (carry) {
		output.push_back(carry + '0');
	}

	// reverse output
	reverse(output.begin(), output.end());

	// return output
	return output;
}

string add_nums3(string a, string b) {
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
	for (int i = len_a-1; i >= 0; i--) {
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

void add_nums4_1(string c, string d) {
	vector<long long> a = { 1546798561, 1234679845,  789465103, 7984561254, 6541238708 };
	vector<long long> b = { 6746798561, 1412679845, 8789467832, 1236521204,  542388978 };

	long long temp_sum = 0;
	int carry = 0;
	vector<long long int> sum = { 0,0,0,0,0 };

	// sum
	for (int i = 4; i >= 0; i--) {
		temp_sum = a[i] + b[i] + carry;
		if (i == 0) {
			sum[i] = temp_sum;
		} else {
			sum[i] = temp_sum % 10000000000;
		}
		carry = temp_sum / 10000000000;
		cout << "[" << sum[i] << ", " << carry << "]" << endl;
	}

	// cout
	int zeros = 0;
	for (int i = 0; i < 5; i++) {
		// when priting the sum make sure to pad the zeros
		zeros = 10 - to_string(sum[i]).length();
		for (int i = 0; i < zeros; i++) {
			cout << '0';
		}
		// print the sum
		cout << sum[i];
	}
	cout << endl;
}

vector<long long> add_nums4_2(vector<long long> a, vector<long long> b) {
	long long temp_sum = 0;
	int carry = 0;
	int n1 = a.size();
	int n2 = b.size();
	
	// pad
	while (n1 > n2) {
		b.push_back(0);
	}

	while (n2 > n1) {
		a.push_back(0);
	}

	// sum
	vector<long long> sum(a.size(), 0);
	for (int i = a.size()-1; i >= 0; i--) {
		temp_sum = a[i] + b[i] + carry;
		if (i == 0) {
			sum[i] = temp_sum;
		} else {
			sum[i] = temp_sum % 10000000000;
		}
		carry = temp_sum / 10000000000;
	}

	// return
	return sum;
}

long long* add_nums5(long long* a, long long* b) {
	long long temp_sum = 0;
	int carry = 0;
	int n1 = sizeof(a);
	int n2 = sizeof(b);

	// sum
	long long sum[255];
	for (int i = n1; i >= 0; i--) {
		temp_sum = a[i] + b[i] + carry;
		if (i == 0) {
			sum[i] = temp_sum;
		} else {
			sum[i] = temp_sum % 10000000000;
		}
		carry = temp_sum / 10000000000;

	}

	// return
	return sum;

}

void print_vector(vector<long long> output) {
	int z = 0;
	for (int i = 0; i < output.size(); i++) {
		// pad zeros
		z = 10 - to_string(output[i]).length();
		for (int l = 0; l < z; l++) {
			cout << '0';
		}
		// cout sum
		cout << output[i];
	}
	cout << endl;
}

void test() {
	string a, b, o;
	bool outputs = true;

	// test 1
	a = "4764764236724372437423764764768746823437628476287462746476247628476276237462";
	b = "6567677675576845768789797009568773887678457867834785678785478799659972433142";
	o = "11332441912301218206213561774337520711116086344122248425261726428136248670604";
	string result = add_nums3(a, b);
	if (result != o) {
		outputs = false;
		cout << "\nFailed Test 1\nReturned Result: " << result << "\nCorrect Result:  " << o << endl;
	} else {
		cout << "Passed test 1\n";
	}

	// test 2
	a = "15467985611234679845178946510379845612546541238708";
	b = "67467985611412679845878946783212365212043542388978";
	o = "82935971222647359691057893293592210824590083627686";
	result = add_nums3(a, b);
	if (result != o) {
		outputs = false;
		cout << "\nFailed Test 2\nReturned Result: " << result << "\nCorrect Result:  " << o << endl;
	} else {
		cout << "Passed test 2\n";
	}

	// test 3
	a = "854";
	b = "3490869874525661171450984136557430147576783417576843768874537841377856463451511814589359395";
	o = "3490869874525661171450984136557430147576783417576843768874537841377856463451511814589360249";
	result = add_nums3(a, b);
	if (result != o) {
		outputs = false;
		cout << "\nFailed Test 3\nReturned Result: " << result << "\nCorrect Result:  " << o << endl;
	} else {
		cout << "Passed test 3\n";
	}

	// test 4
	a = "6868934757843868787934598698562525767617627545694805876789458794829894586845899685985498292";
	b = "9342";
	o = "6868934757843868787934598698562525767617627545694805876789458794829894586845899685985507634";
	result = add_nums3(a, b);
	if (result != o) {
		outputs = false;
		cout << "\nFailed Test 4\nReturned Result: " << result << "\nCorrect Result:  " << o << endl;
	} else {
		cout << "Passed test 4\n";
	}

	// cout
	cout << "Passed all tests: " << outputs << endl;

}

void timeit(int itterations) {
	int total_time = 0;
	for (int n = 0; n < itterations; n++) {
		// vars
		clock_t s = clock();
		//string a = "1";
		//string b = "1";
		//vector<long long> a = {1};
		//vector<long long> b = {1};
		//long long a = 1;
		//long long b = 1;
		long long a[1] = { 1 };
		long long b[1] = { 1 };

		// process
		for (int i = 0; i < 10000000; i++) {
			//b = add_nums3(a, b);
			//b = add_nums4_2(a, b);
			//b = so_answer(a, b);
			b[0] = a[0] + b[0];
		}

		// cout
		clock_t e = clock();
		total_time += e - s;
		cout << (e - s) << ", ";
	}
	int average = (total_time / itterations);
	cout << "\nAverage: " << average << endl;
}

int main() {
	//test();
	//timeit(10);
	//add_nums4_1("1", "1");

	//vector<long long> a = { 3454654456, 4565464554 };
	//vector<long long> b = { 6654456654, 6554454666 };

	//vector<long long> output = add_nums4_2(a, b);
	//print_vector(output);

	//timeit(20);

	long long a[1] = { 3454654456 };
	long long b[1] = { 4565464554 };
	long long sum[255] = { 0 };

	sum = add_nums5(a, b);


	system("pause");
}
