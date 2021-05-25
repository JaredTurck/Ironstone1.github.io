import keyboard

def get_key_press(key):
    while True:
        if keyboard.is_pressed(key):
            print(key, "pressed!")

get_key_press("e")
