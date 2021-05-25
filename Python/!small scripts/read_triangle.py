
output = []
with open('triangle.png', 'rb') as file:
    for byte in file.read():
        output.append(format(byte, '08b'))

print(f"Number of bytes: {len(output)}")
print(f'\nraw bytes: {"".join(output)}')
