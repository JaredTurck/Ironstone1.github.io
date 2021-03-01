import winreg, os

class productKey():
    def get_hive():
        """ returns the registry location of the product key """
        # registry location
        hiveName = 'SOFTWARE\Microsoft\Windows NT\CurrentVersion'
        keyName = 'DigitalProductId'
        return [hiveName, keyName]

    def get_reg_key():
        """ reads the registry and returns the product key data """
        hiveName, keyName = productKey.get_hive()
        hive = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, hiveName)
        data = winreg.QueryValueEx(hive, keyName)
        return bytearray(data[0])

    def decode_key(digitalProductId):
        """ decoded the product key """
        # format key
        isWin8 = int(digitalProductId[66] / 6) & 1
        digitalProductId[66] = (digitalProductId[66] & 0x7f) | (isWin8 & 2) * 4

        # decode key
        KeyOffset = 52
        digits = "BCDFGHJKMPQRTVWXY2346789"
        key = ""

        for i in range(24, -1, -1):
            current = 0
            for j in range(14, -1, -1):
                current = current*256
                digit = digitalProductId[j + KeyOffset]
                if type(digit) == str:
                    digit = ord(digit)
                
                current = digit + current
                digitalProductId[j + KeyOffset] = current//24 if current//24 <= 255 else 255
                current = current % 24
                
            key = digits[current] + key
            
        return key

    def key(hyphenate=True):
        """ returns the windows product key """
        key = productKey.decode_key(productKey.get_reg_key())
        if hyphenate:
            return "-".join([key[i:i+5] for i in range(0, 24, 5)])
        else:
            return key

    def activate():
        """ activates windows """
        print(os.popen('slmgr /ato ' + productKey.key()).read())
