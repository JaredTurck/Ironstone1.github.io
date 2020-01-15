import win32clipboard, win32com.client, time

data = [b"", b""]

while True:
    shell = win32com.client.Dispatch("WScript.Shell")
    shell.SendKeys("{PRTSC}{PRTSC}{PRTSC}{PRTSC}{PRTSC}{PRTSC}{PRTSC}{PRTSC}")

    win32clipboard.OpenClipboard()
    data.append(win32clipboard.GetClipboardData(8))
    win32clipboard.CloseClipboard()

    time.sleep(1)
    if data[-1] != data[-2]:
        print(type(data[-1]))
        if type(data) == bytes:
            print(len(data[-1]))
            print(data[:100])
    else: print(False)
