from selenium import webdriver

def write_to_log(text, end="\n"):
    try:
        with open("log.txt", "a") as log_file:
            log_file.write(text + end)
    except:
        log_file = open("log.txt", "w")
        log_file.close()

    finally:
        print(text)

def get_data():
    # --- Start Selenium and load webpage ---
    url = "https://prosettings.net/cs-go-pro-settings-gear-list/"
    config_url = "https://prosettings.net/configs/"
    teams = {}

    write_to_log("[+] Starting webdriver...")
    driver = webdriver.Chrome("chromedriver.exe")
    write_to_log("[+] Loading webpage...")
    driver.get(url)

    # --- Create dataset of players ---
    write_to_log("[+] Getting player info, please wait")
    driver.maximize_window()
    driver.find_element_by_css_selector('[id="table_1"] tbody tr[id^="table_"]')
    players = driver.find_element_by_css_selector('[id="table_1"] tbody').find_elements_by_tag_name("tr")

    for player in players:
        # name and team
        name = player.find_element_by_css_selector('[class="  column-player"]').text
        if name == 'dev1ce / device': name = 'dev1ce'
        team = player.find_element_by_css_selector('[class=" team_column column-team"]').text
        team = team.replace(" (Inactive)", "").replace(" (inactive)", "")
        team = team.replace(" (Retired)", "").replace(" (retired)", "")

        # other stats
        role        = player.find_element_by_css_selector('[class="  column-role"]').text
        mouse       = player.find_element_by_css_selector('[class="  column-mouse"]').text
        monitor_hz  = player.find_element_by_css_selector('[class=" numdata integer  column-hz"]').text
        dpi         = player.find_element_by_css_selector('[class=" numdata integer  column-dpi"]').text
        sensitivity = player.find_element_by_css_selector('[class=" numdata float  column-sensitivity"]').text
        e_dpi       = player.find_element_by_css_selector('[class=" numdata integer  column-edpi"]').text
        zoom_sens   = player.find_element_by_css_selector('[class=" numdata float  column-zoomsens"]').text
        mouse_accel = player.find_element_by_css_selector('[class=" numdata integer  column-mouseaccel"]').text
        win_sens    = player.find_element_by_css_selector('[class=" numdata integer  column-windowssens"]').text
        raw_input   = player.find_element_by_css_selector('[class=" numdata integer  column-rawinput"]').text
        monitor     = player.find_element_by_css_selector('[class="  column-monitor"]').text
        hz          = player.find_element_by_css_selector('[class=" numdata integer  column-hz_1"]').text
        gpu         = player.find_element_by_css_selector('[class="  column-gpu"]').text
        resolution  = player.find_element_by_css_selector('[class="  column-resolution"]').text
        aspectratio = player.find_element_by_css_selector('[class="  column-aspectratio"]').text
        scale_mode  = player.find_element_by_css_selector('[class="  column-scalingmode"]').text
        mouse_pad   = player.find_element_by_css_selector('[class="  column-mousepad"]').text
        keyboard    = player.find_element_by_css_selector('[class="  column-keyboard"]').text
        headset = player.find_element_by_css_selector('[class="  column-headset"]').text

        # add data to dictonary
        if team in teams:
            if not team == "": 
                teams[team][name] = {
                    "role"                  : role,
                    "mouse"                 : mouse,
                    "monitor_hz"            : monitor_hz,
                    "dpi"                   : dpi,
                    "sensitivity"           : sensitivity,
                    "e_dpi"                 : e_dpi,
                    "zoom_sensitivity"      : zoom_sens,
                    "mouse_acceleration"    : mouse_accel,
                    "windows_sensitivity"   : win_sens,
                    "raw_input"             : raw_input,
                    "monitor"               : monitor,
                    "hz"                    : hz,
                    "gpu"                   : gpu,
                    "resolution"            : resolution,
                    "aspectratio"           : aspectratio,
                    "scaling_mode"          : scale_mode,
                    "mouse_pad"             : mouse_pad,
                    "keyboard"              : keyboard,
                    "headset"               : headset
                }
                
        else:
            if not name == "":
                teams[team] = {
                    name :
                        {
                            "role"                  : role,
                            "mouse"                 : mouse,
                            "monitor_hz"            : monitor_hz,
                            "dpi"                   : dpi,
                            "sensitivity"           : sensitivity,
                            "e_dpi"                 : e_dpi,
                            "zoom_sensitivity"      : zoom_sens,
                            "mouse_acceleration"    : mouse_accel,
                            "windows_sensitivity"   : win_sens,
                            "raw_input"             : raw_input,
                            "monitor"               : monitor,
                            "hz"                    : hz,
                            "gpu"                   : gpu,
                            "resolution"            : resolution,
                            "aspectratio"           : aspectratio,
                            "scaling_mode"          : scale_mode,
                            "mouse_pad"             : mouse_pad,
                            "keyboard"              : keyboard,
                            "headset"               : headset
                        }
                    }
        write_to_log(".", end="")
        
    write_to_log("[+] The following data has been collected:")
    write_to_log("\t players: ", len(players))
    write_to_log("\t Teams:", len(teams))
    write_to_log("\n[+] getting crosshair, viewmodel and cl_bob settings for each player, please wait...")

    # --- add crosshair, viewmodel, and cl_bob to dataset ---
    for team in list(teams.keys()):
        for player in list(teams[team].keys()):
            try:
                driver.get("https://prosettings.net/counterstrike/" + player)

                settings_current = driver.find_elements_by_css_selector('pre[class="x-code"]')
                teams[team][player]["crosshair"] = settings_current[0].text
                teams[team][player]["viewmodel"] = settings_current[1].text
                teams[team][player]["cl_bob"]    = settings_current[2].text
                
            except:
                print("failed to get crosshair, viewmodel and cl_bob data for: ", player)
                teams[team][player]["crosshair"] = "?"
                teams[team][player]["viewmodel"] = "?"
                teams[team][player]["cl_bob"]    = "?"

    # --- save the whole dataset to the HDD ---
    driver.minimize_window()
    write_to_log("[+] Finished getting settings, writing data to disk...")
    with open ("raw_dataset.txt", "w") as file:
        file.write(str(teams))

    write_to_log("[+] Dataset written to disk successfully")

def convert_data_to_nut():
    # --- convert the whole dataset to a .nut format ---
    data = eval(open("raw_dataset.txt", "r").read().lower())

    # write the data to the file
    file_writer = open("raw_dataset.nut", "w")
    file_writer.write("// --- Raw Data saved in global table ---\n")
    file_writer.write("teams <- {};\n")
    
    for team in data:
        file_writer.write("teams." + format_text(team) + " <- {};\n")
        
        for player in data[team]:
            file_writer.write("teams." + format_text(team) + "." + format_text(player) + " <- {};\n")
            
            for setting in data[team][player]:
                file_writer.write(
                    "teams." + format_text(team) +\
                    "." + format_text(player) +\
                    "." + format_text(setting) +\
                    ' <- "' + format_text(data[team][player][setting]) + '";\n'
                )
    file_writer.write("\n// --- Functions ---")
    file_writer.write("\nfunction run_command(command_input) {")
    file_writer.write("\n\tSendToConsole(command_input);")
    file_writer.write("\n}")
    file_writer.close()

def format_text(text):
    # dont format if text has 'cl_crosshair' or 'viewmodel' or 'cl_bob'
    if 'cl_crosshair' in text or 'viewmodel' in text or 'cl_bob' in text:
        return text.replace('"', "").replace("'", "").replace("\n","")
    
    invalid_char = "!@#$%^&*()+-=[]{}|/,.<>?'\";:"
    for char in invalid_char:
        text = text.replace(char, "")
        
    text = text.replace(" ", "_").replace("\n", "").replace("\t", "").replace("\\", "")
    text = text.replace("__", "_").replace("___", "_")
    if not text == "":
        if text[0] in "0123456789":
            text = "i" + text[1:]
    
    return text
    


# teams['Coach']["SmithZz"]["mouse"]

# download all player configs from prosettings website
# read the files and extract the crosshair and viewmodel commands
# write all this data in a diconary and save as a .nut file

# performance: program takes approximately 5 mins to scrape all the data
#   17 mins in total

# note: player device is set as 'dev1ce' as key in dataset

#data["G2 Esports"]["kennyS"]["role"]

    # squirrel table format:
    #local myTable = {};               // Create an empty table
    #myTable.firstKey <- "Max Normal"; // Create a slot with the key 'firstKey' and the assigned value
    #myTable.firstKey = 42;            // Assign a new value to 'firstKey'

    # create a new .nut file
    # for team in data
    #   for player in team
    #       for settings in player:
    #           add setting to settings table
    #       add settings to player
    #   add player to team


#teams[team][player]

user = input("Menu:\n1. Get Data\n2. Convert data to .nut\n3. Do both, get data and convert it\n4. Exit\n\n>>> ")
while user not in ["1", "2", "3", "4"]:
    user = input("Invalid input\n>>> ")

if user == "1":
    get_data()

elif user == "2":
    convert_data_to_nut()

elif user == "3":
    get_data()
    convert_data_to_nut()

elif user == "4":
    exit()
