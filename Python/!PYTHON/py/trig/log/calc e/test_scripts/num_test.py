
s = 100
cpu_count = 24
nums = []

#range(self.s, 1, -1)

for t_count in range(0, cpu_count+1, 1):
    for i in range(s, 1, ~cpu_count):
        # current value of i
        t = i - t_count
        nums.append(t)

# check whichs numbers are not in nums
a = [i if (i in nums) == False else None for i in range(0, s)]
a = list(filter(None, a))
print(f"Numbers not in: {a}")

# check for duplicate numbers in nums
duplicate = []
for i in nums:
    if nums.count(i) > 1:
        duplicate.append(i)
print(f"Duplicates: {duplicate}")

# negatives
negatives = list(filter(None, [i if i < 0 else None for i in nums]))
print(f"Negatives: {negatives}")

# leng of nums
print(f"Length of nums: {len(nums)}")

# largest/smallest number
largest = sorted(nums)[-1]
smallest = sorted(nums)[0]
print(f"Largest number: {largest}")
print(f"Smallest number: {smallest}")
