#include <iostream>
#include <String>

using namespace std;

int calc() {
	int num1;
	int num2;
	int result;
	int opertr;
	string opertr_text;

	cout << "Enter First Number: ";
	cin >> num1;

	cout << "Enter Second Number: ";
	cin >> num2;

	cout << "Enter operator:\n1. Add\n2. Subtract\n3. Times\n4. Divide\n> ";
	cin >> opertr;

	switch (opertr) {
		case 1:
			result = num1 + num2;
		case 2:
			result = num1 - num2;
		case 3:
			result = num1 * num2;
		case 4:
			result = num1 / num2;
	}

	cout << endl << "Result: " << num1 << opertr_text << num2 << " = " << result;
}

int main() {
	while (true) {
		calc();
	}
}