shape = {1:[],2:[]}
for i in range(1,3):
    print("\nRectangle %s: " % (i))
    while isinstance(shape[i], int) != True:
        try:
            shape[i] = int(input("Enter length(cm): ")) * \
                        int(input("Enter width(cm): "))
        except:
            shape[i] = str(print("Not a valid Input!"))

shape = [shape[i] for i in shape]
print("Rectangle %s has the largest area!" % (shape.index( max(shape) )+1))
