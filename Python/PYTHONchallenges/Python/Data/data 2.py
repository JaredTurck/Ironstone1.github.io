from pandas import *
file = read_excel("WHO POP TB all.xls")
file.sort_values(by="TB deaths")
print(file)
