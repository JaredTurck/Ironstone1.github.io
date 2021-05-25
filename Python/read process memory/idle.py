import os
from ctypes import *
from ctypes.wintypes import *

def get_pid(exe_name):
    x = os.popen('tasklist /FI "ImageName eq '+process_name+'"').read()
    if not x.find("No tasks are running") >= 0:
        return int(list(filter(None, x[x.find(process_name):-1].split(" ")))[1])
    return -1

def get_data(PROCESS_ID, PROCESS_HEADER_ADDR, STRLEN=255, PROCESS_VM_READ=0x0010):
    k32 = WinDLL('kernel32')
    k32.OpenProcess.argtypes = DWORD,BOOL,DWORD
    k32.OpenProcess.restype = HANDLE
    k32.ReadProcessMemory.argtypes = HANDLE,LPVOID,LPVOID,c_size_t,POINTER(c_size_t)
    k32.ReadProcessMemory.restype = BOOL

    process = k32.OpenProcess(PROCESS_VM_READ, 0, PROCESS_ID)
    buf = create_string_buffer(STRLEN)
    s = c_size_t()
    #if k32.ReadProcessMemory(process, PROCESS_HEADER_ADDR, buf, STRLEN, byref(s)):
    return (s.value,buf.raw)


process_name = "notepad.exe"
pid = get_pid(process_name)
process_header_addr = 0x00007FF79A1E1000 # address from VMMap

data = get_data(pid, process_header_addr)
print(data)

# wrong process header address, the program returns nothing
