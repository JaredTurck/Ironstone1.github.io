@echo off

net stop bits
net stop wuauserv
net stop appidsvc
net stop cryptsvc

cls
echo clearing windows update files...
Del "%ALLUSERSPROFILE%\Application Data\Microsoft\Network\Downloader\qmgr*.dat"
Del "%windir%\SoftwareDistribution\*" /S /Q /F
Del "%windir%\System32\catroot2\*" /S /Q /F
Del "%windir%\WindowsUpdate.log" /S /Q /F
rmdir "%windir%\SoftwareDistribution" /S /Q
rmdir "%windir%\System32\catroot2" /S /Q
Ren %systemroot%\SoftwareDistribution SoftwareDistribution.bak
Ren %systemroot%\system32\catroot2 catroot2.bak

sc.exe sdset bits D:(A;;CCLCSWRPWPDTLOCRRC;;;SY)(A;;CCDCLCSWRPWPDTLOCRSDRCWDWO;;;BA)(A;;CCLCSWLOCRRC;;;AU)(A;;CCLCSWRPWPDTLOCRRC;;;PU)
sc.exe sdset wuauserv D:(A;;CCLCSWRPWPDTLOCRRC;;;SY)(A;;CCDCLCSWRPWPDTLOCRSDRCWDWO;;;BA)(A;;CCLCSWLOCRRC;;;AU)(A;;CCLCSWRPWPDTLOCRRC;;;PU)

cls
echo registering dll files...
cd /d %windir%\system32
regsvr32.exe /S atl.dll
regsvr32.exe /S urlmon.dll
regsvr32.exe /S mshtml.dll
regsvr32.exe /S shdocvw.dll
regsvr32.exe /S browseui.dll
regsvr32.exe /S jscript.dll
regsvr32.exe /S vbscript.dll
regsvr32.exe /S scrrun.dll
regsvr32.exe /S msxml.dll
regsvr32.exe /S msxml3.dll
regsvr32.exe /S msxml6.dll
regsvr32.exe /S actxprxy.dll
regsvr32.exe /S softpub.dll
regsvr32.exe /S wintrust.dll
regsvr32.exe /S dssenh.dll
regsvr32.exe /S rsaenh.dll
regsvr32.exe /S gpkcsp.dll
regsvr32.exe /S sccbase.dll
regsvr32.exe /S slbcsp.dll
regsvr32.exe /S cryptdlg.dll
regsvr32.exe /S oleaut32.dll
regsvr32.exe /S ole32.dll
regsvr32.exe /S shell32.dll
regsvr32.exe /S initpki.dll
regsvr32.exe /S wuapi.dll
regsvr32.exe /S wuaueng.dll
regsvr32.exe /S wuaueng1.dll
regsvr32.exe /S wucltui.dll
regsvr32.exe /S wups.dll
regsvr32.exe /S wups2.dll
regsvr32.exe /S wuweb.dll
regsvr32.exe /S qmgr.dll
regsvr32.exe /S qmgrprxy.dll
regsvr32.exe /S wucltux.dll
regsvr32.exe /S muweb.dll
regsvr32.exe /S wuwebv.dll

echo removing registry keys...
REG DELETE "HKLM\SOFTWARE\Microsoft\CurrentVersion\WindowsUpdate" /V AccountDomainSid /F
REG DELETE "HKLM\SOFTWARE\Microsoft\CurrentVersion\WindowsUpdate" /V PingID /F
REG DELETE "HKLM\SOFTWARE\Microsoft\CurrentVersion\WindowsUpdate" /V SusClientId /F

echo resetting proxy...
netsh winsock reset
proxycfg.exe -d
netsh winhttp reset proxy

cls
DISM.exe /Online /Cleanup-image /Restorehealth
takeown /f %windir%\winsxs\pending.xml
Ren c:\windows\winsxs\pending.xml pending.old
bitsadmin.exe /reset /allusers

cls
echo starting system services...
net start bits
net start wuauserv
net start appidsvc
net start cryptsvc

echo checking for updates...
wuauclt.exe /resetauthorization /detectnow /updatenow
wuapp.exe

cls
echo fixing corruption...
echo y | CHKDSK /F
sfc /scannow