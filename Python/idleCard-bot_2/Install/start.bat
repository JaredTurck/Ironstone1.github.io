@echo off

:main
start steam-idle.exe 599090
timeout 10
taskkill /im steam-idle.exe
timeout 5
goto main