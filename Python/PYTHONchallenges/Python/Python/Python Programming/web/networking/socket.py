import socket, os
from selenium import webdriver

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("www.yahoo.com",80))
s.send(b"GET /index.html HTTP/1.0\n\n")
data = s.recv(1000)
s.close()

open("data.html","w").write(data.decode("utf-8"))

file = os.environ["CHROME_DRIVER"]
driver = webdriver.Chrome(file)
driver.get("google.co.uk")
