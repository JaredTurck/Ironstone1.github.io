from ipwhois import IPWhois
import os

url = input("Enter website URL: ")
domain = url.replace("https://","").replace("http://","").split("/")[0]
ip_list = os.popen("nslookup " + domain).read().split("Addresses:")[1].replace(" ","").replace("\n\n","").split("\n\t")

for ip in ip_list:
    print("\n\n","-"*10, ip, "-"*10)
    current = IPWhois(ip).lookup_whois()
    for key in list(current):
        print(str(key)+": "+str(current[key]))
