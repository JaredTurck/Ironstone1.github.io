import os

src = "C:/WebServer/videos/vid"
src2 = "D:/longest video"

#files = [src +"/"+ i for i in os.listdir(src)]
files = [src2+'/output_vid.mp4' for i in range(0, 333)]

with open('mylist.txt', 'w') as output:
    for file in files:
        if file.split('.')[len(file.split('.'))-1] == 'mp4':
            output.write("file '" + file + "'\n")
