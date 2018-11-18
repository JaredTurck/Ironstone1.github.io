import os, time

SAM_dir = "D:\Desktop\computing\Steam\SAM\SteamAchievementManager-7.0.11"
SAM_exe = "SAM.Game.exe"

AppIDs = open("appid.txt").read().split("\n")[1097:-1]

for i in range(len(AppIDs)):
    os.popen(SAM_dir + "\\" + SAM_exe + " " + AppIDs[i])
    print(i)

    tasklist = os.popen('tasklist /fi "imagename eq ' + SAM_exe + '"').read()
    while ((SAM_exe in tasklist) == True):
        tasklist = os.popen('tasklist /fi "imagename eq ' + SAM_exe + '"').read()
        time.sleep(0.2)

#'tasklist /fi "imagename eq ' + SAM_exe + '"'
#SAM_exe in os.popen('tasklist /fi "imagename eq ' + SAM_exe + '"').read()
