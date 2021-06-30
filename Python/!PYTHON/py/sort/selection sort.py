
# itterate through unsorted list
# - find the lowest value in unsorted list
# - append the lowest value to sorted list
# - remove the item from unsored list

def not_in_place_selection_sort(unsored_list):
    sorted_list = []
    while len(unsored_list) > 0:
        lowest = [unsored_list[0], 0]
        for i in range(len(unsored_list)):
            if unsored_list[i] <= lowest[0]:
                lowest = [unsored_list[i], i]
                
        sorted_list.append(lowest[0])
        del unsored_list[lowest[1]]
        
    return sorted_list

data = [70, 95, 5, 25, 26, 54, 57, 89, 93, 19, 4, 42, 86, 32, 6, 54, 74, 25, 34, 76]
print(sorted(data))
print(not_in_place_selection_sort(data))

# itterate through unsorted list
# - find the lowest value in the list
# - insert the lowest value at i from beginning of the list

def in_place_selection_sort(list1):
    for i in range(len(list1)):
        lowest = i
        for x in range(i + 1, len(list1)):
            if list1[lowest] > list1[x]:
                lowest = x
        list1[i], list1[lowest] = list1[lowest], list1[i]
    return list1


data = [70, 95, 5, 25, 26, 54, 57, 89, 93, 19, 4, 42, 86, 32, 6, 54, 74, 25, 34, 76]
print(sorted(data))
print(in_place_selection_sort(data))
