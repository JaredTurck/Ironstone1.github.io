import sys, os
import ctypes as ct
from ctypes import wintypes as wt


PROCESS_VM_READ = 0x0010

def get_pid(exe_name):
    x = os.popen('tasklist /FI "ImageName eq '+exe_name+'"').read()
    if not x.find("No tasks are running") >= 0:
        return int(list(filter(None, x[x.find(exe_name):-1].split(" ")))[1])
    return -1


def main(*argv):
    kernel32 = ct.WinDLL("kernel32")

    OpenProcess = kernel32.OpenProcess
    OpenProcess.argtypes = [wt.DWORD, wt.BOOL, wt.DWORD]
    OpenProcess.restype = wt.HANDLE

    ReadProcessMemory = kernel32.ReadProcessMemory
    ReadProcessMemory.argtypes = [wt.HANDLE, wt.LPCVOID, wt.LPVOID, ct.c_size_t, ct.POINTER(ct.c_size_t)]
    ReadProcessMemory.restype = wt.BOOL

    GetLastError = kernel32.GetLastError
    GetLastError.argtypes = []
    GetLastError.restype = wt.DWORD

    CloseHandle = kernel32.CloseHandle
    CloseHandle.argtypes = [wt.HANDLE]
    CloseHandle.restype = wt.BOOL

    np_pid = get_pid("notepad.exe")
    np = OpenProcess(PROCESS_VM_READ, 0, np_pid)
    if not np:
        print("OpenProcess failed: {0:d}".format(GetLastError()))
        return

    buf_len = 0x0F # 0xFF  # Lower value for display purposes
    buf = ct.create_string_buffer(buf_len)
    read = ct.c_size_t()
    addr = 0x00007FF79A1E0000  # Got a readable address from VMMap as well, but I don't know the one where the actual text is stored

    res = ReadProcessMemory(np, addr, buf, buf_len, ct.byref(read))
    if res:
        print("Read ({0:d} bytes) from process ({1:d}) address 0x{2:016X}:".format(read.value, np_pid, addr))
        text = ""
        for i in range(read.value):
            text += " 0x{0:02X}".format(ord(buf[i]))
        print(text)
    else:
        print("ReadProcessMemory failed: {0:d}".format(GetLastError()))

    CloseHandle(np)


if __name__ == "__main__":
    print("Python {0:s} {1:d}bit on {2:s}\n".format(" ".join(elem.strip() for elem in sys.version.split("\n")), 64 if sys.maxsize > 0x100000000 else 32, sys.platform))
    main(*sys.argv[1:])
    print("\nDone.")
