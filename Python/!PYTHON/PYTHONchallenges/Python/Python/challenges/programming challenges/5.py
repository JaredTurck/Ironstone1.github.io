total = 0
for i in range(3):
          amount = input("Enter in amount for friend %s: " % (i+1))
          while amount.isdigit()!=True:
                    amount = input("Incorrect input!\nFriend %s: " & (i+1))
          total += int(amount)
if total < 1000:
          total += 100
elif 1000 <= total <= 2000:
          total *= 2
print("You have in total rasied £%s" % (total))
