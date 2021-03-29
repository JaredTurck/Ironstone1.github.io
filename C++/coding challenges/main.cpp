#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <algorithm>
#include <assert.h>
#include <ctime>
#include <chrono>

using namespace std;

//Question:
//Write a program which will find all such numbers which are divisible by 7 but are not a multiple of 5,
//between 2000 and 3200 (both included).
//The numbers obtained should be printed in a comma-separated sequence on a single line.
//
//Hints: 
//Consider use range(#begin, #end) method
void question1() {
	cout << "\n--- Question 1 ---" << endl;
	for (int i = 2000; i <= 3200; i++) {
		if (i % 7 == 0 && i % 5 != 0) {
			cout << i << " ";
		}
	}
}

//Question:
//Write a program which can compute the factorial of a given numbers.
//The results should be printed in a comma-separated sequence on a single line.
//Suppose the following input is supplied to the program:
//8
//Then, the output should be:
//40320
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
void question2(int n) {
	cout << "\n--- Question 2 ---" << endl;
	int total = 1;
	for (int i = n; i > 0; i--) {
		total = total * i;
	}
	cout << total;
}

//Question:
//With a given integral number n, write a program to generate a dictionary that contains (i, i*i) such that is an integral number between 1 and n (both included). 
//and then the program should print the dictionary.
//Suppose the following input is supplied to the program:
//8
//Then, the output should be:
//{1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64}
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
//Consider use dict()
void question3(int n) {
	cout << "\n--- Question 3 ---" << endl;
	int f = 1;
	int c = 0;
	for (int i = 0; i < n; i++) {
		c += f;
		f += 2;
		cout << c << " ";
	}
}

//Question:
//Write a program which accepts a sequence of comma-separated numbers from console and generate a list and a tuple which contains every number.
//Suppose the following input is supplied to the program:
//34,67,55,33,12,98
//Then, the output should be:
//['34', '67', '55', '33', '12', '98']
//('34', '67', '55', '33', '12', '98')
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
//tuple() method can convert list to tuple
void question4(string num) {
	cout << "\n--- Question 4 ---" << endl;
	vector<string> list;
	string c = "";
	num += ',';
	for (int i = 0; i <= num.size(); i++) {
		if (num[i] != ',') {
			c += num[i];
		} else {
			list.push_back(c);
			cout << c << " ";
			c = "";
		}
	}

}


//Question:
//Define a class which has at least two methods:
//getString: to get a string from console input
//printString: to print the string in upper case.
//Also please include simple test function to test the class methods.
//
//Hints:
//Use __init__ method to construct some parameters
class question5 {
	public:
		string input;

		void getString() {
			cout << "Enter some text: ";
			cin >> input;
		}

		void printString() {
			cout << "Output: " << input;
		}
};

void question5_test() {
	cout << "\n--- Question 5 ---" << endl;
	question5 q5;
	q5.getString();
	q5.printString();
}

//Question:
//Write a program that calculates and prints the value according to the given formula:
//Q = Square root of [(2 * C * D)/H]
//Following are the fixed values of C and H:
//C is 50. H is 30.
//D is the variable whose values should be input to your program in a comma-separated sequence.
//Example:
//Let us assume the following comma separated input sequence is given to the program:
//100,150,180
//The output of the program should be:
//18,22,24
//
//Hints:
//If the output received is in decimal form, it should be rounded off to its nearest value (for Example:, if the output received is 26.0, it should be printed as 26)
//In case of input data being supplied to the question, it should be assumed to be a console input. 
void question6(string d) {
	cout << "\n--- Question 6 ---" << endl;
	vector<int> x;
	string y = "";
	d += ',';
	int r;
	int C = 50;
	int H = 30;
	for (int i = 0; i < d.size(); i++) {
		if (d[i] != ',') {
			y += d[i];
		} else {
			r = pow(static_cast<int>(2 * C * stoi(y)/H), 0.5);
			x.push_back(r);
			cout << r << " ";
			y = "";

		}
	}
}

//Question 7
//Level 2
//
//Question:
//Write a program which takes 2 digits, X,Y as input and generates a 2-dimensional array. The element value in the i-th row and j-th column of the array should be i*j.
//Note: i=0,1.., X-1; j=0,1,¡­Y-1.
//Example:
//Suppose the following inputs are given to the program:
//3,5
//Then, the output of the program should be:
//[[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 6, 8]] 
//
//Hints:
//Note: In case of input data being supplied to the question, it should be assumed to be a console input in a comma-separated form.
void question7(int x, int y) {
	cout << "\n--- Question 7 ---" << endl;
	for (int i = 0; i < x; i++) {
		for (int j = 0; j < y; j++) {
			cout << i * j << " ";
		}
	}
}

//Question:
//Write a program that accepts a comma separated sequence of words as input and prints the words in a comma-separated sequence after sorting them alphabetically.
//Suppose the following input is supplied to the program:
//without,hello,bag,world
//Then, the output should be:
//bag,hello,without,world
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.

string join_string(vector<string> input) {
	string output;
	for (int i = 0; i < input.size(); i++) {
		output += input[i];
	}
	return output;
}

vector<string> join_vector(vector<string> a, vector<string> b) {
	vector<string> output;
	output.reserve(a.size() + b.size());
	output.insert(output.end(), a.begin(), a.end());
	output.insert(output.end(), b.begin(), b.end());
	return output;
}

vector<string> merge(vector<string> l, vector<string> r) {
	if (l.size() == 0) {
		return r;
	}
	if (r.size() == 0) {
		return l;
	}

	vector<string> re;
	int il = 0;
	int ir = 0;

	while (re.size() < (l.size() + r.size())) {
		if (l[ir] <= r[ir]) {
			re.push_back(l[il]);
			il++;
		} else {
			re.push_back(r[ir]);
			ir++;
		}

		if (ir == r.size()) {
			vector<string> temp1 = vector<string>(l.begin() + il, l.end()); // remove items from vector
			re = join_vector(temp1, re);
			break;
		}
		if (il == l.size()) {
			vector<string> temp2 = vector<string>(r.begin() + ir, r.end()); // remove items from vector
			re = join_vector(temp2, re);
			break;
		}
	}
	return re;
}

vector<string> merge_sort(vector<string> a) {
	if (a.size() < 2) {
		return a;
	}
	
	int m = static_cast<int>(a.size() / 2);
	vector<string> start = vector<string>(a.begin(), a.end() - m);
	vector<string> end = vector<string>(a.begin() + m, a.end());
	return merge(
		merge_sort(start),
		merge_sort(end)
	);
}

vector<string> split_string(string x, char chr=',') {
	// split the text
	vector<string> inputs;
	string r;
	x += chr;
	for (int i = 0; i < x.size(); i++) {
		if (x[i] != chr) {
			r += x[i];
		} else {
			inputs.push_back(r);
			r = "";
		}
	}
	return inputs;
}

void question8(string input) {
	cout << "\n--- Question 8 ---" << endl;
	vector<string> s = split_string(input, ',');
	vector<string> output = merge_sort(s);
	for (int i = 0; i < output.size(); i++) {
		cout << output[i] << " ";
	}
}


//Question 9
//Level 2
//
//Question£º
//Write a program that accepts sequence of lines as input and prints the lines after making all characters in the sentence capitalized.
//Suppose the following input is supplied to the program:
//Hello world
//Practice makes perfect
//Then, the output should be:
//HELLO WORLD
//PRACTICE MAKES PERFECT
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
void question9(string input) {
	cout << "\n--- Question 9 ---" << endl;
	string lowercase = "abcdefghijklmnopqrstuvwxyz";
	string uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	vector<string> s = split_string(input, '\n');
	string output;

	for (int i = 0; i < input.size(); i++) {
		if (lowercase.find(input[i]) != string::npos) {
			output += uppercase[lowercase.find(input[i])];
		} else {
			output += input[i];
		}
	}
	cout << output << endl;
}

//Question:
//Write a program that accepts a sequence of whitespace separated words as input and prints the words after removing all duplicate words and sorting them alphanumerically.
//Suppose the following input is supplied to the program:
//hello world and practice makes perfect and hello world again
//Then, the output should be:
//again and hello makes perfect practice world
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
//We use set container to remove duplicated data automatically and then use sorted() to sort the data.
vector<string> filter(vector<string> input, string chr=" ", bool dupes=true) {
	vector<string> output;
	for (int i = 0; i < input.size(); i++) {
		if (input[i] != chr) {
			if (dupes == true) {
				// check if the item is already in vector
				if (find(output.begin(), output.end(), input[i]) != output.end()) {
					output.push_back(input[i]);
				}
			} else {
				output.push_back(input[i]);
			}
		}
	}
	return output;
}

void question10(string input) {
	cout << "\n--- Question 10 ---" << endl;
	vector<string> s = split_string(input, ' ');
	vector<string> f = filter(s);
	vector<string> m = merge_sort(f);
	cout << s.size() << " " << f.size() << " " << m.size();
	for (int i = 0; i < m.size(); i++) {
		cout << m[i] << " ";
	}
}

//Question:
//Write a program which accepts a sequence of comma separated 4 digit binary numbers as its input and then check whether they are divisible by 5 or not. The numbers that are divisible by 5 are to be printed in a comma separated sequence.
//Example:
//0100,0011,1010,1001
//Then the output should be:
//1010
//Notes: Assume the data is input by console.
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
string reverse_string(string input) {
	string output;
	for (int i = 0; i < input.size()+1; i++) {
		output += input[input.size() - i];
	}
	return output;
}

int bin2int(string bin) {
	int total = 0;
	int c;
	// for bin num in array
	string r = reverse_string(bin);
	for (int i = 0; i < r.size(); i++) {
		if (r[i] == '1') {
			c = pow(2, i-1);
			total += c;
		}
	}
	return total;
}

void question11(string input) {
	cout << "\n--- Question 11 ---" << endl;
	vector<string> s = split_string(input, ',');
	cout << "input size: " << input.size() << " s size: " << s.size() << endl;
	string output;
	int c;
	for (int i = 0; i < s.size(); i++) {
		string c = to_string(bin2int(s[i]) % 5 == 0);
		if (bin2int(s[i]) % 5 == 0) {
			output += (s[i] + ",");
		}
	}
	cout << output.substr(0, output.length()-1);
}

//Question:
//Write a program, which will find all such numbers between 1000 and 3000 (both included) such that each digit of the number is an even number.
//The numbers obtained should be printed in a comma-separated sequence on a single line.
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
void question12() {
	cout << "\n--- Question 12 ---" << endl;
	string c;
	int r;
	for (int i = 1000; i <= 3000; i++) {
		c = to_string(i);
		r = 0;
		for (int x = 0; x < c.size(); x++) {
			if (static_cast<int>(c[x]) % 2 == 0) {
				r++;
			}
		}
		if (r == c.length()) {
			cout << c << ",";
		}
		r = 0;
	}
}

//Question:
//Write a program that accepts a sentence and calculate the number of letters and digits.
//Suppose the following input is supplied to the program:
//hello world! 123
//Then, the output should be:
//LETTERS 10
//DIGITS 3
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
void question13(string text) {
	cout << "\n--- Question 13 ---" << endl;
	string alpha = "abcdefghijklmnopqrstuvwxyz";
	string num = "0123456789";
	int letters = 0;
	int digits = 0;
	for (int i = 0; i < text.length(); i++) {
		if (alpha.find(text[i]) != string::npos) {
			letters++;
		} else if (num.find(text[i]) != string::npos) {
			digits++;
		}
	}
	cout << "Letters: " << letters << "\nDigits: " << digits;
}

//Question:
//Write a program that accepts a sentence and calculate the number of upper case letters and lower case letters.
//Suppose the following input is supplied to the program:
//Hello world!
//Then, the output should be:
//UPPER CASE 1
//LOWER CASE 9
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
void question14(string text) {
	cout << "\n--- Question 14 ---" << endl;
	vector<int> cas = { 0, 0 };
	for (int i = 0; i < text.length(); i++) {
		if (isupper(text[i]) == true) {
			cas[0]++;
		} else if (islower(text[i]) != 0) {
			cas[1]++;
		}
	}
	cout << "Upper Case: " << cas[0] << "\nLower Case: " << cas[1];
}

//Question:
//Write a program that computes the value of a+aa+aaa+aaaa with a given digit as the value of a.
//Suppose the following input is supplied to the program:
//9
//Then, the output should be:
//11106
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
string repeat_string(string t, int n) {
	string a;
	for (int i = 0; i < n; i++) {
		a += t;
	}
	return a;
}

void question15(int a) {
	cout << "\n--- Question 15 ---" << endl;
	string n = to_string(a);
	int answer = a + stoi(repeat_string(n, 2)) + stoi(repeat_string(n, 3)) + stoi(repeat_string(n, 4));
	cout << answer;
}

//Question:
//Use a list comprehension to square each odd number in a list. The list is input by a sequence of comma-separated numbers.
//Suppose the following input is supplied to the program:
//1,2,3,4,5,6,7,8,9
//Then, the output should be:
//1,3,5,7,9
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
void question16(int n) {
	cout << "\n--- Question 16 ---" << endl;
	for (int i = 0; i < n; i++) {
		if (i % 2 == 1) {
			cout << i << ",";
		}
	}
}

//Question:
//Write a program that computes the net amount of a bank account based a transaction log from console input. The transaction log format is shown as following:
//D 100
//W 200
//
//D means deposit while W means withdrawal.
//Suppose the following input is supplied to the program:
//D 300
//D 300
//W 200
//D 100
//Then, the output should be:
//500
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
void question17(string input) {
	cout << "\n--- Question 17 ---" << endl;
	int balance = 0;
	vector<string> actions = split_string(input, '\n');
	for (int i = 0; i < actions.size(); i++) {
		vector<string> action = split_string(actions[i], ' ');
		if (action[0] == "D") {
			balance += stoi(action[1]);
		} else if (action[0] == "W") {
			balance -= stoi(action[1]);
		}
	}
	cout << "Balance: " << balance;
}

//Question:
//A website requires the users to input username and password to register. Write a program to check the validity of password input by users.
//Following are the criteria for checking the password:
//1. At least 1 letter between [a-z]
//2. At least 1 number between [0-9]
//1. At least 1 letter between [A-Z]
//3. At least 1 character from [$#@]
//4. Minimum length of transaction password: 6
//5. Maximum length of transaction password: 12
//Your program should accept a sequence of comma separated passwords and will check them according to the above criteria. Passwords that match the criteria are to be printed, each separated by a comma.
//Example:
//If the following passwords are given as input to the program:
//ABd1234@1,a F1#,2w3E*,2We3345
//Then, the output of the program should be:
//ABd1234@1
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
bool check_password_condition(string password, int f_index) {
	vector<string> formats = {
		"abcdefghijklmnopqrstuvwxyz",
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		"0123456789",
		"@#$"
	};
	for (int i = 0; i < password.length(); i++) {
		for (int x = 0; x < formats[f_index].size(); x++) {
			if (password[i] == formats[f_index][x]) {
				return true;
			}
		}
	}
	return false;
}

void question18(string input) {
	cout << "\n--- Question 18 ---" << endl;
	vector<string> passwords = split_string(input, ',');
	vector<string> valid;
	for (int i = 0; i < passwords.size(); i++) {
		int r = 0;
		for (int x = 0; x < 4; x++) {
			if (6 <= passwords[i].length() && passwords[i].length() <= 12) {
				if (check_password_condition(passwords[i], x) == true) {
					r++;
				}
			}
		}
		if (r == 4) {
			valid.push_back(passwords[i]);
			cout << passwords[i] << ",";
		}
	}
}

//Question:
//You are required to write a program to sort the (name, age, height) tuples by ascending order where name is string, age and height are numbers. The tuples are input by console. The sort criteria is:
//1: Sort based on name;
//2: Then sort based on age;
//3: Then sort by score.
//The priority is that name > age > score.
//If the following tuples are given as input to the program:
//Tom,19,80
//John,20,90
//Jony,17,91
//Jony,17,93
//Json,21,85
//Then, the output of the program should be:
//[('John', '20', '90'), ('Jony', '17', '91'), ('Jony', '17', '93'), ('Json', '21', '85'), ('Tom', '19', '80')]
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
//We use itemgetter to enable multiple sort keys.
void question19(vector<vector<string>> vect) {
	cout << "\n--- Question 19 ---" << endl;
	// reshape vectors
	vector<vector<string>> data = { vector<string> {}, vector<string> {},  vector<string> {} };
	for (int v = 0; v < vect[0].size(); v++) {
		for (int i = 0; i < vect.size(); i++) {
			data[v].push_back(vect[i][v]);
		}
	}

	// sort
	for (int i = 0; i < data.size(); i++) {
		sort(data[i].begin(), data[i].end());
	}

	// display data
	for (int i = 0; i < vect.size(); i++) {
		cout << "('" << data[0][i] << "', '" << data[1][i] << "', '" << data[2][i] << "'), " << endl;
	}
}

//Question:
//Define a class with a generator which can iterate the numbers, which are divisible by 7, between a given range 0 and n.
//
//Hints:
//Consider use yield
void question20(int n) {
	cout << "\n--- Question 20 ---" << endl;
	for (int i = 0; i < n; i++) {
		if (i % 7 == 0) {
			cout << i << ", ";
		}
	}
}

//Question£º
//A robot moves in a plane starting from the original point (0,0). The robot can move toward UP, DOWN, LEFT and RIGHT with a given steps. The trace of robot movement is shown as the following:
//UP 5
//DOWN 3
//LEFT 3
//RIGHT 2
//¡­
//The numbers after the direction are steps. Please write a program to compute the distance from current position after a sequence of movement and original point. If the distance is a float, then just print the nearest integer.
//Example:
//If the following tuples are given as input to the program:
//UP 5
//DOWN 3
//LEFT 3
//RIGHT 2
//Then, the output of the program should be:
//2
//
//Hints:
//In case of input data being supplied to the question, it should be assumed to be a console input.
int index_string(vector<string> v, string f) {
	if (find(v.begin(), v.end(), f) != v.end()) {
		return find(v.begin(), v.end(), f) - v.begin();
	} else {
		return -1;
	}
}

int round_double(double x) {
	x += 0.5 - (x < 0);
	return static_cast<int>(x);
}

void question21(string input) {
	cout << "\n--- Question 21 ---" << endl;
	/*up is increase Y
	down is decrease Y
	left is decrease X
	right is increase X*/

	vector<int> current_vector = { 0,0 };
	vector<string> actions = split_string(input, '\n');
	vector<string> str_actions = { "UP", "DOWN", "LEFT", "RIGHT" };
	for (int i = 0; i < actions.size(); i++) {
		vector<string> current_action = split_string(actions[i], ' ');
		vector<vector<int>> op = { 
			vector<int>{current_vector[0], current_vector[1] + stoi(current_action[1])},
			vector<int>{current_vector[0], current_vector[1] - stoi(current_action[1])},
			vector<int>{current_vector[0] + stoi(current_action[1]), current_vector[1]},
			vector<int>{current_vector[0] - stoi(current_action[1]), current_vector[1]},
		};
		current_vector = op[index_string(str_actions, current_action[0])];
	}

	// calculate vector length
	int vector_length = round_double(pow(pow(current_vector[0], 2) + pow(current_vector[1], 2), 0.5));
	cout << "Vector length: " << vector_length;
}

//Question:
//Write a program to compute the frequency of the words from the input. The output should output after sorting the key alphanumerically. 
//Suppose the following input is supplied to the program:
//New to Python or choosing between Python 2 and Python 3? Read Python 2 or Python 3.
//Then, the output should be:
//2:2
//3.:1
//3?:1
//New:1
//Python:5
//Read:1
//and:1
//between:1
//choosing:1
//or:2
//to:1
//
//Hints
//In case of input data being supplied to the question, it should be assumed to be a console input.
void question22(string input) {
	cout << "\n--- Question 22 ---" << endl;
	// count occurance of each word
	vector<string> s = split_string(input, ' ');
	vector<string> words;
	vector<int> words_value;
	for (int i = 0; i < s.size(); i++) {
		int index = index_string(words, s[i]);
		if (index >= 0) {
			// word exists increment its counter
			words_value[index]++;
		} else {
			// add new word
			words.push_back(s[i]);
			words_value.push_back(1);
		}
	}

	// sort words
	vector<string> key_pair;
	for (int i = 0; i < words.size(); i++) {
		key_pair.push_back(words[i] + ": " + to_string(words_value[i]));
	}
	sort(key_pair.begin(), key_pair.end());

	// display result
	for (int i = 0; i < key_pair.size(); i++) {
		cout << key_pair[i] << endl;
	}
}

//Question:
//    Write a method which can calculate square value of number
//
//Hints:
//    Using the ** operator
void question23(int n) {
	cout << "\n--- Question 23 ---" << endl;
	cout << "Square root of " << n << " is " << (pow(n, 0.5)) << "!" << endl;
}

//Question:
//    Python has many built-in functions, and if you do not know how to use it, you can read document online or find some books. But Python has a built-in document function for every built-in functions.
//    Please write a program to print some Python built-in functions documents, such as abs(), int(), raw_input()
//    And add document for your own function
//    
//Hints:
//    The built-in document method is __doc__
void question24() {
	cout << "\n--- Question 24 ---" << endl;
	cout << "abs()\t\tReturns the absolute value of parameter n\n";
	cout << "static_cast<int>\tConverts data to integer\n";
	cout << "stoi(string)\tConverts string to integer\n";
	cout << "to_string(int)\tConverts integer to string\n";
}

//Question:
//    Define a class, which have a class parameter and have a same instance parameter.
//
//Hints:
//    Define a instance parameter, need add it in __init__ method
//    You can init a object with construct parameter or set the value later
class class_question25 {
	public:
		int x = 25;
		void method1() {
			cout << "method 1, x = " << x << endl;
		}

		void method2() {
			cout << "method 2, x = " << x << endl;
			cout << "both methods can access the same variable!" << endl;
		}
};

void question25() {
	cout << "\n--- Question 25 ---" << endl;
	class_question25 a;
	a.method1();
	a.method2();
}

//Question:
//Define a function which can compute the sum of two numbers.
//
//Hints:
//Define a function with two numbers as arguments. You can compute the sum in the function and return the value.
void question26(int num1, int num2) {
	cout << "\n---Question 26 ---" << endl;
	cout << num1 << " + " << num2 << " = " << (num1 + num2);
}

//Question:
//Define a function that can convert a integer into a string and print it in console.
//
//Hints:
//
//Use str() to convert a number to string.
void question27(int num) {
	cout << "\n--- Question 27 ---" << endl;
	cout << num << " as a string: " << to_string(num);
}

//Question:
//Define a function that can convert a float into a string and print it in console.
//
//Hints:
//
//Use str() to convert a number to string.
void question28(double num) {
	cout << "\n--- Question 28 ---" << endl;
	cout << num << " as a string: " << to_string(num);
}

//Question:
//Define a function that can receive two integral numbers in string form and compute their sum and then print it in console.
//
//Hints:
//
//Use int() to convert a string to integer.
void question29(string num1, string num2) {
	cout << "\n--- Question 29 ---" << endl;
	cout << num1 << " + " << num2 << " = " << (stoi(num1) + stoi(num2));
}

//Question:
//Define a function that can accept two strings as input and concatenate them and then print it in console.
//
//Hints:
//
//Use + to concatenate the strings
void question30(string str1, string str2) {
	cout << "\n--- Question 30 ---" << endl;
	cout << str1 << " join " << str2 << " = " << (str1 + str2);
}

//Question:
//Define a function that can accept two strings as input and print the string with maximum length in console. If two strings have the same length, then the function should print al l strings line by line.
//
//Hints:
//
//Use len() function to get the length of a string
void question31(string str1, string str2) {
	cout << "\n--- Question 31 ---" << endl;
	if (str1.length() > str2.length()) {
		cout << str1;
	} else if (str2.length() > str1.length()) {
		cout << str2;
	} else {
		cout << str1 << endl << str2;
	}
}

//Question:
//Define a function that can accept an integer number as input and print the "It is an even number" if the number is even, otherwise print "It is an odd number".
//
//Hints:
//
//Use % operator to check if a number is even or odd.
void question32(int n) {
	cout << "\n --- Question 32 ---" << endl;
	if (n % 2 == 0) {
		cout << n << " is an even number!";
	} else {
		cout << n << " is an odd number!";
	}
}

//Question:
//Define a function which can print a dictionary where the keys are numbers between 1 and 3 (both included) and the values are square of keys.
//
//Hints:
//
//Use dict[key]=value pattern to put entry into a dictionary.
//Use ** operator to get power of a number.
void question33() {
	cout << "\n--- Question 33 ---" << endl;
	vector<vector<double>> x;
	for (int i = 1; i <= 3; i++) {
		vector<double> c = { 1, pow(i, 2) };
		x.push_back(c);
		cout << "'" << i << "' : '" << c[1] << "'" << endl;
	}
}

//Question:
//Define a function which can print a dictionary where the keys are numbers between 1 and 20 (both included) and the values are square of keys.
//
//Hints:
//
//Use dict[key]=value pattern to put entry into a dictionary.
//Use ** operator to get power of a number.
//Use range() for loops.
void question34() {
	cout << "\n--- Question 34 ---" << endl;
	vector<vector<double>> x;
	for (double i = 1; i <= 20; i++) {
		vector<double> c = { i, pow(i, 2) };
		x.push_back(c);
		cout << "'" << c[0] << "' : '" << c[1] << "'!" << endl;
	}
}

//Question:
//Define a function which can generate a dictionary where the keys are numbers between 1 and 20 (both included) and the values are square of keys. The function should just print the values only.
//
//Hints:
//
//Use dict[key]=value pattern to put entry into a dictionary.
//Use ** operator to get power of a number.
//Use range() for loops.
//Use keys() to iterate keys in the dictionary. Also we can use item() to get key/value pairs.
void question35() {
	cout << "\n--- Question 35 ---" << endl;
	vector<vector<double>> x;
	for (double i = 1; i <= 20; i++) {
		vector<double> c = { i, pow(i, 2) };
		x.push_back(c);
		cout << c[1] << ", ";
	}
}

//Question:
//Define a function which can generate a dictionary where the keys are numbers between 1 and 20 (both included) and the values are square of keys. The function should just print the keys only.
//
//Hints:
//
//Use dict[key]=value pattern to put entry into a dictionary.
//Use ** operator to get power of a number.
//Use range() for loops.
//Use keys() to iterate keys in the dictionary. Also we can use item() to get key/value pairs.
void question36() {
	cout << "\n--- Question 36 ---" << endl;
	vector<vector<double>> x;
	for (double i = 1; i <= 20; i++) {
		vector<double> c = { i, pow(i, 2) };
		x.push_back(c);
		cout << c[0] << ", ";
	}
}

//Question:
//Define a function which can generate and print a list where the values are square of numbers between 1 and 20 (both included).
//
//Hints:
//
//Use ** operator to get power of a number.
//Use range() for loops.
//Use list.append() to add values into a list.
void question37() {
	cout << "\n--- Question 37 ---" << endl;
	vector<vector<double>> x;
	for (double i = 1; i <= 20; i++) {
		vector<double> c = { i, pow(i, 2) };
		x.push_back(c);
		cout << "'" << c[0] << "' : '" << c[1] << "'" << endl;
	}
}

//Question:
//Define a function which can generate a list where the values are square of numbers between 1 and 20 (both included). Then the function needs to print the first 5 elements in the list.
//
//Hints:
//
//Use ** operator to get power of a number.
//Use range() for loops.
//Use list.append() to add values into a list.
//Use [n1:n2] to slice a list
void question38() {
	cout << "\n--- Question 38 ---" << endl;
	vector<vector<double>> x;
	for (double i = 1; i <= 20; i++) {
		vector<double> c = {i, pow(i, 2)};
		x.push_back(c);
		if (i <= 5) {
			cout << "'" << c[0] << "' : '" << c[1] << "'" << endl;
		}
	}
}

//Question:
//Define a function which can generate a list where the values are square of numbers between 1 and 20 (both included). Then the function needs to print the last 5 elements in the list.
//
//Hints:
//
//Use ** operator to get power of a number.
//Use range() for loops.
//Use list.append() to add values into a list.
//Use [n1:n2] to slice a list
void question39() {
	cout << "\n--- Question 39 ---" << endl;
	vector<vector<double>> x;
	for (double i = 1; i <= 20; i++) {
		vector<double> c = { i, pow(i, 2) };
		x.push_back(c);
		if (i >= 15) {
			cout << "'" << c[0] << "' : '" << c[1] << "'" << endl;
		}
	}
}

//Question:
//Define a function which can generate a list where the values are square of numbers between 1 and 20 (both included). Then the function needs to print all values except the first 5 elements in the list.
//
//Hints:
//
//Use ** operator to get power of a number.
//Use range() for loops.
//Use list.append() to add values into a list.
//Use [n1:n2] to slice a list
void question40() {
	cout << "\n--- Question 40 ---" << endl;
	vector<vector<double>> x;
	for (double i = 1; i <= 20; i++) {
		vector<double> c = { i, pow(i, 2) };
		x.push_back(c);
		if (i > 5) {
			cout << "'" << c[0] << "' : '" << c[1] << "'" << endl;
		}
	}
}

//Question:
//Define a function which can generate and print a tuple where the value are square of numbers between 1 and 20 (both included). 
//
//Hints:
//
//Use ** operator to get power of a number.
//Use range() for loops.
//Use list.append() to add values into a list.
//Use tuple() to get a tuple from a list.
void question41() {
	cout << "\n--- Question 41 ---" << endl;
	vector<vector<double>> x;
	for (double i = 1; i <= 20; i++) {
		vector<double> c = { i, pow(i, 2) };
		x.push_back(c);
		cout << "'" << c[0] << "' : '" << c[1] << "'" << endl;
	}
}

//Question:
//With a given tuple (1,2,3,4,5,6,7,8,9,10), write a program to print the first half values in one line and the last half values in one line. 
//
//Hints:
//
//Use [n1:n2] notation to get a slice from a tuple.
void question42(vector<int> num) {
	cout << "\n--- Question 42 ---" << endl;;
	vector<int> first_half = vector<int>(num.begin(), num.end() - (static_cast<int>(num.size()/2)));
	vector<int> second_half = vector<int>(num.begin() - (static_cast<int>(num.size()/2)), num.end());
	for (int i = i; i < first_half.size(); i++) {
		cout << first_half[i] << ", ";
	} cout << endl;
	for (int i = 0; i < second_half.size(); i++) {
		cout << second_half[i] << ", ";
	} cout << endl;
}

//Question:
//Write a program to generate and print another tuple whose values are even numbers in the given tuple (1,2,3,4,5,6,7,8,9,10). 
//
//Hints:
//
//Use "for" to iterate the tuple
//Use tuple() to generate a tuple from a list.
void question43(vector<int> x) {
	cout << "\n--- Question 43 ---" << endl;
	for (int i = 0; i < x.size(); i++) {
		if (x[i] % 2 == 0) {
			cout << x[i] << ", ";
		}
	}
}

//Question:
//Write a program which accepts a string as input to print "Yes" if the string is "yes" or "YES" or "Yes", otherwise print "No". 
//
//Hints:
//
//Use if statement to judge condition.
string to_lowercase(string text) {
	string output;
	for (int i = 0; i < text.length(); i++) {
		output += tolower(text[i]);
	}
	return output;
}

void question44(string text) {
	cout << "\n--- Question 44 ---" << endl;
	if (to_lowercase(text) == "yes") {
		cout << "Yes!";
	} else {
		cout << "No!";
	}
}

//Question:
//Write a program which can filter even numbers in a list by using filter function. The list is: [1,2,3,4,5,6,7,8,9,10].
//
//Hints:
//
//Use filter() to filter some elements in a list.
//Use lambda to define anonymous functions.
void question45(vector<int> num) {
	cout << "\n--- Question 45 ---" << endl;
	vector<int> output;
	for (int i = 0; i < num.size(); i++) {
		if (num[i] % 2 == 0) {
			output.push_back(num[i]);
			cout << num[i] << ", ";
		}
	}
}

//Question:
//Write a program which can map() to make a list whose elements are square of elements in [1,2,3,4,5,6,7,8,9,10].
//
//Hints:
//
//Use map() to generate a list.
//Use lambda to define anonymous functions.
void question46(vector<int> num) {
	cout << "\n--- Question 46 ---" << endl;
	vector<int> output;
	for (int i = 0; i < num.size(); i++) {
		int r = pow(num[i], 2);
		output.push_back(r);
		cout << r << ", ";
	}
}

//Question:
//Write a program which can map() and filter() to make a list whose elements are square of even number in [1,2,3,4,5,6,7,8,9,10].
//
//Hints:
//
//Use map() to generate a list.
//Use filter() to filter elements of a list.
//Use lambda to define anonymous functions.
void question47(vector<int> num) {
	cout << "\n--- Question 47 ---" << endl;
	vector<int> output;
	for (int i = 0; i < num.size(); i++) {
		int r = pow(num[i], 2);
		if (r % 2 == 0) {
			output.push_back(r);
			cout << r << ", ";
		}
	}
}

//Question:
//Write a program which can filter() to make a list whose elements are even number between 1 and 20 (both included).
//
//Hints:
//
//Use filter() to filter elements of a list.
//Use lambda to define anonymous functions.
void question48() {
	cout << "\n--- Question 48 ---" << endl;
	for (int i = 0; i <= 20; i++) {
		if (i % 2 == 0) {
			cout << i << ", ";
		}
	}
}

//Question:
//Write a program which can map() to make a list whose elements are square of numbers between 1 and 20 (both included).
//
//Hints:
//
//Use map() to generate a list.
//Use lambda to define anonymous functions.
void question49() {
	cout << "\n--- Question 49 ---" << endl;
	for (int i = 0; i <= 20; i++) {
		int r = pow(i, 2);
		if (r % 2 == 0) {
			cout << r << ", ";
		}
	}
}

//Question:
//Define a class named American which has a static method called printNationality.
//
//Hints:
//
//Use @staticmethod decorator to define class static method.
class American {
	public:
	static void printNationality() {
		cout << "I am American!";
	}
};

void question50() {
	cout << "\n--- Question 50 ---" << endl;
	American person;
	person.printNationality();
}

//Question:
//Define a class named American and its subclass NewYorker. 
//
//Hints:
//
//Use class Subclass(ParentClass) to define a subclass.
class American2 {
	public:
	void person_us() {
		cout << "an American Person!" << endl;
	}
};

class NewYorker : public American2 {
	public:
	void person_ny() {
		cout << "a New Yorker!" << endl;
	}
};

void question51() {
	cout << "\n--- Question 51 ---" << endl;
	American2 a;
	a.person_us();
	
	NewYorker b;
	b.person_ny();
	b.person_us();
}


//Question:
//Define a class named Circle which can be constructed by a radius. The Circle class has a method which can compute the area. 
//
//Hints:
//
//Use def methodName(self) to define a method.
class Circle {
	public:
	int pi = 3.1415;
	void get_area() {
		int r;
		cout << "enter area: ";
		cin >> r;
		cout << "Area: " << pow(pi * r, 2);
	}
};

void question52() {
	cout << "\n--- Question 52 ---" << endl;
	Circle a;
	a.get_area();
}

//Define a class named Rectangle which can be constructed by a length and width. The Rectangle class has a method which can compute the area. 
//
//Hints:
//
//Use def methodName(self) to define a method.
class Rectangle {
	public:
	void get_area() {
		int width;
		int height;
		cout << "Enter Width: ";
		cin >> width;
		cout << "Enter Height: ";
		cin >> height;
		cout << "Area: " << (width * height);
	}
};

void question53() {
	cout << "\n--- Question 53 ---" << endl;
	Rectangle a;
	a.get_area();
}

//Define a class named Shape and its subclass Square. The Square class has an init function which takes a length as argument. Both classes have a area function which can print the area of the shape where Shape's area is 0 by default.
//
//Hints:
//
//To override a method in super class, we can define a method with the same name in the super class.
class Shape {
	public:
	void get_area(int length, int height) {
		cout << "Area: " << (length * height);
	}
};

class Square {
	public:
	void get_area(int length, int height) {
		cout << "Area: " << (length * height);
	}
};

void question54() {
	cout << "\n--- Question 54 ---" << endl;
	Shape a;
	a.get_area(56, 78);
	Square b;
	b.get_area(56, 89);
}

//Please raise a RuntimeError exception.
//
//Hints:
//
//Use raise() to raise an exception.
void question55() {
	cout << "\n--- Question 55 ---" << endl;
	const string& a = "a";
	try {
		throw runtime_error(a);
	} catch (runtime_error err) {
		cout << "Runtime error was thrown!";
	}
}

//Write a function to compute 5/0 and use try/except to catch the exceptions.
//
//Hints:
//
//Use try/except to catch exceptions.
void question56() {
	cout << "\n--- Question 56 ---" << endl;
	try {
		throw overflow_error("Divide by zero!");
	} catch (overflow_error err) {
		cout << "Error was thrown " << err.what();
	}
}

//Define a custom exception class which takes a string message as attribute.
//
//Hints:
//
//To define a custom exception, we need to define a class inherited from Exception.
void question57() {
	cout << "\n--- Question 57 ---" << endl;
	try {
		string text;
		cout << "Enter something: ";
		cin >> text;
		throw runtime_error(text);
	} catch (runtime_error err) {
		cout << "Error thrown " << err.what();
	}
}

//Question:
//
//Assuming that we have some email addresses in the "username@companyname.com" format, please write program to print the user name of a given email address. Both user names and company names are composed of letters only.
//
//Example:
//If the following email address is given as input to the program:
//
//john@google.com
//
//Then, the output of the program should be:
//
//john
//
//In case of input data being supplied to the question, it should be assumed to be a console input.
//
//Hints:
//
//Use //w to match letters.
void question58(string email) {
	cout << "\n--- Question 58 ---" << endl;
	string name = split_string(email, '@')[0];
	cout << name;
}

//Question:
//
//Assuming that we have some email addresses in the "username@companyname.com" format, please write program to print the company name of a given email address. Both user names and company names are composed of letters only.
//
//Example:
//If the following email address is given as input to the program:
//
//john@google.com
//
//Then, the output of the program should be:
//
//google
//
//In case of input data being supplied to the question, it should be assumed to be a console input.
//
//Hints:
//
//Use //w to match letters.
void question59(string email) {
	cout << "\n--- Question 59 ---" << endl;
	string name = split_string(split_string(email, '@')[1], '.')[0];
	cout << name;
}

//Question:
//
//Write a program which accepts a sequence of words separated by whitespace as input to print the words composed of digits only.
//
//Example:
//If the following words is given as input to the program:
//
//2 cats and 3 dogs.
//
//Then, the output of the program should be:
//
//['2', '3']
//
//In case of input data being supplied to the question, it should be assumed to be a console input.
//
//Hints:
//
//Use re.findall() to find all substring using regex.
bool is_digit(string text) {
	int count = 0;
	string digits = "0123456789";
	for (int i = 0; i < text.size(); i++) {
		if (digits.find(text[i]) != string::npos) {
			count++;
		}
	}
	if (count == text.size()) {
		return true;
	} else {
		return false;
	}
}

void question60(string text) {
	cout << "\n--- Question 60 ---" << endl;
	vector<string> t = split_string(text, ' ');
	vector<string> output;
	for (int i = 0; i < t.size(); i++) {
		if (is_digit(t[i]) == true) {
			output.push_back(t[i]);
			cout << t[i] << ", ";
		}
	}
}

//Question:
//
//
//Print a unicode string "hello world".
//
//Hints:
//
//Use u'strings' format to define unicode string.
void question61() {
	cout << "\n--- Question 61---" << endl;
	cout << "Hello Wordl!";
}

//Write a program to read an ASCII string and to convert it to a unicode string encoded by utf-8.
//
//Hints:
//
//Use unicode() function to convert.
void question62() {
	cout << "\n--- Question 62 ---" << endl;
	string input;
	cout << "Enter text: ";
	cin >> input;
	cout << input;
}

//Question:
//
//Write a special comment to indicate a Python source code file is in unicode.
//
//Hints:
void question63() {
	cout << "\n--- Question 63 ---" << endl;
	cout << "Unicode!";
}

//Question:
//
//Write a program to compute 1/2+2/3+3/4+...+n/n+1 with a given n input by console (n>0).
//
//Example:
//If the following n is given as input to the program:
//
//5
//
//Then, the output of the program should be:
//
//3.55
//
//In case of input data being supplied to the question, it should be assumed to be a console input.
//
//Hints:
//Use float() to convert an integer to a float
void question64(int n) {
	cout << "\n--- Question 64 ---" << endl;
	float t = 0;
	for (float i = 1; i < n+1; i++) {
		t += i / (i + 1);
	}
	cout << t;
}

//Question:
//
//Write a program to compute:
//
//f(n)=f(n-1)+100 when n>0
//and f(0)=1
//
//with a given n input by console (n>0).
//
//Example:
//If the following n is given as input to the program:
//
//5
//
//Then, the output of the program should be:
//
//500
//
//In case of input data being supplied to the question, it should be assumed to be a console input.
//
//Hints:
//We can define recursive function in Python.
int f(int n) {
	if (n == 0) {
		return 0;
	} else {
		return f(n - 1) + 100;
	}
}

void question65(int n) {
	cout << "\n--- Question 65 ---" << endl;
	cout << f(n);
}

//Question:
//
//
//The Fibonacci Sequence is computed based on the following formula:
//
//
//f(n)=0 if n=0
//f(n)=1 if n=1
//f(n)=f(n-1)+f(n-2) if n>1
//
//Please write a program to compute the value of f(n) with a given n input by console.
//
//Example:
//If the following n is given as input to the program:
//
//7
//
//Then, the output of the program should be:
//
//13
//
//In case of input data being supplied to the question, it should be assumed to be a console input.
//
//Hints:
//We can define recursive function in Python.
void question66(int itter) {
	cout << "\n--- Question 66 ---" << endl;
	vector<int> n = {0, 1};
	int oldn;
	for (int i = 0; i < itter; i++) {
		oldn = n[0];
		n[0] = n[1];
		n[1] = oldn + n[1];
		cout << n[0] << ", ";
	}
}

//Question:
//
//The Fibonacci Sequence is computed based on the following formula:
//
//
//f(n)=0 if n=0
//f(n)=1 if n=1
//f(n)=f(n-1)+f(n-2) if n>1
//
//Please write a program using list comprehension to print the Fibonacci Sequence in comma separated form with a given n input by console.
//
//Example:
//If the following n is given as input to the program:
//
//7
//
//Then, the output of the program should be:
//
//0,1,1,2,3,5,8,13
//
//
//Hints:
//We can define recursive function in Python.
//Use list comprehension to generate a list from an existing list.
//Use string.join() to join a list of strings.
//
//In case of input data being supplied to the question, it should be assumed to be a console input.
int fib2(vector<int> n, int itter) {
	if (itter <= 0) {
		return n[0];
	} else {
		cout << n[0] << ", ";
		return fib2(vector<int> { n[1], n[0] + n[1] }, itter - 1);
	}
}

void question67(int n) {
	cout << "\n--- Question 67 ---" << endl;
	cout << fib2(vector<int>{ 0, 1 }, n);
}

//Question:
//
//Please write a program using generator to print the even numbers between 0 and n in comma separated form while n is input by console.
//
//Example:
//If the following n is given as input to the program:
//
//10
//
//Then, the output of the program should be:
//
//0,2,4,6,8,10
//
//Hints:
//Use yield to produce the next value in generator.
//
//In case of input data being supplied to the question, it should be assumed to be a console input.
void question68(int n) {
	cout << "\n--- Question 68 ---" << endl;
	for (int i = 0; i < n+1; i++) {
		if (i % 2 == 0) {
			cout << i << ", ";
		}
	}
}

//Question:
//
//Please write a program using generator to print the numbers which can be divisible by 5 and 7 between 0 and n in comma separated form while n is input by console.
//
//Example:
//If the following n is given as input to the program:
//
//100
//
//Then, the output of the program should be:
//
//0,35,70
//
//Hints:
//Use yield to produce the next value in generator.
//
//In case of input data being supplied to the question, it should be assumed to be a console input.
void question69(int n) {
	cout << "\n--- Question 69 ---" << endl;
	for (int i = 0; i < n; i++) {
		if (i % 5 == 0 && i % 7 == 0) {
			cout << i << ", ";
		}
	}
}

//Question:
//
//
//Please write assert statements to verify that every number in the list [2,4,6,8] is even.
//
//
//
//Hints:
//Use "assert expression" to make assertion.
bool check_even(vector<int> n) {
	int valid = 0;
	for (int i = 0; i < n.size(); i++) {
		if (n[i] % 2 == 0) {
			valid += 1;
		}
	}
	if (n.size() == valid) {
		return true;
	} else {
		return false;
	}
}

void question70(vector<int> n) {
	cout << "\n--- Question 70 ---" << endl;
	try {
		assert(check_even(n));
		cout << "All numbers in list are even!";
	} catch (runtime_error error) {
		cout << "Not every number in the list is even!";
	}
}


//Question:
//
//Please write a program which accepts basic mathematic expression from console and print the evaluation result.
//
//Example:
//If the following string is given as input to the program:
//
//35+3
//
//Then, the output of the program should be:
//
//38
//
//Hints:
//Use eval() to evaluate an expression.
void question71(string input) {
	cout << "\n--- Question 71 ---" << endl;
	vector<string> parts = split_string(input, '+');
	int output = stoi(parts[0]) + stoi(parts[1]);
	cout << output;
}

//Question:
//
//Please write a binary search function which searches an item in a sorted list. The function should return the index of element to be searched in the list.
//
//
//Hints:
//Use if/elif to deal with conditions.
void question72(vector<int> li, int element) {
	cout << "\n--- Question 72 ---" << endl;
	int bottom = 0;
	int top = li.size() - 1;
	int index = -1;
	while (top >= bottom && index == -1) {
		int mid = static_cast<int>((top + bottom) / 2);
		if (li[mid] == element) {
			index = mid;
		} else if (li[mid] > element) {
			top = mid - 1;
		} else {
			bottom = mid + 1;
		}
	}
	cout << index;
}


//Question:
//
//Please write a binary search function which searches an item in a sorted list. The function should return the index of element to be searched in the list.
//
//
//Hints:
//Use if/elif to deal with conditions.
void question73(vector<int> li, int element) {
	cout << "\n--- Question 72 ---" << endl;
	int bottom = 0;
	int top = li.size() - 1;
	int index = -1;
	while (top >= bottom && index == -1) {
		int mid = static_cast<int>((top + bottom) / 2);
		if (li[mid] == element) {
			index = mid;
		} else if (li[mid] > element) {
			top = mid - 1;
		} else {
			bottom = mid + 1;
		}
	}
	cout << index;
}

//Question:
//
//Please generate a random float where the value is between 10 and 100 using Python math module.
//
//
//
//Hints:
//Use random.random() to generate a random float in [0,1].
class random {
	public:
	long int big = pow(10, 8);
	long int seed = reinterpret_cast<long int>(time(0));
	long int rand() {
		seed = abs(static_cast<long int>((pow(seed, 0.1) * big)) % big);
		return seed;
	}

	// produces unsigned int64 in range start to end
	long int randint(int start, int end) {
		return (this->rand() % (end - start)) + start;
	}

	// procude unsigned float in range 0 to 1
	double randfloat(int start, int end) {
		return (static_cast<float>(this->randint(1000, 9999)) / 10000) + this->randint(start, end);
	}

	// random choice
	int choice(vector<int> n) {
		return n[randint(0, n.size())];
	}

	// sample
	vector<int> sample(int start, int end, int n) {
		vector<int> output;
		for (int i = 0; i < n; i++) {
			output.push_back(this->randint(start, end));
		}
		return output;
	}
};

void question74() {
	cout << "\n--- Question 74 ---" << endl;
	random a;
	long long int output;
	for (int i = 0; i < 5; i++) {
		output = a.randint(10, 100);
		cout << output << endl;
	}
}


//Question:
//
//Please generate a random float where the value is between 5 and 95 using Python math module.
//
//
//
//Hints:
//Use random.random() to generate a random float in [0,1].
void question75() {
	cout << "\n--- Question 75 ---" << endl;
	random a;
	long long int output;
	for (int i = 0; i < 5; i++) {
		double output = a.randfloat(5, 95);
		cout << output << endl;
	}
}

//Question:
//
//Please write a program to output a random even number between 0 and 10 inclusive using random module and list comprehension.
void question76() {
	cout << "\n--- Question 76 ---" << endl;
	random a;
	int output = a.randint(0, 10);
	while (output % 2 != 0) {
		output = a.randint(0, 10);
	}
	cout << output;
}

//Hints:
//Use random.choice() to a random element from a list.
void question77() {
	cout << "\n--- Question 77 ---" << endl;
	random a;
	int output = a.choice(vector<int>{134, 233, 354, 465, 345, 646, 734, 248, 975});
	cout << output;
}

//Question:
//
//Please write a program to output a random number, which is divisible by 5 and 7, between 0 and 10 inclusive using random module and list comprehension.
//
// 
//Hints:
//Use random.choice() to a random element from a list.
void question78() {
	cout << "\n--- Question 78 ---" << endl;
	random a;
	int n = a.randint(0, 10);
	while (n % 5 != 0 || n % 7 != 0) {
		n = a.randint(0, 10);
	}
	cout << n;
}

//Question:
//
//Please write a program to generate a list with 5 random numbers between 100 and 200 inclusive.
//
//
//
//Hints:
//Use random.sample() to generate a list of random values.
void question79() {
	cout << "\n--- Question 79 ---" << endl;
	random a;
	vector<int> s = a.sample(100, 200, 5);
	for (int i = 0; i < s.size(); i++) {
		cout << s[i] << ", ";
	}
}

//Question:
//
//Please write a program to randomly generate a list with 5 even numbers between 100 and 200 inclusive.
//
//
//
//Hints:
//Use random.sample() to generate a list of random values.
bool is_vector_even(vector<int> n, int condition1 = 2, int condition2 = 2) {
	int s = 0;
	for (int i = 0; i < n.size(); i++) {
		if (n[i] % condition1 == 0 && n[i] % condition2 == 0) {
			s++;
		}
	}
	cout << s << ", " << n.size() << endl;
	if (s == n.size()) {
		return true;
	} else {
		return false;
	}
}

void question80() {
	cout << "\n--- Question 80 ---" << endl;
	random a;
	vector<int> s = a.sample(100, 200, 5);
	while (is_vector_even(s) == false) {
		s = a.sample(100, 200, 5);
	}
	for (int i = 0; i < s.size(); i++) {
		cout << s[i] << ", ";
	}
}

//Question:
//
//Please write a program to randomly generate a list with 5 numbers, which are divisible by 5 and 7 , between 1 and 1000 inclusive.
//
//
//
//Hints:
//Use random.sample() to generate a list of random values.
void question81() {
	cout << "\n--- Question 81 ---" << endl;
	random a;
	vector<int> s = a.sample(1, 1000, 5);
	while (is_vector_even(s, 5, 7) == false) {
		s = a.sample(1, 1000, 5);
	}
	for (int i = 0; i < s.size(); i++) {
		cout << s[i] << ", ";
	}
}

//Question:
//
//Please write a program to randomly print a integer number between 7 and 15 inclusive.
//
//
//
//Hints:
//Use random.randrange() to a random integer in a given range.
//
//
//
//
//
//Question:
//
//Please write a program to compress and decompress the string "hello world!hello world!hello world!hello world!".
//
//
//
//Hints:
//Use zlib.compress() and zlib.decompress() to compress and decompress a string.
//
//
//
//
//Question:
//
//Please write a program to print the running time of execution of "1+1" for 100 times.
//
//
//
//Hints:
//Use timeit() function to measure the running time.
//
//
//
//Question:
//
//Please write a program to shuffle and print the list [3,6,7,8].
//
//
//
//Hints:
//Use shuffle() function to shuffle a list.
//
//
//
//Question:
//
//Please write a program to shuffle and print the list [3,6,7,8].
//
//
//
//Hints:
//Use shuffle() function to shuffle a list.
//
//
//
//Question:
//
//Please write a program to generate all sentences where subject is in ["I", "You"] and verb is in ["Play", "Love"] and the object is in ["Hockey","Football"].
//
//Hints:
//Use list[index] notation to get a element from a list.
//
//
//
//Please write a program to print the list after removing delete even numbers in [5,6,77,45,22,12,24].
//
//Hints:
//Use list comprehension to delete a bunch of element from a list.
//
//
//
//Question:
//
//By using list comprehension, please write a program to print the list after removing delete numbers which are divisible by 5 and 7 in [12,24,35,70,88,120,155].
//
//Hints:
//Use list comprehension to delete a bunch of element from a list.
//
//
//
//Question:
//
//By using list comprehension, please write a program to print the list after removing the 0th, 2nd, 4th,6th numbers in [12,24,35,70,88,120,155].
//
//Hints:
//Use list comprehension to delete a bunch of element from a list.
//Use enumerate() to get (index, value) tuple.
//
//
//
//
//Question:
//
//By using list comprehension, please write a program generate a 3*5*8 3D array whose each element is 0.
//
//Hints:
//Use list comprehension to make an array.
//
//
//
//Question:
//
//By using list comprehension, please write a program to print the list after removing the 0th,4th,5th numbers in [12,24,35,70,88,120,155].
//
//Hints:
//Use list comprehension to delete a bunch of element from a list.
//Use enumerate() to get (index, value) tuple.
//
//
//
//
//Question:
//
//By using list comprehension, please write a program to print the list after removing the value 24 in [12,24,35,24,88,120,155].
//
//Hints:
//Use list's remove method to delete a value.
//
//
//
//Question:
//
//With two given lists [1,3,6,78,35,55] and [12,24,35,24,88,120,155], write a program to make a list whose elements are intersection of the above given lists.
//
//Hints:
//Use set() and "&=" to do set intersection operation.
//
//
//
//
//With a given list [12,24,35,24,88,120,155,88,120,155], write a program to print this list after removing all duplicate values with original order reserved.
//
//Hints:
//Use set() to store a number of values without duplicate.
//
//
//
//Question:
//
//Define a class Person and its two child classes: Male and Female. All classes have a method "getGender" which can print "Male" for Male class and "Female" for Female class.
//
//Hints:
//Use Subclass(Parentclass) to define a child class.
//
//
//
//Question:
//
//Please write a program which count and print the numbers of each character in a string input by console.
//
//Example:
//If the following string is given as input to the program:
//
//abcdefgabc
//
//Then, the output of the program should be:
//
//a,2
//c,2
//b,2
//e,1
//d,1
//g,1
//f,1
//
//Hints:
//Use dict to store key/value pairs.
//Use dict.get() method to lookup a key with default value.
//
//
//
//
//Question:
//
//Please write a program which accepts a string from console and print it in reverse order.
//
//Example:
//If the following string is given as input to the program:
//
//rise to vote sir
//
//Then, the output of the program should be:
//
//ris etov ot esir
//
//Hints:
//Use list[::-1] to iterate a list in a reverse order.
//
//
//
//
//Question:
//
//Please write a program which accepts a string from console and print the characters that have even indexes.
//
//Example:
//If the following string is given as input to the program:
//
//H1e2l3l4o5w6o7r8l9d
//
//Then, the output of the program should be:
//
//Helloworld
//
//Hints:
//Use list[::2] to iterate a list by step 2.
//
//
//
//
//
//Question:
//
//Please write a program which prints all permutations of [1,2,3]
//
//
//Hints:
//Use itertools.permutations() to get permutations of list.
//
//
//
//Question:
//
//Write a program to solve a classic ancient Chinese puzzle: 
//We count 35 heads and 94 legs among the chickens and rabbits in a farm. How many rabbits and how many chickens do we have?
//
//Hint:
//Use for loop to iterate all possible solutions.
//
//
//

int main() {
	question1();
	question2(8);
	question3(8);
	question4("34,67,55,33,12,98");
	question5_test();
	question6("100,150,180");
	question7(3, 5);
	question8("without,hello,bag,world");
	question9("hello\nhey\nhow are you\nThis should all be in captials!");
	question10("hello world and practice makes perfect and hello world again");
	question11("0100,0011,1010,1001");
	question12();
	question13("hello world! 123");
	question14("Hello world!");
	question15(9);
	question16(10);
	question17("D 300\nD 300\nW 200\nD 100");
	question18("ABd1234@1,a F1#,2w3E*,2We3345");
	vector<vector<string>> question19_input = {
		vector<string> {"Tom", "19", "80"},
		vector<string> {"John", "20", "90"},
		vector<string> {"Jony", "17", "93"},
		vector<string> {"Jony", "17", "93"},
		vector<string> {"Json", "21", "85"},
	};
	question19(question19_input);
	question20(100);
	question21("UP 5\nDOWN 3\nLEFT 3\nRIGHT 2");
	question22("New to Python or choosing between Python 2 and Python 3? Read Python 2 or Python 3.");
	question23(69);
	question24();
	question25();
	question26(453, 875);
	question27(345);
	question28(3.1415);
	question29("30", "2");
	question30("00", "7");
	question31("Cats are awesome", "no dogs are");
	question32(32366);
	question33();
	question34();
	question35();
	question36();
	question37();
	question38();
	question39();
	question40();
	question41();
	question42(vector<int>{0, 1, 2, 3, 4, 5, 6, 7, 8, 9});
	question43(vector<int>{0, 1, 2, 3, 4, 5, 6, 7, 8, 9});
	question44("Yes");
	question45(vector<int>{0, 1, 2, 3, 4, 5, 6, 7, 8, 9});
	question46(vector<int>{0, 1, 2, 3, 4, 5, 6, 7, 8, 9});
	question47(vector<int>{0, 1, 2, 3, 4, 5, 6, 7, 8, 9});
	question48();
	question49();
	question50();
	question51();
	question52();
	question53();
	question54();
	question55();
	question56();
	question57();
	question58("John@gmail.com");
	question59("John@gmail.com");
	question60("2 cats and 3 dogs.");
	question62();
	question63();
	question64(5);
	question65(5);
	question66(7);
	question67(7);
	question68(10);
	question69(100);
	question70(vector<int>{2, 4, 6, 8, 10});
	question71("56+78");
	question72(vector<int>{2, 5, 7, 9, 11, 17, 222}, 11);
	question73(vector<int>{2, 5, 7, 9, 11, 17, 222}, 11);
	question74();
	question75();
	question76();
	question77();
	question78();
	question79();
	question80();
	question81();

	cout << endl << endl;
	system("pause");
}