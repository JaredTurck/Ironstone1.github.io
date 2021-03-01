"""
Given a string of digits, return the longest substring with alternating
odd/even or even/odd digits. If two or more substrings have the same length,
return the substring that occurs first.

Examples:
>>> longest_substring("225424272163254474441338664823")
[254, 272163254, 474, 41, 38, 23]

>>> longest_substring("594127169973391692147228678476")
[94127, 169, 16921472, 678, 476]

>>> longest_substring("721449827599186159274227324466")
[7214, 498, 27, 18, 61, 9274, 27, 32]

Notes:
The minimum alternating substring size is 2
"""


def odd_even(num):
    num = "00" + num + "00"
    if not num.isdigit():
        raise AssertionError("Not a valid number!")

    digits = []
    skip = False
    for n in range(1, len(num)-1):
        if skip == False:
            # n, n+1 (even, odd)
            if int(num[n]) % 2 == 0 and int(num[n+1]) % 2 == 1:
                digits.append(num[n])
                if int(num[n+2]) % 2 == 1:
                    digits.extend([num[n+1], ","])
                    skip = True

            # n, n+1 (odd, even)
            elif int(num[n]) % 2 == 1 and int(num[n+1]) % 2 == 0:
                digits.append(num[n])
                if int(num[n+2]) % 2 == 0:
                    digits.extend([num[n+1], ","])
                    skip = True

            # n-1, n (even, odd)
            elif int(num[n]) % 2 == 0 and int(num[n-1]) % 2 == 1:
                digits.append(num[n])
                if int(num[n+1]) % 2 == 0:
                    digits.append(",")

            # n-1, n (odd, even)
            elif int(num[n]) % 2 == 1 and int(num[n-1]) % 2 == 0:
                digits.append(num[n])
                if int(num[n+1]) % 2 == 0:
                    digits.append(",")
            
            else:
                digits.append(',')
        else:
            skip = False

    # remove extra commas
    for i in range(len(digits)):
        digits = "".join(digits).replace(',,', ',')

    # convert string to int
    digits = list(filter(None, [int(i) if int(i) > 10 else None
                                for i in list(filter(None, digits.split(',')))]))

    # remove extra 0 from last number
    if str(digits[-1])[-1] == "0":
        digits[-1] = int(str(digits[-1])[:-1])

    # add missing first digits

    return digits

def test():
    assert odd_even("225424272163254474441338664823") == [254, 272163254, 474, 41, 38, 23]
    assert odd_even("594127169973391692147228678476") == [94127, 169, 16921472, 678, 476]
    assert odd_even("721449827599186159274227324466") == [7214, 498, 27, 18, 61, 9274, 27, 32]
