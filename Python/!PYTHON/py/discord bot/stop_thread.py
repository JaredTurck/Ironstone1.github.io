import multiprocessing
import time, os, traceback

def execute_code(n):
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

def main():
    p = multiprocessing.Process(target=execute_code, name="execute_code", args=(10,))
    p.start()

    time.sleep(5)
    if p.is_alive():
        p.terminate()
        p.join()

        # clear execute file
        with open("execute.py","w", encoding="utf-8") as execute_file:
            execute_file.write("")

        # write output to file
        with open("execute_output.txt","w", encoding="utf-8") as output_file:
            output_file.write("[ERROR] Process terminated as it ran for too long!")
