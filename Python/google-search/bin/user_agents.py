import random

# set(list(filter(None, [i.replace("AppleWebKit/","") if "AppleWebKit" in i else None for i in data.split(" ")])))


# Device Info
arch = [32, 64]
webkit_ver = ['534.30', '420+', '537.36', '604.1.38', '537.73',
              '537.36','605.1.15','536.30', '528.5+', '604.1.34',
              '602.1.50', '601.3.9', '531.2+']

browser = {
    "Chrome" : ['60.0.3112.107', '47.0.2526.80', '52.0.2743.116',
                '51.0.2704.79', '62.0.3202.84', '42.0.2311.135',
                '59.0.3071.125', '60.0.3112.116', '31.0.1650.0',
                '58.0.3029.83', '34.0.1847.118', '47.0.2526.111',
                '52.0.2743.98', '55.0.2883.91', '38.0.2125.102',
                '46.0.2486.0', '61.0.3163.98', '47.0.2526.83',
                '51.0.2704.64', '41.99900.2250.0242', '90.0.4430.212'],
    "Safari" : ['601.3.9', '533.2+', '537.3', '605.1', '537.36', '604.1', '602.1', '419.3', '605.1.15', '528.5', '534.30'],
    "Edge" : ['12.10536', '14.14393', '13.10586', '12.246', '13.1058', '15.15254']
}

Linux_device_IDs = ["SM-G960F Build/R16NW", "SM-G892A Build/NRD90M; wv",
                    "SM-G930VC Build/NRD90M; wv", "SM-G935S Build/MMB29K; wv",
                    "SM-G920V Build/MMB29K", "SM-G928X Build/LMY47X",
                    "Nexus 6P Build/MMB29P", "G8231 Build/41.2.A.0.219; wv",
                    "E6653 Build/32.2.A.0.253", "HTC One X10 Build/MRA58K; wv",
                    "HTC One M9 Build/MRA58K"]

os = {
    "Windows NT" : [7.0, 8.0, 8.1, 10.0],
    "Linux; Android" : ["8.0.0", "7.0", "6.0.1", "5.1.1", "6.0.1", "7.1.1", "6.0"],
    "iPhone; CPU iPhone" : ["10_0_1", "11_0", "12_0", "10_0_1"],
    "Mac OS X" : ["10_11_2", "10.10"]
}

iphone_harware_ver = ['15A5341f', '15A5370a', '16A366', '15E148', '14A403', '15A372', '1A543']
iphone_browser_ver = ["12.0", "11.0"]
android_ver = ['4.2.1', '5.1', '7.0', '6.0.1', '5.1.1', '6.0', '4.4.3', '4.2.2', '8.0.0', '5.0.2', '7.1.1']
windows_phone_ver = ["10.0"]
windows_phone_hardware_ver = ["RM-1152", "RM-1127_16056", "Lumia 950"]

tablet_builds = ["Pixel C Build/NRD90M; wv", "SGP771 Build/32.2.A.0.253; wv",
                 "SHIELD Tablet K1 Build/MRA58K; wv", "SM-T827R4 Build/NRD90M",
                 "SAMSUNG SM-T550 Build/LRX22G", "KFTHWI Build/KTU84M",
                 "LG-V410/V41020c Build/LRX22G"]

# Pick random Windows Computer
current_os_name = "Windows NT"
current_os_ver = random.choice(os[current_os_name])
current_arch = random.choice(arch)
current_webkit = random.choice(webkit_ver)
current_chrome_ver = random.choice(browser["Chrome"])
current_safari_ver = random.choice(browser["Safari"])

win_useragent = f"Mozilla/5.0 ({current_os_name} {current_os_ver}; Win{current_arch}; x{current_arch}) " +\
f"AppleWebKit/{current_webkit} (KHTML, like Gecko) Chrome/{current_chrome_ver} Safari/{current_safari_ver}"

# Pick random Linux Phone
current_os_name = "Linux; Android"
current_os_ver = random.choice(os[current_os_name])
current_device_ID = random.choice(Linux_device_IDs)

linux_useragent = f"Mozilla/5.0 ({current_os_name} {current_os_ver}; {current_device_ID}) " +\
f"AppleWebKit/{current_webkit} (KHTML, like Gecko) Chrome/{current_chrome_ver} Mobile Safari/{current_safari_ver}"

# Pick random Iphone
current_os_name = "iPhone; CPU iPhone"
current_os_ver = random.choice(os[current_os_name])
current_hard_ver = random.choice(iphone_harware_ver)
current_browser_ver = random.choice(iphone_browser_ver)

iphone_useragent = f"Mozilla/5.0 ({current_os_name} OS {current_os_ver} like Mac OS X) " +\
f"AppleWebKit/{current_webkit} (KHTML, like Gecko) Version/{current_browser_ver} Mobile/{current_hard_ver} Safari/{current_safari_ver}"

# Pick random Windows Phone
current_os_name = "Windows Phone"
current_android_ver = random.choice(android_ver)
current_win_phone_ver = random.choice(windows_phone_ver)
current_hard_ver = random.choice(windows_phone_hardware_ver)
current_edge_ver = random.choice(browser["Edge"])

windows_phone_useragent = f"Mozilla/5.0 (Windows Phone {current_win_phone_ver}; Android {current_android_ver}; "+\
f"Microsoft; {current_hard_ver}) AppleWebKit/{current_webkit} (KHTML, like Gecko) Chrome/{current_chrome_ver} "+\
f"Mobile Safari/{current_safari_ver} Edge/{current_edge_ver}"

# Pick random Tablet
current_os_name = "Linux; Android"
current_os_ver = random.choice(os[current_os_name])
current_tablet_build = random.choice(tablet_builds)

tablet_useragent = f"Mozilla/5.0 ({current_os_name} {current_os_ver}; {current_tablet_build}) " +\
f"AppleWebKit/{current_webkit} (KHTML, like Gecko) Chrome/{current_chrome_ver} Safari/{current_safari_ver}"
