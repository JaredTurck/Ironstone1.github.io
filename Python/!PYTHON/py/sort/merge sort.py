import time

def timeit(func, list1, itter=1_000_000):
    start = time.time()
    for i in range(itter):
        func(list1)
    print(f"{func.__name__}: {time.time() - start}")

# sort by splitting the data into groups
# compare the groups and sort them

def merge_sort(list1):
    if len(list1) == 1:
        return list1
    
    middle = int(len(list1) / 2)
    left = list1[0:middle]
    right = list1[middle:]

    return merge(
        merge_sort(left),
        merge_sort(right)
    )


def merge(left, right):
    result = []
    left_index = 0
    right_index = 0

    while left_index < len(left) and right_index < len(right):
        if left[left_index] < right[right_index]:
            result.append(left[left_index])
            left_index += 1
        else:
            result.append(right[right_index])
            right_index += 1

    return result + left[left_index:] + right[right_index:]

data = [70, 95, 5, 25, 26, 54, 57, 89, 93, 19, 4, 42, 86, 32, 6, 54, 74, 25, 34, 76]
print(sorted(data))
print(merge_sort(data))

#timeit(merge_sort, data)
