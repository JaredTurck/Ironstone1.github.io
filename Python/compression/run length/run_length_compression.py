
# run length compression

def get_binary(fname):
    binary_str = []
    with open(fname, "rb") as file:
        for byte in file.read():
            binary_str.append(format(byte, "#010b")[2:])
    return "".join(binary_str)

def encode_zeros(bits, length=5):
    start_bit = -1
    count = 0
    for i in range(len(bits)):
        if bits[i:i+length] == "0"*length:
            # set start bit
            if start_bit == -1:
                start_bit = i
                
            count += 1
            
        else:
            if start_bit != -1:
                return [start_bit, start_bit+count+length-1]

def update_bits(bits, length=5, do_print=True):
    start_length = len(bits)
    start = encode_zeros(bits, length=length)
    while start != None:
        start = encode_zeros(bits, length=length)
        if start != None:
            bits = bits[:start[0]] +f"[0{start[1]-start[0]}]"+ bits[start[1]:]
            if do_print == True:
                pcnt = round((1-(len(bits) / start_length))*100, 2)
                print(f"Added operation [{start[0]}:{start[1]}]! {pcnt}%!")
    return bits

def write2file(bits):
    with open("run_length_compression_output.png", "wb") as file:
        file.write(bits.encode('UTF-8'))

bits = get_binary("black_img.png")
output = update_bits(bits, length=20, do_print=True)
diff = len(bits) - len(output), round((1-(len(output) / len(bits)))*100, 3)
write2file(output)

print(f'Original Length: {len(bits)}\nEncoded Length: {len(output)}\nBits saved: {diff[0]} ({diff[1]}%)')
