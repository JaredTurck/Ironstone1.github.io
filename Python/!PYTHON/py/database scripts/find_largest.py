import os, time

# find largest file
class find_largest():
    def __init__(self):
        self.step_size = 100
        self.files_size = []
        self.count = 0
        self.files = []
        self.print_time = 5
        self.fps = 0
        self.paths = {}
        self.log_filename = "output.log"
        self.dirs_count = 0
        self.stop_count = False
        self.dir_first_run = True
        self.total_dir_count = 0
        
    def walk(self, args):
        self.files_size = []
        self.count = 0
        self.start_time = time.time()
        name = args[0]
        do_dirs = args[1]
        do_subdirs = args[2]
        self.walking_in = ["folders" if do_dirs == True else "files"][0]
        self.update_log("", new_log=True)
        self.print_log('[+] walking '+self.walking_in+' in ' + name)
        for path, dirs, files in os.walk(name):
            # process folders
            if do_dirs == True:
                # process the folder
                if do_subdirs == False:
                    if path not in self.paths:
                        sub_files = []
                        for f in files:
                            try:
                                p = os.path.join(path, f)
                                sub_files.append(os.path.getsize(p))
                                self.update_fps()
                            except Exception as error:
                                self.print_log("[-] Error thrown when process file!", error)
                        self.paths[path] = sum(sub_files)

                # process sub folders
                elif do_subdirs == True:
                    # get size of sub files
                    sub_folder_size = 0
                    for sub_path, sub_dir, sub_files in os.walk(path):
                        for sub_file in sub_files:
                            try:
                                p = os.path.join(sub_path, sub_file)
                                sub_folder_size += os.path.getsize(p)
                                self.update_fps()
                            except Exception as error:
                                self.print_log("[-] Error thrown when process file!", error)
                        if self.dir_first_run == True:
                            self.total_dir_count += len(sub_dir)

                    # add to dict
                    self.paths[path] = sub_folder_size
                    self.dirs_count += len(dirs)
                    self.dir_first_run = False
                    
            # process files
            else:
                for file in files:
                    try:
                        p = os.path.join(path, file)
                        size = os.path.getsize(p)
                        self.files_size.append([size, p])
                        self.update_fps()
                    except PermissionError:
                        self.print_log("[-] Failed to read file! Access is denied")
                    except Exception as error:
                        self.print_log("[-] Failed to read file!", error)
                    
        self.print_log("[+] Finished walking!")

        if do_dirs == True:
            temp_list = []
            for key in self.paths.keys():
                temp_list.append([self.paths[key], key])
            self.files = list(reversed(sorted(temp_list)))
        else:
            self.files = list(reversed(sorted(self.files_size)))
        self.write_csv()

    def update_fps(self):
        self.count += 1
        self.fps += 1
        if self.dirs_count > 0 and self.stop_count == False:
            self.stop_count = True
            self.final_file_count = self.count
        if self.count % self.step_size == 0:
            if time.time()-self.start_time > self.print_time:
                self.start_time = time.time()
                self.cfps =  "{:,}".format(int(self.fps / self.print_time))
                self.fps = 0
                
                # update log
                if self.stop_count == True:
                    prct = round((self.dirs_count / self.total_dir_count)*100, 2)
                    dir_test = " files! fps="+self.cfps + " dirs="+str(self.dirs_count)+" prct="+str(prct)
                    self.print_log('[+] Walked', "{:,}".format(self.final_file_count) + dir_test)
                else:
                    self.print_log('[+] Walked', "{:,}".format(self.count), "files! fps="+self.cfps)

    def update_log(self, data, new_log=False, close=False):
        if new_log == True:
            self.print_log("[+] New log started!")
            open(self.log_filename, "w").close()
            self.log_handler = open(self.log_filename, "ab")
            
        elif os.path.exists(self.log_filename):
            try:
                self.log_handler.write(data.encode("utf-8") + b"\n")
            except Exception as error:
                print("[-] Failed to write to log!", error)
        elif os.path.exists(self.log_filename) == False:
            open(self.log_filename, "w").close()

        if close == True:
            self.log_handler.close()

    def print_log(self, *text):
        txt = " ".join([str(i) for i in list(text)])
        print(txt)
        self.update_log(txt)

    def gb(self, num):
        terms = [" bytes", "KB", "MB", "GB", "TB", "PB"]
        count = 0
        if type(num) == str:
            if num.isdigit()==True:
                num = float(num)
            else:
                return num
            
        while num > 1024:
            num = num / 1024
            count += 1

        if "." in str(num):
            return (str(num).split('.')[0]+"."+str(num).split('.')[1][:2]) + terms[count]
        else:
            return str(num) + terms[count]

    def first_100(self, step=100):
        self.print_log("\n", step, "largest "+self.walking_in+":\n"+("-"*30))
        count = 1
        for file in self.files[0:step]:
            self.print_log(str(count)+"|\t" + self.gb(file[0]) + "\t" + file[1].replace('\\', '/'))
            count += 1
        self.update_log("", new_log=False, close=True)
        os.popen("pause")

    def write_csv(self):
        # paths
        if len(self.paths.keys()) > 0:
            print("[+] Writing Paths to CSV!")
            path_writer = open("paths.csv", "wb")
            for key in self.paths.keys():
                path_writer.write((str(self.paths[key])+","+key+"\n").encode("utf-8"))
            path_writer.close()

        # files
        if len(self.files) > 0:
            print("[+] Writing Files to CSV!")
            file_writer = open("files.csv", "wb")
            for item in self.files:
                file_writer.write((str(item[0])+","+item[1]+"\n").encode("utf-8"))
            file_writer.close()

    def get_input(self, finder):
        # return sys drive if input empty
        user_dir = input('Dir Path: ')
        if user_dir == "":
            user_dir = os.getenv("SystemDrive") + "\\"
        else:
            # check if input is valid path
            if os.path.exists(user_dir) == False:
                self.print_log("Nov a valid directory, please enter a valid dir e.g. C:\\")
            while os.path.exists(user_dir) == False:
                user_dir = input('Invalid Directory\nDir Path: ')

        # files or folders
        user_files = input("Menu:\n1. Files\n2. Folders\n3. Folders and sub folders (very slow)\n> ")
        if user_files[0:6].lower() in ["folder", "2"]:
            return [user_dir, True, False]
        elif user_files[0:6].lower() in ["sub", "subfolders", "3"]:
            return [user_dir, True, True]
        else:
            return [user_dir, False, False]
        
            
finder = find_largest()
finder.walk(finder.get_input(finder))
finder.first_100(step=10)
