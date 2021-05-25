def seperate(x, i=0):
    output = []
    while i < len(x):
        if x[i:i+4].isdigit():
            output.append(x[i:i+2])
            output.append(x[i+2:i+4])
            i += 4;
        elif x[i:i+2].isdigit():
            output.append(x[i:i+2])
            i += 2;
        elif x[i].isalpha():
            output.append(x[i])
            i += 1;
        else: i += 1
    return list(filter(None, output))
