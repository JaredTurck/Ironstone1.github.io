import requests, datetime, random

class useragent():  
    def rand_browser(self):
        self.arch = [32, 64]
        self.webkit_ver = ['534.30', '420+', '537.36', '604.1.38', '537.73',
                      '537.36','605.1.15','536.30', '528.5+', '604.1.34',
                      '602.1.50', '601.3.9', '531.2+']

        self.browser = {
            "Chrome" : ['60.0.3112.107', '47.0.2526.80', '52.0.2743.116',
                        '51.0.2704.79', '62.0.3202.84', '42.0.2311.135',
                        '59.0.3071.125', '60.0.3112.116', '31.0.1650.0',
                        '58.0.3029.83', '34.0.1847.118', '47.0.2526.111',
                        '52.0.2743.98', '55.0.2883.91', '38.0.2125.102',
                        '46.0.2486.0', '61.0.3163.98', '47.0.2526.83',
                        '51.0.2704.64', '41.99900.2250.0242', '90.0.4430.212'],
            "Safari" : ['601.3.9', '533.2+', '537.3', '605.1', '537.36', '604.1', '602.1',
                        '419.3', '605.1.15','528.5', '534.30'],
            "Edge" : ['12.10536', '14.14393', '13.10586', '12.246', '13.1058', '15.15254']
        }

        self.Linux_device_IDs = ["SM-G960F Build/R16NW", "SM-G892A Build/NRD90M; wv",
                            "SM-G930VC Build/NRD90M; wv", "SM-G935S Build/MMB29K; wv",
                            "SM-G920V Build/MMB29K", "SM-G928X Build/LMY47X",
                            "Nexus 6P Build/MMB29P", "G8231 Build/41.2.A.0.219; wv",
                            "E6653 Build/32.2.A.0.253", "HTC One X10 Build/MRA58K; wv",
                            "HTC One M9 Build/MRA58K"]

        self.os = {
            "Windows NT" : [7.0, 8.0, 8.1, 10.0],
            "Linux; Android" : ["8.0.0", "7.0", "6.0.1", "5.1.1", "6.0.1", "7.1.1", "6.0"],
            "iPhone; CPU iPhone" : ["10_0_1", "11_0", "12_0", "10_0_1"],
            "Mac OS X" : ["10_11_2", "10.10"]
        }

        self.iphone_harware_ver = ['15A5341f', '15A5370a', '16A366', '15E148', '14A403', '15A372', '1A543']
        self.iphone_browser_ver = ["12.0", "11.0"]
        self.android_ver = ['4.2.1', '5.1', '7.0', '6.0.1', '5.1.1', '6.0', '4.4.3', '4.2.2', '8.0.0', '5.0.2', '7.1.1']
        self.windows_phone_ver = ["10.0"]
        self.windows_phone_hardware_ver = ["RM-1152", "RM-1127_16056", "Lumia 950"]

        self.tablet_builds = ["Pixel C Build/NRD90M; wv", "SGP771 Build/32.2.A.0.253; wv",
                         "SHIELD Tablet K1 Build/MRA58K; wv", "SM-T827R4 Build/NRD90M",
                         "SAMSUNG SM-T550 Build/LRX22G", "KFTHWI Build/KTU84M",
                         "LG-V410/V41020c Build/LRX22G"]

        # Browser
        self.current_webkit = random.choice(self.webkit_ver)
        self.current_chrome_ver = random.choice(self.browser["Chrome"])
        self.current_safari_ver = random.choice(self.browser["Safari"])

        # Windows
        self.windows_os_ver = random.choice(self.os["Windows NT"])
        self.windows_arch = random.choice(self.arch)

        # Linux
        self.linux_phone_os_ver = random.choice(self.os["Linux; Android"])
        self.linux_phone_device_ID = random.choice(self.Linux_device_IDs)

        # Iphone
        self.iphone_os_ver = random.choice(self.os["iPhone; CPU iPhone"])
        self.iphone_hard_ver = random.choice(self.iphone_harware_ver)
        self.iphone_browser_ver = random.choice(self.iphone_browser_ver)

        # Windows Phone
        self.win_phone_android_ver = random.choice(self.android_ver)
        self.win_phone_ver = random.choice(self.windows_phone_ver)
        self.win_phone_hard_ver = random.choice(self.windows_phone_hardware_ver)
        self.win_phone__edge_ver = random.choice(self.browser["Edge"])

        # Tablet
        self.tablet_os_ver = random.choice(self.os["Linux; Android"])
        self.tablet_build = random.choice(self.tablet_builds)
    
    def windows_useragent(self):
        # Pick random Windows Computer
        self.rand_browser()
        self.useragent = f"Mozilla/5.0 (Windows NT {self.windows_os_ver}; Win{self.windows_arch}; " +\
        f"x{self.windows_arch}) AppleWebKit/{self.current_webkit} (KHTML, like Gecko) Chrome/" +\
        f"{self.current_chrome_ver} Safari/{self.current_safari_ver}"

    def linux_phone_useragent(self):
        # Pick random Linux Phone
        self.rand_browser()
        self.useragent = f"Mozilla/5.0 (Linux; Android {self.linux_phone_os_ver}; {self.linux_phone_device_ID}) " +\
        f"AppleWebKit/{self.current_webkit} (KHTML, like Gecko) Chrome/{self.current_chrome_ver} Mobile Safari/" +\
        f"{self.current_safari_ver}"

    def iphone_useragent(self):
        # Pick random Iphone
        self.rand_browser()
        self.useragent = f"Mozilla/5.0 (iPhone; CPU iPhone OS {self.iphone_os_ver} like Mac OS X) " +\
        f"AppleWebKit/{self.current_webkit} (KHTML, like Gecko) Version/{self.iphone_browser_ver} " +\
        f"Mobile/{self.iphone_hard_ver} Safari/{self.current_safari_ver}"

    def windows_phone_useragent(self):
        # Pick random Windows Phone
        self.rand_browser()
        self.useragent = f"Mozilla/5.0 (Windows Phone {self.win_phone_ver}; Android {self.win_phone_android_ver}; "+\
        f"Microsoft; {self.win_phone_hard_ver}) AppleWebKit/{self.current_webkit} (KHTML, like Gecko) Chrome/" +\
        f"{self.current_chrome_ver} Mobile Safari/{self.current_safari_ver} Edge/{self.win_phone__edge_ver}"

    def pick_tablet_useragent(self):
        # Pick random Tablet
        self.rand_browser()
        self.useragent = f"Mozilla/5.0 (Linux; Android {self.tablet_os_ver}; {self.tablet_build}) " +\
        f"AppleWebKit/{self.current_webkit} (KHTML, like Gecko) Chrome/{self.current_chrome_ver} Safari/" +\
        f"{self.current_safari_ver}"

    def get_useragent(self):
        # picks a random useragent method
        random.choice([
            self.windows_useragent,
            self.linux_phone_useragent,
            self.iphone_useragent,
            self.windows_phone_useragent,
            self.pick_tablet_useragent,
        ])()

class google_search():
    def __init__(self):
        self.user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:38.0) Gecko/20100101 Firefox/38.0"
        self.url = "https://www.google.co.uk/search?q="
        self.domain = ".google.co.uk"
        self.output_filename = "output.html"
        self.return_content = False
        self.agent = useragent()

    def search(self, query):
        # generate header
        self.agent.get_useragent()
        self.head =  {
            "User-Agent": self.agent.useragent,
            "Host" : self.url.split("https://")[1].split("/")[0],
            "Connection" : "keep-alive",
            "Pragma" : "no-cache", # Don't cache
            "Cache-Control" : "no-cache",
            "DNT" : "1", # Do Not Track header
            "Accept" : "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            "Referer" : "https://" + self.url.split("https://")[1].split("/")[0],
            "Accept-Encoding" : "gzip, deflate",
            "Accept-Language" : "en-GB,en-US;q=0.9,en;q=0.8,ru;q=0.7",
        }

        print(self.head)

        # generate cookies
        self.current_date = datetime.datetime.now()
        self.todays_date = self.current_date.strftime("%Y-%m-%d-%S")
        self.date_in_month = datetime.datetime(
            self.current_date.year,
            self.current_date.month+1,
            self.current_date.day-1,
            self.current_date.hour,
            self.current_date.minute,
            self.current_date.second
        ).strftime("%a, %d-%b-%Y %H:%M:%S")
        
        self.expiry_date = f"expires={self.date_in_month} GMT"
        self.consent_cookie_fname = "YES+cb.{self.current_date.strftime('%Y%m%d-%m-p0')}.en+FX+949"
        self.cookie = {
            "1P_JAR" : f"={self.todays_date}; {self.expiry_date}; path=/; domain={self.domain}; Secure; SameSite=none",
            "CONSENT" : f"{self.consent_cookie_fname}; Domain={self.domain}; {self.expiry_date}; Path=/; Secure; SameSite=none"
        }

        # send request
        self.s = requests.Session()
        self.res = requests.get(f"{self.url}{query}", headers=self.head, cookies=self.cookie)
        self.html = self.res.content

        # return  
        if self.return_content == True:
            return self.html

    def write_2_file(self, fname=""):
        if fname == "":
            fname = self.output_filename
        with open(self.output_filename, "wb") as file:
            file.write(self.html)


#set-cookie: 1P_JAR=2021-05-21-03; expires=Sun, 20-Jun-2021 03:25:26 GMT; path=/; domain=.google.co.uk; Secure; SameSite=none
#set-cookie: CONSENT=YES+cb.20210518-05-p0.en+FX+949; Domain=.google.co.uk; Expires=Sun, 10-Jan-2038 07:59:59 GMT; Path=/; Secure; SameSite=none
