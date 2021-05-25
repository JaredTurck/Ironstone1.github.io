from decimal import Decimal, getcontext

class calc_pi():
    def __init__(self):
        self.correct_digits = open("10_million_digits.txt", "r").read()
        self.output_filename = "answer.txt"
        assert self.correct_digits[2:].isdigit()==True
        getcontext().prec = 5000
        self.last_p = -2
    
    def check_digits(self, num):
        n = "3." + (str(num.as_integer_ratio()[0])[1:])
        try:
            correct = ""
            for i,digit in enumerate(n):
                if digit == self.correct_digits[i]:
                    correct += digit
                else:
                    return [correct, self.correct_digits[len(correct)], len(correct)-2]
                
        except IndexError:
            return [n, "?", len(n)-2]

    def add_commas(self, n):
        digits = []
        for i,d in enumerate(str(n)[::-1]):
            if (i+1)%3==0:
                digits.append(d+",")
            else:
                digits.append(d)
        return (lambda x : [x[1:] if x[0]=="," else x][0])("".join(digits)[::-1])

    def write_file(self):
        i, p, w, c, ic = self.i, self.add_commas(self.p), self.w, self.c, self.add_commas(self.i)
        if self.p > self.last_p:
            with open(self.output_filename, "w") as file:
                file.write(f"Pi ({i} itterations, {p} correct places): {c} {w}")
                
            self.last_p = self.p
            print(f"Pi ({ic} itterations, {p} correct places): {c} {w} (Wrote Pi to file)")
        elif self.p > 0:
            print(f"Pi ({ic} itterations, {p} correct places): {c} {w}")
    
    def pi(self, print_tm=1000000):
        print("Calculating pi!")
        pi, n, d, self.i = 0, 4, 1, 1
        while True:
            a = 2 * (self.i % 2) -1
            pi += a * Decimal(n) / Decimal(d)
            d += 2
            self.i += 1
            if self.i % print_tm == 0:
                self.c, self.w, self.p = self.check_digits(pi)
                self.write_file()
    
calc = calc_pi()
calc.pi()
