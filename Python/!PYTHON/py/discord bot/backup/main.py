import selenium, random, time, os, traceback, subprocess, psutil, signal
from selenium import webdriver
from urllib.request import urlretrieve, urlopen
from googletrans import Translator

driver = webdriver.Chrome("chromedriver.exe")
website_url = "https://danbooru.donmai.us"
henati_tags = "&tags=breasts+"
trust_modules = ["datetime", "math", "random", "hashlib", "time", "getpass", "socket", "urllib"]
dangerious_keywords = ["input", "exec", "eval", "compile", "open", "builtins", "os", "globals", "locals", "breakpoint", "dir", "delattr", "getattr", "repr", "vars"]
cat_memes = []
normal_memes = []

IO_folder = "InputOutput/"

def process():
    commands = open(IO_folder+"commands.txt","r").read()
    if "get-henati" in commands:
        pgnum = str(random.randint(0,50))

        # get and write url to output file
        driver.get(website_url + "/posts?page="+pgnum+henati_tags)
        urls = driver.execute_script("return" + open("get_henati.js","r").read())

        img_href = urls[random.randint(0, len(urls)-1)]
        print("Fetched Henati image!")

        post = website_url + img_href
        driver.get(post)
        src = driver.execute_script('return document.getElementById("image").getAttribute("src")')
        with open(IO_folder+"output.txt", "w", encoding="utf-8") as output:
            output.write(src)

        # clear the commands file
        with open(IO_folder+"commands.txt","w", encoding="utf-8") as commands_file:
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
                with open(IO_folder+"execute_output.txt", "w", encoding="utf-8") as f_output:
                    f_output.write("Attempted to load untrusted module!")
                    time.sleep(1)
                clear_exec()
                return True

        for keyword in dangerious_keywords:
            if keyword in execute_file_reader:
                with open(IO_folder+"execute_output.txt", "w", encoding="utf-8") as f_output:
                    f_output.write(keyword + " is not allowed!")
                clear_exec()
                return True

        if "time.sleep(" in execute_file_reader:
            a = execute_file_reader
            value = [float(i.split(")")[0]) if i.split(")")[0].replace(".","").isdigit()==True else i for i in a.split("time.sleep(")[1:]]
            try:
                if (False in [i <= 1 for i in value]) == True:
                        with open(IO_folder+"execute_output.txt", "w", encoding="utf-8") as f_output:
                            f_output.write("time.sleep delay too long!")
                        clear_exec()
                        return True
                    
            except NameError as err:
                output = str(traceback.format_exc())
                with open(IO_folder+"execute_output.txt", "w", encoding="utf-8") as f_output:
                    f_output.write(output)
                clear_exec()
                return True
            
            except:
                with open(IO_folder+"execute_output.txt", "w", encoding="utf-8") as f_output:
                    f_output.write("time.sleep delay too long!")
                clear_exec()
                return True

        # check if runs for longer then 1 second
        #title_name = "python_execute_code"
        #if (title_name in os.popen('tasklist /V /FI "WindowTitle eq '+title_name+'"').read()) == False:
        #    os.popen('start "'+title_name+'" execute.py')
        pid = subprocess.Popen(["python.exe", "./execute.py"]).pid

        # terminate the script if it runs for long time
        time.sleep(1)

        try:
            psutil.Process(pid)
            os.kill(pid, signal.SIGTERM)
            
            # clear execute file
            with open("execute.py","w", encoding="utf-8") as execute_file:
                execute_file.write("")

            # write output to file
            with open(IO_folder+"execute_output.txt","w", encoding="utf-8") as output_file:
                output_file.write("Script terminated as it ran for too long!")
            clear_exec()
            return True

        except:
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
        with open(IO_folder+"execute_output.txt","w", encoding="utf-8") as output_file:
            output_file.write(output)

        return "Complete!"


    except Exception as main_error:
        print("Main Error", main_error)

def clever_bot():
    try:
        user_input = open(IO_folder+"chat_bot_input.txt", "r", encoding="utf-8").read()
        if user_input == "":
            return True
        elif user_input.lower() == "restart_restart_node_js":
            print("restarting bot!")
            # kill the bot process
            os.popen("taskkill /f /im node.exe")

            # start bot
            time.sleep(2)
            os.popen("start /min node .")
            time.sleep(5)

            # write that the bot restarted!
            with open(IO_folder+"chat_bot_input.txt", "w") as file:
                file.write("restart_successful")
            
            return True
            
        else:
            print("input:", user_input)

        # clear input file
        with open(IO_folder+"chat_bot_input.txt", "w", encoding="utf-8") as input_file:
            input_file.write("")

        # clear output file
        with open(IO_folder+"chat_bot_output.txt", "w", encoding="utf-8") as output_file:
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
        with open(IO_folder+"chat_bot_output.txt", "w", encoding="utf-8") as output_file:
            output_file.write(output)
            
    except Exception as error:
        print("an error occured in clever bot!", error)

        # write output to file
        with open(IO_folder+"chat_bot_output.txt", "w", encoding="utf-8") as output_file:
            output_file.write("...")

def random_animal():
    try:
        if open(IO_folder+"animal_input.txt", "r").read() == "random-animal":
            # clear animal_input file
            with open(IO_folder+"animal_input.txt", "w") as input_file:
                input_file.write("")
            print("cleared animal_input")

            # get random animal
            file = open("datasets/animals.txt","r").read().split("\n")
            animal = file[random.randint(0, len(file)-1)]
            print("got random animal")
            
            # get animal photo
            driver.get("https://www.google.co.uk/search?hl=en&tbm=isch&q="+animal+"+animal")
            url = driver.execute_script("return document.querySelectorAll('div[id=\"islrg\"] img[src^=\"data:image/jpeg;\"]')[0].getAttribute(\"src\")")

            # download file to computer
            file_name = "current_image.png"
            urlretrieve(url, file_name)

            # write animal name to file
            with open(IO_folder+"animal_output.txt", "w") as animal_writer:
                animal_writer.write(animal)
                
    except Exception as error:
        print("error in random animal", error)

def get_meme():
    file_name = "meme.png"

    # clear meme_input file
    command = open(IO_folder+"meme_input.txt", "r").read()
    with open(IO_folder+"meme_input.txt", "w") as meme_input:
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

def get_steam_info():
    command = open(IO_folder+"steam_info_input.txt", "r").read()
    with open(IO_folder+"steam_info_input.txt", "w") as info_input:
        info_input.write("")

    # check for command in file
    if command[0:15] == "get-steam-info ":
        data = {}

        # define URL
        if command[15:].isdigit() == True:
            url = "https://steamcommunity.com/profiles/" + command[15:]
        elif "steamcommunity.com" in command[15:]:
            url = command[15:]
        else:
            url = "https://steamcommunity.com/id/" + command[15:]

        # get HTML
        html = urlopen(url + "?xml=1").read().decode("utf-8")
        tags = ['steamID64', 'steamID', 'customURL', 'onlineState', 'privacyState', 'visibilityState',
                'vacBanned', 'tradeBanState', 'isLimitedAccount', 'memberSince', 'location', 'realname', 'summary']

        # check for error
        if "The specified profile could not be found" in html:
            with open(IO_folder+"steam_data_output.txt", "w") as file:
                file.write("The specified profile could not be found.")

        # remove tags from HTML
        replaces = ["<![CDATA[", "]]</", "</", "]]/", "]]", "<", ">"]
        for item in replaces:
            html = html.replace(item, "")

        for tag in tags:
            try:
                data[tag] = html.split(tag)[1].split(tag)[0]
            except:
                print("failed to add tag! " + tag)

        # cleanup data
        data["vacBanned"] = ["No", "Yes"][int(data["vacBanned"])]
        data["visibilityState"] = ["Private", "Friend's Only", "Public"][int(data["visibilityState"])-1]
        data["isLimitedAccount"] = ["No", "Yes"][int(data["isLimitedAccount"])]

        # write data to output file
        file = open(IO_folder+"steam_data_output.txt", "w")
        for key in data.keys():
            file.write(key + ":" + data[key] + "\n")

        print("steam data writen to file!")
        file.close()

def translate(src = ""):
    count = 0
    max_retries = 100
    while count < max_retries:
        try:
            t = Translator()
            src = open(IO_folder+"translate_input.txt", "r", encoding="utf-8").read()
            if src != "":
                dst = t.translate(src, dest='en').text
                print("Input: " + src + "\nOutput: " + dst)
                count = max_retries
            
        except Exception as err:
            dst = str("Translation could not be found!")
            print("["+str(count)+"] Failed to translate trying again!")
            count += 1
            
        finally:
            count += 1

    if src != "":
        # clear input file
        with open(IO_folder+"translate_input.txt", "w") as input_file:
                input_file.write("")
    
        # write to file
        with open(IO_folder+"translate_output.txt", "w") as file:
            file.write(dst)

while True:
    try:
        process()
        run_code()
        clever_bot()
        random_animal()
        get_meme()
        get_steam_info()
        translate()
        
    except Exception as err:
        print("error in while", err)
