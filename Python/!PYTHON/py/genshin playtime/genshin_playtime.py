import os, time, datetime

class playtime():
    def __init__(self):
        self.exe_name = "GenshinImpact.exe"
        self.log_name = "Genshin_playtime.txt"
        self.total_playtime = 0
        self.last_time_stamp = None
        self.timeout = 5

    def get_todays_date(self):
        # returns in format YYYY-MM-DD
        return datetime.datetime.today().strftime("%Y-%m-%d")

    def get_current_day(self):
        # read the file
        temp_count = open(self.log_name, "r").read()

        # get the last days count in file
        recent_day = list(filter(None, temp_count.split('\n')))
        recent_day_count = recent_day[-1].split(',')[1]
        recent_day_name = recent_day[-1].split(',')[0]

        # check if the count is a number
        if recent_day_count.replace(".", "").isdigit() == True:
            recent_day_count = float(recent_day_count)
        else:
            recent_day_count = None

        # returns in format [Date, count]
        return [recent_day_name, recent_day_count]

    def append_new_date(self):
        # append new date
        print("[+] Adding new entry for current date!")
        with open(self.log_name, "a") as file:
            # write date,count to file
            file.write(str(self.get_todays_date()) + "," + str(self.total_playtime) + "\n")

    def update_log(self, firt_run=False, total_playtime=0):
        # read count from file
        try:
            # read the file
            # returns in format [Date, count]
            current_day = self.get_current_day()
            
            # update the log
            # check if the date in log is the same as current date
            if self.get_todays_date() == current_day[0]:
                # check if the value is an integer
                if type(current_day[1]) == float:
                    # checks if this is first time function has been called
                    if firt_run == True:
                        # record recent days playtime in memory
                        self.total_playtime = current_day[1]
                        print("[+] You have played " + str(current_day[1]) + " seconds today")

                    # update the files count
                    else:
                        # current count in file
                        current_count = current_day[1]

                        # read file contents
                        file_contents = open(self.log_name, "r").read()

                        # get previous days
                        file_days = list(filter(None, file_contents.split("\n")))
                        previous_days = "\n".join(file_days[0:len(file_days)-1])

                        # updated current day date
                        data2write = str(current_day[0]) + "," + str(self.total_playtime)

                        # write days to file
                        with open(self.log_name, "w") as file:
                            file.write(previous_days + "\n" + data2write + "\n")

            # current date not in file add it
            else:
                self.append_new_date()
                        

        # the file doesn't exist create it   
        except FileNotFoundError:
            # create the file
            print("[-] Log file doesn't exist creating new one!")
            open(self.log_name, "w")

            # append new date
            self.append_new_date()

        # value for the day is not a number
        except ValueError:
            # append new date to log
            self.append_new_date()

# init update
g = playtime()
g.update_log(firt_run=True)

# update count
print("logging playtime...")
while True:
    if (g.exe_name in os.popen("tasklist").read()) == True:
        # check for undefined var
        if g.last_time_stamp == None:
            g.last_time_stamp = time.time()

        # get the time passed between checks
        g.time_between_checks = time.time() - g.last_time_stamp

        # add time passed to total playtime
        g.total_playtime += g.time_between_checks

        # update last time stamp
        g.last_time_stamp = time.time()

        # update log
        g.update_log(firt_run=False, total_playtime=g.total_playtime)

        # sleep
        print("[+] Updated log file total playtime today ("+g.get_todays_date()+") is " + str(g.total_playtime))
        time.sleep(g.timeout)
