import selenium, random, time, os, traceback
from selenium import webdriver
from urllib.request import urlretrieve

driver = webdriver.Chrome("chromedriver.exe")
website_url = "https://danbooru.donmai.us"
trust_modules = ["datetime", "math", "random", "hashlib", "time", "getpass", "socket", "urllib"]
cat_memes = []
normal_memes = []

def process():
    commands = open("commands.txt","r").read()
    if "get-henati" in commands:
        pgnum = str(random.randint(0,50))

        # get and write url to output file
        driver.get(website_url + "/posts?page="+pgnum+"&tags=nipples")
        urls = driver.execute_script("return" + open("get_henati.js","r").read())

        img_href = urls[random.randint(0, len(urls)-1)]
        print("Fetched Henati image!")

        post = website_url + img_href
        driver.get(post)
        src = driver.execute_script('return document.getElementById("image").getAttribute("src")')
        with open("output.txt", "w", encoding="utf-8") as output:
            output.write(src)

        # clear the commands file
        with open("commands.txt","w", encoding="utf-8") as commands_file:
            commands_file.write("\n")

def clear_exec():
    # clear execute file
    with open("execute.py","w", encoding="utf-8") as execute_file:
        execute_file.write("")

def run_code():
    try:
        # check the execute.py file for dangerious code
        time.sleep(0.5)
        execute_file_reader = open("execute.py").read()
        if execute_file_reader != "":
            print("input:", execute_file_reader)
        
        if execute_file_reader == "":
            time.sleep(1)
            return True
        
        if "import" in execute_file_reader:
            # get modules list
            lines = list(filter(None, [i if "import" in i else None for i in execute_file_reader.split("\n")]))
            lines1 = [[i.split(" ")[1]] if i.split(" ")[0]=="from" else i.replace("import","").replace(" ","").split(",") for i in lines]
            modules_temp = []
            for m in lines1:
                modules_temp += m
            modules = list(set([i.split(".")[0] for i in modules_temp]))

            # check if all modules are trusted
            if False in [i in trust_modules for i in modules]:
                # clear execute file
                with open("execute.py","w", encoding="utf-8") as execute_file:
                    execute_file.write("")
                    
                # write output to file
                with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                    f_output.write("Attempted to load untrusted module!")
                    time.sleep(1)
                clear_exec()
                return True
                
        if "input" in execute_file_reader:
            with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                f_output.write("Input statements are not allowed!")
            clear_exec()
            return True
            
        if "exec" in execute_file_reader:
            with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                f_output.write("Execute calls are disabled!")
            clear_exec()
            return True

        if "eval" in execute_file_reader:
            with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                f_output.write("Eval calls are disabled!")
            clear_exec()
            return True

        if "open" in execute_file_reader:
            with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                f_output.write("File IO is disabled!")
            clear_exec()
            return True
        
        if "builtins" in execute_file_reader:
            with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                f_output.write("builtins is disabled!")
            clear_exec()
            return True

        if "os" in execute_file_reader:
            with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                f_output.write("os is disabled!")
            clear_exec()
            return True

        if "globals" in execute_file_reader:
            with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                f_output.write("os is disabled!")
            clear_exec()
            return True

        if "time.sleep(" in execute_file_reader:
            a = execute_file_reader
            value = [float(i.split(")")[0]) if i.split(")")[0].replace(".","").isdigit()==True else i for i in a.split("time.sleep(")[1:]]
            try:
                if (False in [i <= 1 for i in value]) == True:
                        with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                            f_output.write("time.sleep delay too long!")
                        clear_exec()
                        return True
                    
            except NameError as err:
                output = str(traceback.format_exc())
                with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                    f_output.write(output)
                clear_exec()
                return True
            
            except:
                with open("execute_output.txt", "w", encoding="utf-8") as f_output:
                    f_output.write("time.sleep delay too long!")
                clear_exec()
                return True

        # check if runs for longer then 1 second
        title_name = "python_execute_code"
        if (title_name in os.popen('tasklist /V /FI "WindowTitle eq '+title_name+'"').read()) == False:
            os.popen('start "'+title_name+'" execute.py')

        # terminate the script if it runs for long time
        time.sleep(1)
        if (title_name in os.popen('tasklist /V /FI "WindowTitle eq '+title_name+'"').read()) == True:
            [os.popen('taskkill /FI "WindowTitle eq '+title_name+'" /T /F') for i in range(5)]
            print("code is dangerous!")
            
            # clear execute file
            with open("execute.py","w", encoding="utf-8") as execute_file:
                execute_file.write("")

            # write output to file
            with open("execute_output.txt","w", encoding="utf-8") as output_file:
                output_file.write("Script terminated as it ran for too long!")
            clear_exec()
            return True
            
            
        else:
            print("code is safe!")
            
        # run code
        try:
            str(exec(open("execute.py", "r", encoding="utf-8").read()))
            output = str(os.popen("execute.py", "r").read())
                
        except Exception as err:
            output = str(traceback.format_exc())
            print("Run code error:",output)

        # clear execute file
        with open("execute.py","w", encoding="utf-8") as execute_file:
            execute_file.write("")

        # write output to file
        with open("execute_output.txt","w", encoding="utf-8") as output_file:
            output_file.write(output)

        return "Complete!"


    except Exception as main_error:
        print("Main Error", main_error)

def clever_bot():
    try:
        user_input = open("chat_bot_input.txt", "r", encoding="utf-8").read()
        if user_input == "":
            return True
        elif user_input.lower() == "{restart}":
            print("restarting bot!")
            # kill the bot process
            os.popen("taskkill /f /im node.exe")

            # start bot
            os.popen("start /min node .")
            time.sleep(5)
            return True
            
        else:
            print("input:", user_input)

        # clear input file
        with open("chat_bot_input.txt", "w", encoding="utf-8") as input_file:
            input_file.write("")

        # clear output file
        with open("chat_bot_output.txt", "w", encoding="utf-8") as output_file:
            output_file.write("")

        # go to website if it is not open
        if "cleverbot.com" not in driver.current_url:
            driver.get("https://www.cleverbot.com/")
            time.sleep(1)
            driver.execute_script("document.querySelectorAll('[type=\"submit\"][value=\"understood, and agreed\"]')[0].click()")

        # submit input to clever bot
        driver.execute_script("document.querySelectorAll('[placeholder=\"say to cleverbot...\"]')[0].value = '"+user_input+"'")
        driver.find_elements_by_xpath('//form[@id="avatarform"]//input[@name="stimulus"]')
        driver.execute_script("cleverbot.sendAI();")

        # get output
        output = driver.execute_script("return document.querySelector('[id=\"line1\"]').innerText")
        while False not in ["." not in output, "?" not in output]:
            output = driver.execute_script("return document.querySelector('[id=\"line1\"]').innerText")
        print("output:", output)

        # write output to file
        with open("chat_bot_output.txt", "w", encoding="utf-8") as output_file:
            output_file.write(output)
            
    except Exception as error:
        print("an error occured in clever bot!", error)

        # write output to file
        with open("chat_bot_output.txt", "w", encoding="utf-8") as output_file:
            output_file.write("...")

def random_animal():
    try:
        if open("animal_input.txt", "r").read() == "random-animal":
            # clear animal_input file
            with open("animal_input.txt", "w") as input_file:
                input_file.write("")
            print("cleared animal_input")

            # get random animal
            file = open("datasets/animals.txt","r").read().split("\n")
            animal = file[random.randint(0, len(file)-1)]
            print("got random animal")
            
            # get animal photo
            driver.get("https://www.google.co.uk/search?hl=en&tbm=isch&q="+animal)
            url = driver.execute_script("return document.querySelectorAll('div[id=\"islrg\"] img[src^=\"data:image/jpeg;\"]')[0].getAttribute(\"src\")")

            # download file to computer
            file_name = "current_image.png"
            urlretrieve(url, file_name)

            # write animal name to file
            with open("animal_output.txt", "w") as animal_writer:
                animal_writer.write(animal)
                
    except Exception as error:
        print("error in random animal", error)

def get_meme():
    file_name = "meme.png"

    # clear meme_input file
    command = open("meme_input.txt", "r").read()
    with open("meme_input.txt", "w") as meme_input:
        meme_input.write("")

    # get meme
    if command == "meme-cat":
        source = "https://www.reddit.com/r/Catmemes/"
        if "reddit.com/r/Catmemes" not in driver.current_url:
            driver.get(source)

        #scroll to bottom of page
        driver.execute_script("for (i=0;i<10;i++) {setTimeout(function(){window.scrollTo(0,document.body.scrollHeight);},100*i,i)}")
        time.sleep(1)

        # pick a random cat meme
        js_selector = """(function() {
    elms = document.querySelectorAll('img[alt="Post image"][src^="https://preview.redd.it/"]');
    return elms[parseInt(Math.random() * 1000) % elms.length].getAttribute("src");\n})();"""
        url = driver.execute_script("return " + js_selector)

        #check if meme already posted
        count = 0
        if url in cat_memes:
            driver.execute_script("for (i=0;i<10;i++) {setTimeout(function(){window.scrollTo(0,document.body.scrollHeight);},100*i,i)}")
            time.sleep(0.1)
            url = driver.execute_script("return " + js_selector)
            count += 1
            if count > 10:
                driver.get(source)
        else:
            cat_memes.append(url)

        # download meme
        urlretrieve(url, file_name)
        print("["+str(len(cat_memes))+"]downloaded cat meme! ")
        
    elif command == "meme":
        source = "https://www.reddit.com/r/memes/"
        if "reddit.com/r/memes" not in driver.current_url:
            driver.get(source)

        #scroll to bottom of page
        driver.execute_script("for (i=0;i<10;i++) {setTimeout(function(){window.scrollTo(0,document.body.scrollHeight);},100*i,i)}")
        time.sleep(1)

        # pick a random meme
        js_selector = """(function() {
    elms = document.querySelectorAll('img[alt="Post image"][src^="https://preview.redd.it/"]');
    return elms[parseInt(Math.random() * 1000) % elms.length].getAttribute("src");\n})();"""
        url = driver.execute_script("return " + js_selector)

        #check if meme already posted
        count = 0
        if url in normal_memes:
            driver.execute_script("for (i=0;i<10;i++) {setTimeout(function(){window.scrollTo(0,document.body.scrollHeight);},100*i,i)}")
            time.sleep(0.1)
            url = driver.execute_script("return " + js_selector)
            count += 1
            if count > 10:
                driver.get(source)
        else:
            normal_memes.append(url)

        # download meme
        urlretrieve(url, file_name)
        print("["+str(len(cat_memes))+"]downloaded normal meme! ")

while True:
    try:
        process()
        run_code() 
        clever_bot()
        random_animal()
        get_meme()
        
    except Exception as err:
        print("error in while", err)
