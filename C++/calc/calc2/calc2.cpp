// import the IO library, so we can print to console
#include <iostream>

// imports all methods of std into "namespace"
// namespace is the memory space the C++ file runs in.
using namespace std;

// calc function
int calc() {
	// declare varaibles
	int num1;
	int num2;
	
	// print text to console
	cout << "Enter First Number: ";
	
	// get input and assign value to num1
	cin >> num1;
	
	// print text to console
	cout << "Enter Second Number: ";
	
	// get input and assign value to num2
	cin >> num2;
	
	// add the numbers then return
	return num1 + num2;
}

// every C++ file needs an int main function
// entry point, where CPU starts executing instructions from
int main() {
	// run calc function and get answer
	int answer = calc();
	
	// print answer
	cout << "answer: " << answer << endl;
	
	// pause program so console doesn't exit
	system("pause");
	
	// return true, to indivate the program had no error
	return 0;
}