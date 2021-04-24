#include <iostream>

using namespace std;

int main() {
	int num1, num2, optr1;

	cout << "enter number 1:";
	cin >> num1;

	cout << "enter number 2:";
	cin >> num2;

	cout << "Menu:\n1. Add\n2. Subtract\n3. Times\n4. Divide\n>>> ";
	cin >> optr1;

	switch (optr1) {
	case 1:
		cout << num1 << " + " << num2 << " = " << num1+num2;

	case 2:
		cout << num1 << " - " << num2 << " = " << num1 - num2;

	case 3:
		cout << num1 << " x " << num2 << " = " << num1 * num2;

	case 4:
		cout << num1 << " / " << num2 << " = " << num1 / num2;

	}
}