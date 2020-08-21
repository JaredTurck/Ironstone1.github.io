import os

def get_size(start_path = '.'):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(start_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            # skip if it is symbolic link
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)

    return round(total_size / 1024 / 1024, 2)

def largest_folder():
    start_dir = input("> ")
    children = [i for i in os.listdir(start_dir) if os.path.isdir(os.path.join(start_dir, i))]
    child_list = []
    
    for child in children:
        child_list.append(get_size(child))

    [print(i) for i in sorted(child_list)]

while True:
    largest_folder()
    
