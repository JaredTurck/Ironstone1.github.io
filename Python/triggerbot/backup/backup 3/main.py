import TriggerBot

bot = TriggerBot.TriggerBot()

avg_fps = bot.benchmark(timeout=1, display_txt=False)[1]
while bot.exit == False:
    choice = input("\nMenu: \n1. Start Triggerbot\n2. Calibrate Colours\n3. Benchmark\n4. Exit\n> ")
    while choice not in ["1", "2", "3", "4"]:
        choice = input("Invalid input!\n> ")
    
    if choice == "1":
        bot.start()
        
    elif choice == "2":
        bot.calibrate_colours()
        while choice != "exit":
            choice = input("Press Enter to calibrate more colours, or type exit to goto menu!\n")
            if choice.tolower() == "exit":
                bot.calibrate_colours()

    elif choice == "3":
        sec = input("Enter No. seconds to run benchmark for, or leave blank for default!\n> ")
        if sec.isdigit() == True:
            if int(sec) >= 1:
                bot.benchmark(timeout=int(sec))
        else:
            bot.benchmark()

    elif choice == "4":
        bot.exit = True
