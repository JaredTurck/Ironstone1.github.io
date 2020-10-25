import selenium, random, time, os, traceback, threading
from selenium import webdriver
from urllib.request import urlretrieve

#driver = webdriver.Chrome("chromedriver.exe")

def run_code(execute_file_reader):
    try:
        # check the execute.py file for dangerious code
        time.sleep(0.5)
        if execute_file_reader != "":
            print("input:", execute_file_reader)
        
        if execute_file_reader == "":
            time.sleep(1)
            return True
        
        if "import" in execute_file_reader:
            # get modules list
            lines = list(filter(None, [i if "import" in i else None for i in execute_file_reader.split("\n")]))
            lines1 = [[i.split(" ")[1]] if i.split(" ")[0]=="from" else i.replace("import","").replace(" ","").split(",") for i in lines]
            modules_temp = []
            for m in lines1:
                modules_temp += m
            modules = list(set([i.split(".")[0] for i in modules_temp]))

            # check if all modules are trusted
            if False in [i in trust_modules for i in modules]:
                # clear execute file
                with open("execute.py","w", encoding="utf-8") as execute_file:
                    execute_file.write("")
                    
                # write output to file
                with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                    f_output.write("Attempted to load untrusted module!")
                    time.sleep(1)
                    return True
                
        if "input" in execute_file_reader:
            with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                f_output.write("Input statements are not allowed!")
                time.sleep(1)
                return True

        elif "while" in execute_file_reader:
            with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                f_output.write("While loops are not allowed!")
                time.sleep(1)
            
        # run code
        try:
            str(exec(open("execute.py", "r", encoding="utf-8").read()))
            output = str(os.popen("execute.py", "r").read())
                
        except Exception as err:
            output = str(traceback.format_exc())
            print("Run code error:",output)

        # clear execute file
        with open("execute.py","w", encoding="utf-8") as execute_file:
            execute_file.write("")

        # write output to file
        with open("execute_output.txt","w", encoding="utf-8") as output_file:
            output_file.write(output)


    except Exception as main_error:
        print("Main Error", main_error)

def process_code():
    if open("execute.py").read() != "":
        # clear execute file
        with open("execute.py","w", encoding="utf-8") as execute_file:
            execute_file.write("")

        # start the thread
        execute_file_reader = open("execute.py").read()
        p = threading.Thread(target=run_code, args=(execute_file_reader, ))
        p.start()

        time.sleep(2)

        # is the thread alive
        if p.is_alive() == True:
            print("process ran longer then a second!")
            
            # write output to file
            with open("execute_output.txt","w", encoding="utf-8") as output_file:
                output_file.write("[error] process ran longer then a second!")
    else:
        time.sleep(2)

#while True:
#    process_code()

# driver gets recalled every time the process starts
# while loop doesn't work in IDLE, but works in shell
