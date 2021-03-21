import random, datetime

def timeit(func, data, name):
    s = datetime.datetime.now()
    output = func(data)
    e = datetime.datetime.now()
    d = (e - s).microseconds
    dd = d / 1000

    i = add_commas(len(data))
    print(f"\n{name} ({i} Itterations):\ntime: {dd} milliseconds ({d} microseconds)")

def get_data(n=10000, s=0, e=10):
    return [random.randint(s, e) for i in range(n)]

def add_commas(n):
    strn = str(n)[::-1]
    r = []
    for i in range(0, len(strn), 3):
        r = [strn[i:i+3][::-1]] + r
    return ",".join(r)
    
def bubble_sort(a):
    n = len(a)
    for i in range(n):
        s = True
        for j in range(n -i -1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                s = False
    return a

def insertion_sort(a, l=0, r=None):
    if r is None:
        r = len(a)-1
    
    for i in range(1, len(a)):
        k = a[i]
        j = i - 1
        while j >= 0 and a[j] > k:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = k
    return a

def merge(l, r):
    if len(l) == 0:
        return r
    if len(r) == 0:
        return l

    re = []
    il = ir = 0

    while len(re) < len(l) + len(r):
        if l[ir] <= r[ir]:
            re.append(l[il])
            il += 1
        else:
            re.append(r[ir])
            ir += 1

        if ir == len(r):
            re += l[il:]
            break

        if il == len(l):
            re += r[ir:]
            break
    return re

def merge_sort(a):
    if len(a) < 2:
        return a

    m = len(a) // 2
    return merge(
        l=merge_sort(a[:m]),
        r=merge_sort(a[m:])
    )

def quick_sort(a):
    if len(a) < 2:
        return a

    l, s, h = [], [], []
    p = a[random.randint(0, len(a)-1)]

    for i in a:
        if i < p:
            l.append(i)
        elif i == p:
            s.append(i)
        elif i > p:
            h.append(i)
    return merge_sort(l) + s + merge_sort(h)

def time_sort(a):
    mr = 32
    n = len(a)

    for i in range(0, n, mr):
        insertion_sort(a, i, min((i + mr -1), n -1))

    s = mr
    while s < n:
        for st in range(0, n, s * 2):
            m = s + st - 1
            e = min((st + s * 2 - 1), (n-1))
            m_array = merge(
                l=a[s:m + 1],
                r=a[m + 1:e + 1]
            )
            a[s:s + len(m_array)] = m_array
        s *= 2


test_data1 = get_data(10000)
timeit(bubble_sort, test_data1, "Bubble Sort")
timeit(insertion_sort, test_data1, "Insertion Sort")
timeit(merge_sort, test_data1, "Merge Sort")
timeit(quick_sort, test_data1, "Quick Sort")
timeit(time_sort, test_data1, "Time Sort")
timeit(sorted, test_data1, "Built In Sorted")
