from urllib import request

url = input("Full URL of file: ")
name = url.split("/")[-1]

request.urlretrieve(url, name)
