import msvcrt
while True:
          key = msvcrt.getch()
          if key != b'\xff':
                    print("ORD:",ord(key),"KEY:",key)
