@echo off

:menu
cls
echo Menu: && echo 1. Enable network interfaces
echo 2. Disable network interfaces && echo 3. exit
set /p user="> "

if %user% == 1 (goto enable)
if %user% == 2 (goto disable)
if %user% == 3 (goto end)
goto menu

:enable
netsh interface set interface "WiFi" enabled
netsh interface set interface "Local Area Connection" enabled
netsh interface set interface "Ethernet" enabled

netsh advfirewall set allprofiles state on
netsh advfirewall reset
netsh winsock reset
netsh int ip reset
ping google.com

ipconfig /release
ipconfig /renew
ipconfig /flushdns
ping google.com
start www.google.com
goto end

:disable
netsh interface set interface "WiFi" disable
netsh interface set interface "Local Area Connection" disable
netsh interface set interface "Ethernet" disable
goto end

:end