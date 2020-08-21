// test.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <string>
#include <cmath>
#include <iterator>

using namespace std;

void sayHi(string name, int age); // declare a function
double cube(double num);
int getMax(int num1, int num2, int num3);
string getDayOfWeek(int day);
int power(int baseNum, int powNum);

// --- classes and objects ---
class Book {
public:
	string title;
	string author;
	int pages;

	// constructor
	// called every time a new instance is created
	// a bit like the __init__ func in Python
	Book(string aTitle, string aAuthor, int aPages) {
		title = aTitle;
		author = aAuthor;
		pages = aPages;
	};

	// default constructor
	// allows you to create an instance without actully having to pass values
	Book() {
		title = "no title";		// sets default
		author = "no author"; // sets default author
		pages = 0; // sets default number of pages
	}
};

class Student {
	public:
		string name;
		string subject;
		double gpa;
		Student(string aName, string asubject, double agpa) {
			name = aName;
			subject = asubject;
			gpa = agpa;
		}

		bool hasHonors() {
			if (gpa >= 3.5) {
				return true;
			}
			return false;
		}

};

class Movies {
	private: // vars cant be changed, and methods can be called
		string private_rating;

	public: // vars and methods can be changed and called by an instance
		string title;
		string director;
		string rating;
		// init func needs to be same name as class name
		Movies(string aTitle, string aDirector, string aRating) {
			title = aTitle;
			director = aDirector;
			setRating(aRating);
		}

		void setRating(string aRating) {
			rating = aRating;
			if (aRating == "U") {
				rating = aRating;
			} else if (aRating == "PG") {
				rating = aRating;
			} else if (aRating == "12") {
				rating = aRating;
			} else if (aRating == "15") {
				rating = aRating;
			} else if (aRating == "18") {
				rating = aRating;
			} else {
				rating = "none";
			}
		}

		string getRating() {
			return rating;
		}
};

// super class
class Chef {
	public:
		void makeChicken() {
			cout << "The chef makes chicken" << endl;
		}
		void makeSalad() {
			cout << "The chef makes salad" << endl;
		}
		void makeSpecialDish() {
			cout << "The chef makes bbq ribs" << endl;
		}
};

// ItalianChef inherites all of the methods of Chef
// subclass becuase it inherites methods of the super class Chef
class ItalianChef : public Chef {
	public:
		void makePasta() {
			cout << "The chef can make pasta!";
		}
		void makeSalad() { // this method overwrites the inherited method
			cout << "The chef can make salad!"; 
		}
};

int main()
{
	string name = "jared";
	int age = 19;
	cout << "Hello my name is " << name << endl;
	cout << "my age is " << age << endl;

	name = "tom";
	age = 12;
	cout << "my name is " << name << " and my age is " << age << endl;

	int age2; // reclare variable
	age2 = 12; // assign variable a value
	age2 = 14; // overwrite previous value and assign new value

	// --- vars ---
	// char is a single character e.g. 'A', '4', etc.
	char grade = 'A'; // char must use single qutation marks ''
	string phrase = "this is a string";
	int age3 = 50; // only whole numbers
	float gpa = 2.5; // decimal numbers
	double gpa2 = 2.5;
	// float can store up to 32 bits of data
	// double can store twice as much, up to 64 bits of data
	bool isaMale = true; // store true or false

	// --- strings ---
	// endl and '\n' both mena new line
	string str1 = "Hello World";
	cout << str1 << endl;
	cout << str1.length(); // length of string
	cout << str1[0]; // index char in string
	str1[5] = 'A'; // change single char at index in string
	cout << str1 << str1;

	cout << str1.find("World") << endl; // find sub string index in string
	cout << str1.find("World", 4) << endl; // find substring after index 4
	// basically just ignore all the character before the index of 4, then look for string

	cout << str1.substr(8, 3) << endl; // find part of string substr(start index, end index)
	cout << str1.substr(8, 3) << endl; // prints out all character between the index of 8 and 8+3
	// end index is the start index + the number you specified in this case 3
	// so it will get the next 3 characters after the index of 8.

	// --- numbers ---
	cout << 40 << endl; // prints the number 40
	cout << 40 + 10 << endl; // prints the answer of 40+10
	cout << 10 % 3 << endl; // prints 10 mod 3
	cout << 4 + 5 * 10 << endl; // does 5*10 first, C follows BIDMAS order of operation
	cout << 10 + 5 * 2 << endl; // prints 20
	cout << 5 * 2 + 10 << endl; // prints 20

	int num1 = 5;
	cout << num1 << endl; // prints 5
	num1++; // increment var with ++ operator
	cout << num1 << endl; // prints 6

	float num2 = 5.7;
	cout << num2 << endl; // prints 5.7
	num2++;
	cout << num2 << endl; // prints 6.7
	cout << num2++ << endl; // prints 6.7, prints first increments after
	cout << num2 << endl; // prints 7.7 becuase the number was increment on line 70
	cout << ++num2 << endl; // prints 8.7,  increments first then prints
	cout << num2 << endl; // prints 8.7
	cout << num2-- << endl; // de-increment (subtract, -1)

	cout << 10 / 3 << endl; // prints 3 becuase both numbers are int
	cout << 10.0 / 3 << endl; // prints 3.333 becuase atleast 1 number is a float

	// --- math funcs ---
	cout << pow(2, 5) << endl; // prints 2 to the power of 5 (32)
	cout << sqrt(3) << endl; // prints the square root of 3 (1.73205)
	cout << sqrt(36) << endl; // prints square root of 36  (int 6)
	cout << round(9.33333) << endl; // rounds to int 9
	cout << round(9.9) << endl; // rounds to 10
	cout << ceil(5.1) << endl; // always rounds up, 5.1 becomes 6
	cout << ceil(5.8) << endl; // rounds up to 6
	cout << ceil(5.0) << endl; // rounds to 5
	cout << floor(5.9) << endl; // always rounds down, 5.9 becomes 5
	cout << floor(5.1) << endl; // rounds down, 5.1 becomes 5
	cout << fmax(1, 6) << endl; // returns the largest number, e.g. 6
	cout << fmax(56, 34) << endl; // return largest number 56
	cout << fmax(45.7, 45.2) << endl; // returns 45.7
	cout << fmin(99, 28) << endl; // returns the smallest number 28
	cout << fmin(34, 45) << endl; // returns 34

	// --- get user input ---
	int user_age; // decale var
	cout << "enter your age: ";
	cin >> user_age; // get user input and stores in var
	cout << "you are " << user_age << " years old!" << endl;

	double user_age2;
	cout << "enter your age: ";
	cin >> user_age2;
	cout << "you are " << user_age2 << " years old!" << endl;

	char letter;
	cout << "enter a random letter from the alphabet: ";
	cin >> letter;
	cout << "the letter you entered is " << letter << "!" << endl;
	// if the user enteres multiple letters e.g. jared
	// it will only take the first latter of the string e.g. j

	string user_name;
	cout << "enter your name: ";
	getline(cin, user_name); // for getting strings use getline(cin, variable)
	cout << "your name is " << user_name << "!";

	// --- calc ---
	int calc_num1, calc_num2; // declare vars
	cout << "Enter first number: ";
	cin >> calc_num1;

	cout << "enter second number: ";
	cin >> calc_num2;

	cout << "answer: " << calc_num1 + calc_num2;

	// --- get multiple string inputs ---
	string color, noun, person;

	cout << "enter a color: ";
	getline(cin, color);
	cout << "enter a noun: ";
	getline(cin, noun);
	cout << "enter a person: ";
	getline(cin, person);

	cout << "Roses are" << color;
	cout << noun << "are blue";
	cout << "i love" << person;

	// --- arrays ---
	int luckyNums[] = {1,2,3,4,5,6};
	// int is datatype of array, var[] tells C++ it's an array

	cout << luckyNums[0] << endl; // print first element in array
	cout << luckyNums[3] << endl; // prints item at index 3 in array

	cout << luckyNums[2] << endl; // prints 3
	luckyNums[2] = 95; // changes item in array at index 2 to 95
	cout << luckyNums[2] << endl; // prints 95

	int fixedSizeArray[20] = {}; // creates array of fixed size 20
	fixedSizeArray[5] = 100; // store value at specific index in array
	cout << fixedSizeArray[5]; // print valur at index 5, e.g. 100

	// --- functions ---
	sayHi("Jared", 19);
	sayHi("Tom", 20);
	sayHi("Jerry", 32);

	// call cube function return cubed value and print result
	double value1 = 50;
	cout << value1 << " cubed is " << cube(value1) << "!" << endl;

	// --- if statements ---
	bool isMale = true;
	bool isTall = true;
	if (isMale && isTall) {
		cout << "You are a tall male!" << endl;
	} else if (isMale && !isTall) {
		cout << "You are a short male!" << endl;
	} else if (!isMale && isTall) {
		cout << "You are tall but not male" << endl;
	} else {
		cout << "You are not male!" << endl;
	}

	// --- if statements inside of functions ---
	cout << getMax(5, 9, 10); // returns 10, largest number

	// --- complex calc ---
	int qnum1, qnum2;
	char op;
	int result = 0;

	cout << "Enter first number: ";
	cin >> qnum1;
	cout << "Enter operator number: ";
	cin >> op;
	cout << "Enter second number: ";
	cin >> qnum2;

	if (op == '+') {
		result = qnum1 + qnum2;
	} else if (op == '-') {
		result = qnum1 - qnum2;
	} else if (op == '/') {
		result = qnum1 / qnum2;
	} else if (op == '*') {
		result = qnum1 * qnum2;
	} else {
		cout << "Invalid operator!";
	}

	cout << result;

	// --- switch statements ---
	cout << getDayOfWeek(1) << endl; // prints Monday, 1st day of the week
	cout << getDayOfWeek(3) << endl; // prints Wednesday 3rd day of week
	cout << getDayOfWeek(0) << endl; // prints invalid input!

	// --- while loops ---
	int index = 1;
	while (index <= 5) {
		cout << index << endl;
		index++;
	}

	// do while will execute code first and then check condition after
	int index2 = 6;
	do {
		cout << index << endl;
		index2++;
	} while (index <= 5);

	// do while loops will always execute atleast once, even if value if false
	bool condition1 = false;
	do {
		cout << "loop executed!";
	} while (condition1 == true);
	// even though the condition is false, the code still executes once

	// while loop with false condition
	bool condition2 = false;
	while (condition2 == true) {
		cout << "loop executed!";
	}
	// this while loop will never execute as the condition is false.
	// unlike the do while loop which did execute once, even though the condition was false

	// --- guessing game ---
	int ThesecretNum = 7;
	int Userguess = 0;
	int guessCount = 0;
	int guessLimit = 3;
	bool outOfGuesses = false;

	while (ThesecretNum != Userguess && !outOfGuesses) {
		if (guessCount < guessLimit) {
			cout << "Enter guess: ";
			cin >> Userguess;
			guessCount++;
		} else {
			outOfGuesses = true;
		}
		
	}

	if (outOfGuesses) {
		cout << "You lose!";
	} else {
		cout << "You win!";
	}

	// --- for loops ---
	for (int i = 0; i < 10; i++) {
		cout << i << endl;
	}

	int Thenums[] = { 1,2,5,7,9 };
	for (int i = 0; i < size(Thenums); i++) { // size() is length of array
		cout << Thenums[i] << endl;
	}

	// --- exponent function ---
	// takes a number to a specific power
	cout << power(2, 3) << endl; // prints 8, 2 to the power of 3 is 8
	cout << power(4, 2) << endl; // prints 16, 4 power 2 is 16

	// --- nested arrays (2d arrays)
	int numberGrid[3][2] = { // nested arrays must be of fixed size
		{1, 2},
		{3, 4},
		{5, 6}
	};

	cout << numberGrid[0][1]; // prints 2
	// indexes second element of the first array

	// --- nested for loops --
	for (int i = 0; i < 2; i++) {
		for (int ii = 0; i < 2; ii++) {
			cout << numberGrid[i][ii];
		}
	}

	// --- comments ---
	// This is a comment!

	/* This
	is
	a
	multi
	line
	comment
	*/

	// --- pointers ---
	int TheAge = 19;
	double Thegpa = 2.7;
	string Thename = "Mike";

	cout << &TheAge; // &var prints out the memory address of the variable
	cout << &Thegpa << endl; // prints the pointer of Thegpa
	cout << &Thename << endl; // prints the pointer of Thename
	// pointer is just a memory address
	
	int userAge = 19;
	int* pAge = &userAge; // stores int pointer inside of a variable
	double userGpa = 2.7;
	double* P_userGpa = &userGpa; // stores double point in var
	string userName = "Jared";
	string *p_userName = &userName; // stores string pointer in var

	// the data type of the pointer value must be the same
	// when assigning that pointer to another var

	string *pName = &Thename; // assigns the pointer of Thename to pName
	cout << pName; // prints the pointer
	cout << *pName; // dereference the pointer
	// dereferencing is when it gets the value of the pointer (memory address)

	int Anumber = 12.5;
	cout << &*&Anumber; // gets the pointer, then gets value, then gets the pointer

	// --- objects and classes
	/*Book book1();
	book1.title = "Harry Potter";
	book1.author = "JK Rowling";
	int book1.pages = 500;

	cout << book1.title; // prints the title of the book object
	cout << book1.pages;

	Book book2(); // creates an instance of the class Book
	book2.title = "Lord of the Rings";
	book2.author = "Tolkein";
	book2.pages = 700;

	cout << book2.author;
	book2.title = "Hunger Games"; // changes the title of the book
	cout << book2.title; // prints Hunger Games*/

	// --- constructor functions ---
	// constructor function is an init function that gets called inside of a class

	// create instances of a class
	Book book1("Harry Potter", "JK Rowling", 500);
	Book book2("Lord of the Rings", "Tolkien", 700);
	Book book3("Hunger Games", "Collins", 800);

	cout << book1.title; // prints the title of book1 object

	Book book4; // declared an instance of class Book
	// this instance has the Book default attributes.

	cout << book4.title; // prints the default title, no title.

	// --- object functions ---
	Student student1("Jim", "Computer Science", 9);
	Student student2("Tom", "Wood Working", 4);

	cout << student1.hasHonors(); // calls a method of class student
	cout << student2.hasHonors();

	// getters and setters
	Movies avengers("The Avengers", "Joss", "");
	avengers.setRating("dog"); // calls a method and passes value

	// --- inheritance ---
	Chef chef;
	chef.makeChicken();

	ItalianChef italianChef;
	italianChef.makeChicken();
	// inherited the makeChicken method from Chef

	italianChef.makePasta();
	//chef.makePasta(); // throws can error, method not part of Chef class

	chef.makeSalad(); 
	italianChef.makeSalad(); // overwritten method of class ItalianChef


}

// --- functions ---
void sayHi(string user_name, int user_age) {	// func returns nothing
	cout << "Hello " << user_name;
	cout << "your age is " << user_age;
}

double cube(double num) { // return type is double
	double result = num * num * num;
	return result;
}

int getMax(int unum1, int unum2, int unum3) {
	int result;

	if (unum1 >= unum2 && unum1 >= unum3) {
		result = unum1;
	} else if (unum2 >= unum1 && unum2 >= unum3) {
		result = unum2;
	} else {
		result = unum3;
	}

	return result;
}

string getDayOfWeek(int day) {
	string dayName;

	switch (day) {
	case 1:
		dayName = "Monday";
		break;
	case 2:
		dayName = "Tuesday";
		break;
	case 3:
		dayName = "Wednesday";
		break;
	case 4:
		dayName = "Thursday";
		break;
	case 5:
		dayName = "Friday";
		break;
	case 6:
		dayName = "Saturday";
		break;
	case 7:
		dayName = "Sunday";
		break;
	default:
		dayName = "Invalid Number!";
	}

	return dayName;
}

int power(int baseNum, int powNum) {
	int result = 1;

	for (int i = 0; i < powNum; i++) {
		result = result * baseNum;
	}

	return result;
}