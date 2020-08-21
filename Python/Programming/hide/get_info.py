import platform, os, sys, socket

# sys ver

def CMD():
    os.system("ping google.com > " + os.getcwd() + "\\files\\ping.txt")
    os.system("ipconfig /all > " + os.getcwd() + "\\files\\ipconfig.txt")
    os.system("netstat > " + os.getcwd() + "\\files\\netstat.txt")
    os.system("route PRINT > " + os.getcwd() + "\\files\\tracet.txt")
    os.system("tracert -h 20 google.com > " + os.getcwd() + "\\files\\tracet.txt")
    os.system("getmac > " + os.getcwd() + "\\files\\getmac.txt")

def ports():
    socket.setdefaulttimeout(0.02)
    ports = []
    router = "192.168.1.254"

    for i in range(5000):
        sock = socket.socket()
        if sock.connect_ex((router,i)) == 0:
            ports.append("port %s:%d is open!" % (router, i))

# write
f = open("data.txt","w")
f.write("--- SYSTEM ---")
f.write("system: " + platform.system())
f.write("node: " + platform.node())
f.write("release: " + platform.release())
f.write("version: " + platform.version())
f.write("processor: " + platform.processor())
f.write("platform: " + platform.platform())
f.write("")
f.write("--- PYTHON ---")
f.write("python branch: " + platform.python_branch())
f.write("python build: " + platform.python_build())
f.write("python compiler: " + platform.python_compiler())
f.write("python implementation: " + platform.python_implementation())
f.write("python revision: " + platform.python_revision())
f.write("python version: " + platform.python_version())
f.write("")
f.write("linux distribution: " + platform.linux_distribution())
f.write("mac ver: " + platform.mac_ver())
f.write("win32 version: " + platform.win32_ver())
f.write("NO. CPU cores: " + os.cpu_count())

major, minor, build, platform, SP = sys.getwindowsversion()

