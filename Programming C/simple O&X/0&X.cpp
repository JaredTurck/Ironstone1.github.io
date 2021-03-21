#include <iostream>
#include <conio.h>
#include <string>

using namespace std;

string board[9] = {" ", " ", " ", " ", " ", " ", " ", " ", " "};

void PrintBoard() {
	cout << " _____________" << endl;
	for (int I=0; I<3; I++) {
		for (int II=0; II<3; II++) {
			cout << " | " << board[(I*3)+II];
		} cout << " |\n" << " |---|---|---|" << endl;
	}
}

int main() {
	while (true) {
		PrintBoard();
	
		string user;
		cout << ">>> ";
		getline(cin, user);
		
		// validate input, contains only digits, in range 0,8
	
		board[(int)user] = "X";
		PrintBoard();
	
	} return 0;
}

// update board
// wait 5 sec
// computers turn
// update board