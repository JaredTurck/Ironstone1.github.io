import os, threading

computers = []
threads = []

def process(network, i, args):
    current = os.popen("ping "+network+str(i)+" "+args).read()
    IP = network + str(i)
    if "Request timed out" not in current:
        if IP not in computers:
            computers.append(IP)
            print("[+] Device " + IP + " is online!")

def scan_network(network, args="-w 1 -n 1"):
    # scan network
    print("This could take up to 4 mins!")
    for i in range(255):
        current = threading.Thread(target=process, args=[network, i, args])
        current.start()
        threads.append(current)

    # wait for threads to finish
    for p in threads:
        p.join()

    # nslookup
    for node in computers:
        current_info = os.popen("nslookup " + node).read()
        print(current_info.split("\n\n")[1])

menu = input("Menu:\n1. Scan network 192.168.1\n2. Enter custom network\n> ")
while menu not in ["1", "2"]:
    menu = input("Invalid Input!\n> ")

if menu == "1":
    scan_network("192.168.1.")
    
elif menu == "2":
    network_name = input("enter network")
    while not [i.isdigit() for i in network_name.split(".")] == [True, True, True]:
        network_name = input("Invalid Adress please enter in format 000.000.000\n> ")
    scan_network(network_name+".")

input("\nPress enter to exit...")
