import tkinter
from tkinter import filedialog
import cv2, os

window = tkinter.Tk()
window.withdraw()

def check_files(input_files):
    for file in list(input_files):
        if file.split("/")[-1].split(".")[-1] not in ["mp4", "avi"] == True:
            return False
    return True

def process_file(multiple_files=False):
    if multiple_files == False:
        input_files = filedialog.askopenfilename()
        while input_files.split("/")[-1].split(".")[-1] not in ["mp4", "avi"]:
            print("Please choose an MP4/AVI file!")
            input_files = filedialog.askopenfilename()
            
    elif multiple_files == True:
        input_files = filedialog.askopenfilenames()
        while check_files(input_files) == False:
            print("Please make sure all your files are MP4/AVI!")
            input_files = filedialog.askopenfilenames()

    if type(input_files) == tuple:
        input_files = list(input_files)
    elif type(input_files) == str:
        input_files = [input_files]

    for input_file in input_files:
        print("Press enter for default values!")
        input_size = input("[100MB] Target file size: ")
        if input_size == "": input_size = "100"
        while input_size.isdigit() != True:
            input_size = input("Invalid Input!\n[100MB] Target file size: ")

        trg_size_mb = int(input_size)
        video = cv2.VideoCapture(input_file)

        seconds = (video.get(cv2.CAP_PROP_FRAME_COUNT) / video.get(cv2.CAP_PROP_FPS))
        bit_rate = str(int(((trg_size_mb * 1024 * 1024 * 8) / seconds) / 1024)) + "k"
        parent_dir = os.getcwd().replace("\\", "/")
        output_file = input_file.split("/")[-1].replace(".mp4","_") + "compressed_"
        output_file = output_file + str(",".join(os.listdir(parent_dir)).count(output_file)) + ".mp4"

        time = str(int(seconds / 60)) + " mins, " + str(int(float("0."+str(160 / 60).split(".")[1]) * 60)) + " seconds"

        quality = input("[100%] Quality percentage (100% best 1% worst): ")
        if quality == "": quality = "100"
        while quality not in [str(i) for i in range(1,101)]:
            quality = input("Invalid percentage!\nEnter Number between 0 and 100: ")
        bit_rate = str(int(int(bit_rate.replace("k","")) * (int(quality)/100))) + "k"

        source_size = float(str(os.path.getsize(input_file)/1024/1024))
        if source_size > 1000:
            source_size = str(round(source_size / 1024,2)) + "GB"
        else:
            source_size = str(round(source_size)) + "MB"

        print("\nSource Path:", parent_dir)
        print("Destination:", output_file)
        print("source size:", source_size)
        print("Length:", time)
        print("Bitrate:", bit_rate)
        print("Quality:", str(quality) + "%")
        print("Frames:", video.get(cv2.CAP_PROP_FRAME_COUNT))
        print("FPS:", round(video.get(cv2.CAP_PROP_FPS)))

        os.system('ffmpeg.exe -i "' + input_file + '" -b ' + bit_rate + ' "'+parent_dir+'/'+output_file+'"')

        print("\nCompression complete!")

        output_size = (os.path.getsize(parent_dir +"/"+ output_file)/1024/1024)
        print("Output size:", str(round(output_size))+"MB" )
        print("less than 100 MB:",output_size<100)

menu = input("Menu:\n1. Process one file\n2. Process multiple files\n3. quit\n> ")
if menu == "1":
    process_file(multiple_files=False)
elif menu == "2":
    process_file(multiple_files=True)
elif menu == "3":
    quit()
else:
    print("Invalid Input!")

input("Press enter to close program...")
    
