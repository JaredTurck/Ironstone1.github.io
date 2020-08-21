@echo off

set No_bots=200
set /a count=0

echo press anykey to start...
pause >nul

:add_bot
timeout 2
set /a count+=1
start add_bot.py

if %count% leq %No_bots% (
	goto add_bot
) else (
	goto end
)

:end

echo all bots added...
echo press any key to exit, and terminate all bots
pause >nul
taskkill /f /im python.exe
taskkill /f /im py.exe
taskkill /f /im cmd.exe
taskkill /f /im chrome.exe

