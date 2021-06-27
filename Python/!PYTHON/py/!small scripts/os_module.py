import os

print(dir(os)) # shows the methods in the specified module

print(os.getcwd()) # shows the current working directory

os.chdir("D:\OneDrive\Desktop\PYTHON\py\!small scripts") # change directory
print(os.getcwd())

print(os.listdir()) # lists files in working directory

os.mkdir("my_new_folder") # make a new directory
os.makedirs("my_new_folder_2/sub_folder/sub_folder2") # make sub dirs

os.rmdir("my_new_folder") # remove a folder
os.removedirs("my_new_folder_2/sub_folder/sub_folder2") # remove sub dirs

open("test.txt","w")
os.rename("test.txt", "test2.txt") # rename a file

print(os.stat("test2.txt")) # print out file properties

os.walk() # yields directory path, sub dirs, and files in path

print(os.environ) # prints out all enviroment variables
print(os.environ.get("PATH")) # gets specific enviroment variable

os.path.join("C:\Windows", "System32") # joins to paths

os.path.basename("test2.txt") # gets filename of path
os.path.dirname("my_folder/test2.txt") # gets parent directory name of path
os.path.split("my_folder/test2.txt") # gets tuple with both parent dir and filename

os.path.exists("my_folder/test2.txt") # Return True if path exists

os.path.isdir("my_folder/test2.txt") # Returns True if path is a directory
os.path.isfile("my_folder/test2.txt") # returns True if path is a file

os.path.splitext("my_folder/test2.txt") # returns tuple (path, file extension)
