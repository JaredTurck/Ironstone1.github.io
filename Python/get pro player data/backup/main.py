from selenium import webdriver
import time, os



class ProData():
    def __init__(self):
        self.data = {}
        self.url = "https://prosettings.net/cs-go-pro-settings-gear-list/"
        self.driver = webdriver.Chrome("chromedriver.exe")
        self.filters = [
            " team_column column-team",
            "  column-player",
            "  column-role",
            "  column-mouse",
            " numdata integer  column-hz",
            " numdata integer  column-dpi",
            " numdata float  column-sensitivity",
            " numdata integer  column-edpi",
            " numdata float  column-zoomsens",
            " numdata integer  column-mouseaccel",
            " numdata integer  column-windowssens",
            " numdata integer  column-rawinput",
            "  column-monitor",
            " numdata integer  column-hz_1",
            "  column-gpu",
            "  column-resolution",
            "  column-aspectratio",
            "  column-scalingmode",
            "  column-mousepad",
            "  column-keyboard",
            "  column-headset",
            "  column-cfgcrosshair"
        ]
        self.filter_name_and_team = [
            " team_column column-team",
            "  column-player",
        ]

    def get_data(self):
        self.wait_for_page_load()
        self.rows = self.driver.find_elements_by_xpath('//table[@id="table_1"]//tbody//tr[@role="row"]')
        self.no_players = len(self.rows)
        filters=self.filters
        
        for player in range(self.no_players):
            start_time = time.time()

            # gets and appends the current player's data to a list
            self.current = []
            for i in range(len(self.filters)):
                current_stat = self.rows[player].find_elements_by_xpath('//td[@class="'+self.filters[i]+'"]')[player].text
                if current_stat == "":
                    self.current.append("#")
                else:
                    self.current.append(current_stat)

            # writes data to var data
            if str(self.current[0]) not in self.data.keys():
                self.data[str(self.current[0])] = {}

            self.data[str(self.current[0])][str(self.current[1])] = self.current

            time_left = str(round((lambda x : ((x*self.no_players)-(x*player))/60 )(time.time()-start_time), 1))
            percnt = "["+str(player+1)+"/"+str(self.no_players)+"] "+str(round(((player+1)/self.no_players)*100, 2))+"% complete!"
            print("[+] Added player "+self.current[0]+" "+self.current[1]+" to database! "+time_left+" mins left! "+percnt)
            

    def wait_for_page_load(self):
        self.driver.maximize_window()
        self.driver.get(self.url)
        self.rows = self.driver.find_elements_by_xpath('//table[@id="table_1"]//tbody//tr[@role="row"]')
        while len(self.rows) == 0:
            try:
                self.rows = self.driver.find_elements_by_xpath('//table[@id="table_1"]//tbody//tr[@role="row"]')
                
            except Exception as error:
                time.sleep(2)
                print(error)

    def write_to_csv(self):
        self.file_number = str(len([f for f in os.listdir() if f.endswith(".py")]))
        
        file = open("data_"+self.file_number+".csv", "wb")
        for team in self.data.keys():
            for player in self.data[team].keys():
                file.write(",".join(self.data[team][player]).encode("utf-8")+b"\n")
                
        file.close()

    def get_profile_url(self):
        self.wait_for_page_load()
        self.rows = self.driver.find_elements_by_xpath('//table[@id="table_1"]//tbody//tr[@role="row"]')
        self.data = {}

        for player in range(len(self.rows)):
            elm = self.rows[player].find_elements_by_xpath('//td[@class="  column-player"]')[player]
            team = self.rows[player].find_elements_by_xpath('//td[@class=" team_column column-team"]')[player].text
            name = elm.text
            
            try:
                prosettings_url = elm.get_attribute("innerHTML").split('<a href="')[1].split('"')[0]
                
                if team not in self.data.keys():
                    self.data[team] = {}
                self.data[team][name] = [team, name, prosettings_url]
                print("[+] Added "+team+" "+name+" to database!")

            except:
                print("[-] Failed to add player "+team+" "+name+" to database!")

    def get_steam_profile_url(self):
        self.get_profile_url()

        for team in self.data.keys():
            print("\n"+team)
            for player in self.data[team]:
                self.driver.get(self.data[team][player][2])

                try:
                    elm = self.driver.find_element_by_xpath('//div[@class="x-promo-content"]//a[contains(@href, "//steamcommunity.com/")]')
                    steam_url = elm.get_attribute("outerHTML").split('href="')[1].split('"')[0]
                    self.data[team][player].append(steam_url)
                    print(player+": "+steam_url)
                    
                except:
                    print(player+": ???")
        
a = ProData()
a.get_steam_profile_url()

#a.get_data()
#a.write_to_csv()

# improvments:
# - could write data to csv after every player, rather then at the end


