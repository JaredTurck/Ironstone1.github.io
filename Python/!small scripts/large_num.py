
# sum numbers of the same length
def sum1(num1, num2):
    temp_sum = 0
    carry = 0
    sums = [0, 0, 0, 0, 0]

    for i in range(4, -1, -1):
        temp_sum = num1[i] + num2[i] + carry

        if i == 0:
            sums[i] = temp_sum
        else:
            sums[i] = temp_sum % 1000000000

        carry = int(temp_sum / 1000000000)

    return sums

# test
num1 = [1546798561, 1234679845, 1789465103, 7984561254, 6541238708]
num2 = [6746798561, 1412679845, 8789467832, 1236521204, 3542388978]

answer1 = int("".join([str(i) for i in sum1(num1, num2)]))
answer2 = sum([int("".join([str(i) for i in x])) for x in [num1, num2]])

print(answer1)
print(answer2)
