import requests, json, os
import datetime

class google_search():
    def __init__(self):
        self.user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:38.0) Gecko/20100101 Firefox/38.0"
        self.url = "https://www.google.co.uk"
        self.domain = ".google.co.uk"
        self.output_filename = "output.html"
        self.write_2_file = False
        self.return_content = True

    def search(self, query):
        # generate header
        self.head =  {
            "User-Agent": self.user_agent,
        }

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
        self.res = requests.get(f"{self.url}/search?q={query}", headers=self.head, cookies=self.cookie)
        html = self.res.content

        # write to file
        if self.write_2_file == True:
            with open(self.output_filename, "wb") as file:
                file.write(html)
                
        elif self.return_content == True:
            return html


#set-cookie: 1P_JAR=2021-05-21-03; expires=Sun, 20-Jun-2021 03:25:26 GMT; path=/; domain=.google.co.uk; Secure; SameSite=none
#set-cookie: CONSENT=YES+cb.20210518-05-p0.en+FX+949; Domain=.google.co.uk; Expires=Sun, 10-Jan-2038 07:59:59 GMT; Path=/; Secure; SameSite=none
