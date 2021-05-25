import time, keyboard, winsound

start_timer = False
start_cooldown = False
timeout = False
while True:
    if start_cooldown == False:
        if keyboard.is_pressed('e') == True:
            if start_timer == False:
                start = time.time()
                start_cooldown = True
                print("Timer started!")
                winsound.Beep(3000, 1000)
                start_cooldown = False
                start_timer = True
            else:
                end = time.time()
                print(f'timer ended!\ntime passed: {end - start}')
                start_timer = False
                time.sleep(1)
        if keyboard.is_pressed('x') == True:
            break;
