import os

def read_driver():
    letter = "E"
    driver = open(r'\\.\\'+letter+":", "rb+")
    
    p = driver.read(1024)
    print(p)

def read_file():
    letter = "E"
    path = r"D:\\OneDrive\\Desktop\\PYTHON\\py\\huffman\\img1.png"
    driver = open(path, "rb+")

    p = driver.read(1024)
    print(p)

def write_file():
    fname = "a.txt"
    path = os.path.dirname(os.path.abspath(__file__))
    data = "1000000010000000" # 2 bytes
    
    driver = open(os.path.join(path, fname), "wb+")
    driver.write(bytearray([int(data[i:i+8], 2) for i in range(0, len(data), 8)]))
    driver.close()
