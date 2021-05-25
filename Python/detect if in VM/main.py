import os

def is_running_in_vm():
    for model in (lambda x : x[x.index("System Model"):].split("\n")[0])(os.popen("systeminfo").read()):
        if "Virtual Machine" in model:
            return True
        else:
            return False

print(is_running_in_vm())
