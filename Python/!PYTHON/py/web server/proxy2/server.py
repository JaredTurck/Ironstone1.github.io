import socket, datetime
from urllib.parse import unquote
import requests, json, os

class server():
    def __init__(self):
        self.host_ip = socket.gethostbyname(socket.gethostname())
        self.host_port = 80
        self.s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.data_recv_size = 1024

    def get_data(self, conn):
        """ gets the data from client """
        data = b""
        while b"\r\n\r\n" not in data:
            data += conn.recv(self.data_recv_size)
        return data

    def print_request(self, request):
        """ prints the contents of a request """
        print()
        for i in request.keys():
            print(i, "\t", str(request[i]))

    def format_request(self, conn, do_print=False):
        """ formats the HTTP request into dict """
        request_raw = self.get_data(conn)

        # generate dict of data
        request = {}
        request[b"type"] = []
        get_part = True
        for instruction in request_raw.split(b'\r\n'):
            temp = instruction.split(b': ')
            if len(temp) == 2:
                request[temp[0]] = temp[1]
            else:
                if get_part == True:
                    parts = temp[0].split(b' ') + [None, None, None]
                    request[b"header"] = temp[0]
                    request[b"type"] = parts[0]
                    request[b"file_name"] = parts[1]
                    request[b"HTTP_version"] = parts[2]
                    get_part = False
                
        if do_print == True:
            self.print_request(request)
            
        return request
        
    def connection_handler(self, conn, addr):
        """ accepts multiple requests from client and passes them to request handler """
        with conn:
            request = self.format_request(conn)
            http_s = http()
            http_s.serve(conn, request, addr)

    def server(self):
        """ main method starts the server """
        print(f"[+] Server started listening on port {self.host_port}!")
        print(f"[+] Server Ip: {self.host_ip}")
        self.s.bind((self.host_ip, self.host_port))
        self.s.listen()

        while True:
            conn, addr = self.s.accept()
            self.connection_handler(conn, addr)

class http():
    def __init__(self):
        self.current_domain = b"www.google.co.uk"
        self.redirect_domain = b"172.21.0.1"
    
    def GET(self, conn, request, addr, custom_404=True):
        # check if index was requested
        if request[b"file_name"] == b"/":
            filename = "/index.html"
        else:
            filename = request[b"file_name"]
            ext = filename.split(b'/')[-1]
            if ext == b"":
                filename += b"index.html"
            elif b"." not in ext:
                filename += b"/index.html"

        # check if file exists
        try:
            path = unquote(filename[1:]).replace('//', '/')
            #file_to_sent = open(path, "rb").read()

            #check for domain
            temp_domain = path.split('/')[0].encode('UTF-8')
            if b'.' in temp_domain:
                self.current_domain = temp_domain
                print(b"[+] Changed domain! "+temp_domain+b"!")

            # proxy download html
            url = f"http://{path}"
            print(url)
            proxy_html = download_html(url)

            # replace all links with proxy
            proxy_html = proxy_html.replace(b'href="https://', b'href="http://'+self.current_domain+b'/')
            proxy_html = proxy_html.replace(b'src="https://', b'src="https://'+self.current_domain+b'/')
            proxy_html = proxy_html.replace(b'href="', b'href="http://'+self.redirect_domain+b'/'+self.current_domain+b'/')
            proxy_html = proxy_html.replace(b'src="', b'src="http://'+self.redirect_domain+b'/'+self.current_domain+b'/')

            # send the html
            conn.sendall(proxy_html)
            print(f"[+] Sent file '{filename}' to {addr[0]}!")
        
        except FileNotFoundError:
            # send 404
            print(f"[-] 404 not found {filename} sent to {addr[0]}!")
            if custom_404 == True:
                conn.sendall(open('404.html', 'rb').read())
            else:
                conn.sendall(b"<html>404 webpage not found '"+bytes(filename)+b"' !</html>")
    
    def POST(self, conn, request, addr):
        pass

    def serve(self, conn, request, addr):
        if request[b"type"] == b"GET":
            http.GET(self, conn, request, addr)

def download_html(url):
    user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:38.0) Gecko/20100101 Firefox/38.0"

    head =  {
        "User-Agent": user_agent,
    }

    try:
        req = requests.get(url, headers=head)
        html = req.content
        print(req.status_code)
        return html
    except:
        print("[-] Error failed to fetch page!")
        return b"<html>404</html>"

s = server()
s.server()
