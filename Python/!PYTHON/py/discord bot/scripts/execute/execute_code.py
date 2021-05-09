class execute_code():
    def __init__(self):
        self.__run__ = self.__execute_main__()
        self.exec_time = 0

    def execute(self, input_code=None):
        __doc__ = """ safely execute some code """
        output = self.__run__.run_code(input_code)
        self.exec_time = output[1]
        return output[0]

    def is_safe(self, input_code=None):
        __doc__ = """ check if the input code is malicious"""
        return self.__run__.is_safe(input_code)
    
    class __execute_main__():
        def __init__(self):
            import subprocess, time, os, threading, signal
            self.local_dir = os.path.abspath(os.path.dirname(__file__)).replace('\\', '/')
            self.timeout_worker = 5
            self.time_sleep_max = 1
            self.check_script_timeout = 0.5
            self.subprocess = subprocess
            self.time = time
            self.os = os
            self.threading = threading
            self.signal = signal
            self.output = None
            self.execute_filename = "execute.py"
            self.error_timeout = f"Script was terminated, as it ran for longer then {self.timeout_worker} seconds!"
            self.error_untrusted_module = "Attempted to load untrusted module!"
            self.error_dangerious_keyword = " is not allowed!"
            self.error_time_sleep = "time.sleep delay is too long!"
            self.error_time_negative = "You can't have a negative time.sleep delay!"
            self.error_attribute = "'is_safe' method has no attribute 'input_code'!" +\
                "\nYou have called the is_safe method without passing in code to check!"
            self.error_code_not_str = "The input code must be a string!"
            self.trust_modules = ["datetime", "math", "random", "hashlib", "time", "getpass", "socket", "urllib"]
            self.dangerious_keywords = ["input", "exec", "eval", "compile", "open", "builtins", "os", "globals",
                                        "locals", "breakpoint", "dir", "delattr", "getattr", "repr", "vars"]
            self.encoding = 'ISO-8859-1'
            self.remove_last_char = lambda x : [x[:len(x)-3] if x[len(x)-3:] == "\r\n\n" else x][0]
            self.command_windows = 'tasklist /FI "pid eq {0}"'

        def worker(self, *args):
            __doc__ = """ worker method, input code is executed by worker."""

            # execute the code as seperate instance
            self.output = None
            process = self.subprocess.Popen('python "'+self.local_dir+'/'+self.execute_filename+'"',
                stdout=self.subprocess.DEVNULL,
                stderr=self.subprocess.STDOUT,
                creationflags=self.subprocess.CREATE_NO_WINDOW)
            self.pid = process.pid
        
        def run_code(self, input_code):
            __doc__ = """ the main function, used to write the code to file,
            check if the code is safe to execute, call the worker thread, and
            also handles shutting down worker if it uses to much processor time"""

            # check if input code is a string
            self.execute_start = self.time.time()
            self.input_code = input_code
            assert type(self.input_code) == str, self.error_code_not_str
            
            # check if the code is safe
            result = self.is_safe(self.input_code)
            if result[0] == False:
                self.exec_time = self.time.time() - self.execute_start
                return [result[1], self.exec_time]
            else:
                # write users code to file
                self.input_code = input_code
                with open("execute.py", "w") as file:
                    file.write(self.input_code)

                # check if the user is on linux or windows
                
                # execute code
                self.worker() # run the users code

                # timeout wait for code to finish executing
                end = self.time.time() + self.timeout_worker
                while self.time.time() < end:
                    # check if the script is still running
                    self.time.sleep(self.check_script_timeout)
                    is_running = self.os.popen(self.command_windows.format(self.pid)).read()
                    if ("INFO: No tasks are running" in is_running):
                        # run the code again to get output
                        #output = self.os.popen('python "'+self.local_dir+'/'+self.execute_filename+'"').read()
                        process = self.subprocess.Popen('python "'+self.local_dir+'/'+self.execute_filename+'"',
                                stdout=self.subprocess.PIPE,
                                stderr=self.subprocess.PIPE,
                                creationflags=self.subprocess.CREATE_NO_WINDOW)
                        stdout, stderr = process.communicate()
                        self.exec_time = self.time.time() - self.execute_start
                        output = (stdout +b'\n'+ stderr).decode(self.encoding)
                        return [self.remove_last_char(output), self.exec_time]
                        
                # the script is still running terminate it
                self.os.kill(self.pid, self.signal.SIGTERM)
                self.exec_time = self.time.time() - self.execute_start
                return [self.error_timeout, self.exec_time]

        def is_safe(self, input_code=None):
            __doc__ = """ check if the input code is maltious,
            returns True if it's harmful, else return False if it's safe."""

            # get input
            if input_code == None:
                if hasattr(self, "input_code"):
                    code_lines = self.input_code.split("\n")
                    input_code = self.input_code
                else:
                    raise AttributeError(self.error_attribute)
            else:
                assert type(input_code) == str, self.error_code_not_str
                code_lines = input_code.split("\n")
            
            # check imports
            for i in range(len(code_lines)):
                if "import" in code_lines[i]:
                    line = code_lines[i].replace('import', '').replace(' ', '').split(',')

                    # check each import line
                    for i in range(len(line)):
                        if line[i] not in self.trust_modules:
                            return [False, self.error_untrusted_module]

            # check dangerious keywords
            for i in range(len(self.dangerious_keywords)):
                if self.dangerious_keywords[i] in input_code:
                    return [False, self.dangerious_keywords[i] + self.error_dangerious_keyword]

            # check time.sleep
            sleep_lines = input_code.split('time.sleep(')
            for i in range(len(sleep_lines)):
                current_num = sleep_lines[i].split(')')[0].split('.')[0]
                if current_num.replace('-', '').isdigit() == True:
                    if int(current_num) > self.time_sleep_max:
                        return [False, self.error_time_sleep]
                    elif "-" in current_num:
                        return [False, self.error_time_negative]

            # code is safe
            return [True, ""]
