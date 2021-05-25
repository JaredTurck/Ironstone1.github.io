import requests, json, sys, time, gc, os
from threading import Thread

class crawler():
    def __init__(self):
        self.url = b"https://jaredbot.uk/"
        self.user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:38.0) Gecko/20100101 Firefox/38.0"
        self.domains = []
        self.completed = {}
        self.processing = [''] * num_threadings
        self.write_queue = []
        self.count = 0
        self.count_update = 500
        self.write_timeout = 60
        self.db_writer_timeout = 10
        self.print_index = 10
        self.head =  {
            "User-Agent": self.user_agent,
        }
        self.html = b""
        self.database_filename = "domains.txt"
        self.counts_filename = "counts.txt"
        self.encoding = "ISO-8859-1"
        
    def get_domain(self, current_url):
        try:
            return current_url.split(b'://')[1].split(b'/')[0].split(b"?")[0]
        except:
            return b""

    def get_hrefs(self, html):
        try:
            href_count = html.count(b'href=')
            for i in range(href_count):
                start = html.find(b'href=')
                if start > -1:
                    current_url = html.replace(b"'", b'"').split(b'href="')[1].split(b'"')[0].split(b"'")[0]
                    html = html[start + len(current_url)+2:]

                    if current_url.find(b'https://') > -1 or current_url.find(b'http://') > -1:
                        formatted_url = self.get_domain(current_url)
                        if len(formatted_url) > 0 and formatted_url.find(b'.') > -1:
                            if formatted_url not in self.domains:
                                self.domains.append(b"https://" + formatted_url)
                                
        except Exception as error: pass
                            
    def get_html(self, url):
        try:
            req = requests.get(url, headers=self.head, timeout=5)
            html = req.content
            return html
        except:
            return b""

    def get_title(self):
        try:
            return self.html.split(b'<title')[1].split(b'>')[1].split(b'</')[0].replace(b'\n',b'<br>')
        except:
            return b""

    def crawl(self, task):
        # get hrefs
        self.get_hrefs(self.get_html(self.url))
        for current_url in self.domains:
            if current_url not in self.processing:
                self.processing[task] = current_url
                try:
                    if current_url not in self.completed:
                        self.html = self.get_html(current_url)
                        self.get_hrefs(self.html)
                        self.completed[current_url] = 1;
                        title = self.get_title()

                        # add data to write queue
                        self.write_queue.append(current_url + b"," + title + b"\n")
                        
                    else:
                        if current_url in self.completed:
                            self.completed[current_url] += 1
                        
                except:
                    print("[-] Error thrown in crawler!")
                    
                finally:
                    try:
                        del self.domains[self.domains.index(current_url)]
                    except: pass
                    finally:
                        self.count += 1

    def get_site(self):
        self.get_hrefs(self.get_html(self.url))

    def write_html(self):
        with open('output.html', 'wb') as output:
            output.write(self.html)

    def write_counts(self):
        while True:
            try:
                time.sleep(self.write_timeout)
                counts = open(self.counts_filename, "wb")
                print("[+] Writing counts to file!")
                temp_counts = self.completed
                for key in temp_counts:
                    counts.write(key + b"," + str(self.completed[key]).encode('utf-8') + b"\n")
                counts.close()
                temp_counts = None
                gc.collect()
                print("[+] Finished writing counts!")
            except:
                print("[-] Failed to write counts")
                counts.close()

    def tick(self):
        print("[+] Tick thread started!")
        while True:
            n = self.count
            time.sleep(self.print_index)
            print("[+] Indexed per", self.print_index, "seconds = " + str(self.count - n))
            sys.stdout.flush()

    def database_writer(self):
        print('[+] Database writer thread started!')
        while True:
            time.sleep(self.db_writer_timeout)
            file = open(self.database_filename, "ab")
            for line in self.write_queue:
                file.write(line)
            file.close()
            self.write_queue = []
            gc.collect()

    def load_db(self):
        # check if file exists
        if os.path.isfile(self.database_filename) == True:
            # loads database
            print("[+] Loading database")
            for line in open(self.counts_filename, "r", encoding=self.encoding).read().split('\n'):
                current_line = line.split(',')
                if len(current_line) == 2:
                    if current_line[0][0:8] == "https://":
                        if current_line[1].isdigit() == True:
                            self.completed[current_line[0]] = int(current_line[1])
            print("[+] Finished loading database")
            
        else:
            print('[-] Failed to load database counts')

if __name__ == '__main__':
    num_threadings = 128
    web = crawler();
    web.load_db()
    print("Started indexing on", num_threadings, "threads!")
    for i in range(num_threadings):
        Thread(target = web.crawl, args=[i]).start()
    Thread(target = web.write_counts).start()
    Thread(target = web.tick).start()
    Thread(target = web.database_writer).start()
