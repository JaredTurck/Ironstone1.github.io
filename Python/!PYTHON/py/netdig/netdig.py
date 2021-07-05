import os, platform, re, time
import win32com.shell.shell

class network():
    def __init__(self):
        self.retry_attempts = 3
        self.server = "ping google.com"
        self.re_check_con_windows = r"Reply from ([\da-f:\.]+)"
        self.re_get_nic_windows = r"\n(\w.+[\w()-])"
        self.re_get_mac_addr_windows = r"[ ]+Physical Address[ \.:]+(.+)\n"
        self.platform = platform.system()

    def check_connection(self):
        ''' Check if the device is connected to the internet'''
        for i in range(self.retry_attempts):
            result = os.popen(self.server).read()
            if len(re.compile(self.re_check_con_windows).findall(result)) > 0:
                return True
            
        return False

    def execute_admin_command(self, command):
        ''' Executes a command with admin permissions
        On windows systems you will need to disable UAC
        else windows will ask the user for confirmation everytime'''
        if self.platform == "Windows":
            win32com.shell.shell.ShellExecuteEx(
                lpVerb="runas",
                lpFile="cmd.exe",
                lpParameters="/c "+command)
            

    def fix_connection(self):
        if self.check_connection() == False:
            # Common cause of no internet access is IP conflict
            # so apply this fix first, request new IP and flush DNS cache
            self.execute_admin_command("ipconfig /release")
            self.execute_admin_command("ipconfig /renew")
            self.execute_admin_command("ipconfig /flushdns")
            if self.check_connection() == True:
                return True

            # get a list of Network Interface Card names, and MAC addresses
            ipconfig = os.popen("ipconfig /all").read()
            wmic_get = os.popen("wmic nic get NetConnectionID").read()
            NIC_names = re.compile(self.re_get_nic_windows).findall(wmic_get)
            MAC_addrs = re.compile(self.re_get_mac_addr_windows).findall(ipconfig)

            # Is the network card enabled?
            for NIC in NIC_names:
                print("[+] Trying to enable {} adapter!".format(NIC))
                self.execute_admin_command('netsh interface set interface "{}" enable'.format(NIC))

            time.sleep(10) # It can take up to 10 seconds for the adapter to turn on
            if self.check_connection() == True:
                return True

            # Do you have a physical network card in your computer?
            if len(MAC_addrs) == 0:
                # No MAC address means network card can't be found
                return False

if __name__ == "__main__":
    net = network()
    net.fix_connection()


