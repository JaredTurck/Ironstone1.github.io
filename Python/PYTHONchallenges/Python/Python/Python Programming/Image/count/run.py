from PIL import Image

def count(fileName):
    file = Image.open(fileName)
    img = file.load()
    size = file.size
    FileWrite = open(fileName+".txt","w")
    fw = FileWrite.write

    found = {}
    for i in range(size[0]):
        for ii in range(size[1]):
            if img[i,ii] in found:
                found[img[i,ii]] += 1
            else:
                found[img[i,ii]] = 1

    output = []
    for key in found:
        output.append([found[key],"#%02x%02x%02x" % key])

    fw("Hex Color\t\t No. pixels\n")
    [fw(str(i[1])+" \t\t "+str(i[0])+"\n")for i in sorted(output, reverse=True)]
    fw("\nTotal = %s pixels\n" % (size[0]*size[1]))
    fw("Variation = %s pixels\n" % (len(found)))
    fw("Dimensions = %s x %s pixels\n" % (size[0], size[1]))

    FileWrite.close()



