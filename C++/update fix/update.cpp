#include <fstream>
#include <iostream>

using namespace std;

int main() {
	string user;
	while (user != "y" && user != "n") {
		cout << "Would you like to start repairs? (Y/N)";
		cin >> user;
	} if(user != "y") {return 0;}
	
	ifstream file("fixs.txt");
	string line;
	while (getline(file, line)) {
		cout << line << endl;
	}
	cin >> user;
	return 0;
}