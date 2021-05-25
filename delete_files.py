"""
run this script on dir before uploading to github
"""

import os

banned_extensions = ['mp4', 'mov', 'avi', 'png', 'jpg', 'zip', 'exe', 'log'
                     'psd', 'psb', 'msi', 'tlog', 'ipch', 'sqlite', 'webm', 'mpg',
                     'download']

file_path = "/".join(__file__.split('\\')[:-1])

max_html_size = 30

for path, dirs, files in os.walk(file_path):
    for file in files:
        extension = file.split('.')[-1].lower()
        fpath = os.path.join(path, file)
        size = os.path.getsize(fpath) / 1024 / 1024
        try:
            # check for banned extension
            if extension in banned_extensions:
                os.remove(fpath)
                print(f"[+] Deleted file {file}!")
            # check for file with path length > 256
            elif len(fpath) > 256:
                os.remove(fpath)
                print(f"[+] File path to long, deleted file! {file}")
            # file larger then 100MB
            elif size > 100:
                os.remove(fpath)
                print(f"[+] File over 100MB, deleted file! {file}")
            # webpage larger then 1KB
            elif extension == "html":
                if (size*1024) > max_html_size:
                    os.remove(fpath)
                    print(f"[+] Removed HTML file larger then {max_html_size}KB {file}!")
        except Exception as error:
                print(f'[-] Failed to delete file {file}! ' + str(error))
                
print("Finished!")
os.popen('pause')
