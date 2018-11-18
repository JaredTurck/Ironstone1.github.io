import base64

FName = "86.mp4"

file_raw = open(FName, "rb").read()
file_new = open(FName + "_new.com1", "w")
chunk_size = 10000000

parts = b""

rounds = int(len(file_raw) / chunk_size)
for i in range(rounds):
    file_new.write(base64.b64encode(file_raw[i*chunk_size:(i+1)*chunk_size]).decode("utf-8"))
    print(i, True)

file_new.close()
