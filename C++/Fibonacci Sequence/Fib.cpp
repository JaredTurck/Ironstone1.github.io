#include <stdio.h>
#include <iostream>

using namespace std;

int fib(int no_places) 
{
	int num1 = 0;
	int num2 = 1;
	int num3 = 0;
	
	for (int i=0;i<no_places;i++) {
		num3 = num1+num2;
		num1 = num2;
		num2 = num3;
		printf("%d, ", num3);
	}
	return num3;
}

int main()
{
	
	fib(20);
	
	system("pause");
}

bool isAnIt(string user_input) 
{
	bool isInt = false;
	string base10_range = "0123456789";
	
	while (isInt == false) {
		cout << "\nEnter number of places to display Fibonacci Sequence up to\n> ";
		getline(cin, user_input);
		
		for (int i=0;i<user_input.length();i++) {
			if ((base10_range.find(user_input[i]) != string::npos) == false) {
				//return false;
			}
		}
	}
}