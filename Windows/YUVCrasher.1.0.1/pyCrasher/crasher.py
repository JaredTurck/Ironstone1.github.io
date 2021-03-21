import os

# name of the video files
file1 = input("First Video: ").encode("utf-8")
file2 = "sample.bin"

# create a file called join.txt
with open("join.txt", "wb") as join:
    # write path of second video to text file
    join.write(b"file '" + file1 + b"'\nfile sample.bin")

# use ffmpeg to join first video and text file
os.system("ffmpeg -y -f concat -safe 0 -i join.txt -codec copy output.mp4")

# remove the join.txt file (which contains path to second video)
os.remove("join.txt")
