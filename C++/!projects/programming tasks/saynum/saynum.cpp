#include <iostream>
#include <cassert>
#include <string>

std::string hundred(int num) {
	// take a number between 0 and 999 and return a string of that number in words

	std::string units[10] = {"", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
	std::string tens[10] = { "", "ten", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety" };
	std::string teens[10] = {"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"};

	assert(0 <= num <= 999); // check that the number is between 0 and 999

	// check that the number is not in one of the lists
	if (num == 0) {
		return "zero";
	} else if (1 <= num <= 9) {
		return units[num];
	} else if (num % 10 == 0) {
		return tens[num];
	} else if (10 <= num <= 19) {
		return teens[num];
	}

	// pad the number
	std::string digits = std::to_string(num);
	if (digits.length() == 2) {
		digits = "0" + digits;
	}

	return digits;

}

int main() {
	std::cout << hundred(565) << std::endl;

	system("pause");
}