import time

def timeit(func, list1, itter=1_000_000):
    start = time.time()
    for i in range(itter):
        func(list1)
    print(f"{func.__name__}: {time.time() - start}")

# itterate through each item in the list, compare item i and i+1
# if i > i+1 then
#   swap them so that i is smaller then i+1

def bubble_sort_1(list1):
    for ii in range(len(list1)-1):
        for i in range(len(list1)-1):
            if list1[i] > list1[i + 1]:
                list1[i], list1[i + 1] = list1[i + 1], list1[i]
    return list1

data = [70, 95, 5, 25, 26, 54, 57, 89, 93, 19, 4, 42, 86, 32, 6, 54, 74, 25, 34, 76]
print(sorted(data))
print(bubble_sort_1(data))

# improvment of buble sort 1
# don't compare items that are already sorted

def bubble_sort_2(list1):
    for ii in range(len(list1) - 1):
        for i in range(len(list1) - 1 - ii):
            if list1[i] > list1[i + 1]:
                list1[i], list1[i + 1] = list1[i + 1], list1[i]
    return list1

data = [70, 95, 5, 25, 26, 54, 57, 89, 93, 19, 4, 42, 86, 32, 6, 54, 74, 25, 34, 76]
print(sorted(data))
print(bubble_sort_2(data))

# check if the list has already been sorted
def bubble_sort_3(list1):
    for ii in range(len(list1) - 1):
        flag = False
        for i in range(len(list1) - 1 - ii):
            if list1[i] > list1[i + 1]:
                list1[i], list1[i + 1] = list1[i + 1], list1[i]
                flag = True
                
        if flag == False:
            return list1

data = [70, 95, 5, 25, 26, 54, 57, 89, 93, 19, 4, 42, 86, 32, 6, 54, 74, 25, 34, 76]
print(sorted(data))
print(bubble_sort_3(data))

def timeall():
    timeit(bubble_sort_1, data)
    timeit(bubble_sort_2, data)
    timeit(bubble_sort_3, data)
