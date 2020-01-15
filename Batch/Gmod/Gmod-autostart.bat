@ECHO OFF

SET DRIVE_LETTER=D:
SET GMOD_PATH=D:\Steam\steamapps\common\GarrysMod
SET /A TIMEOUT=6
SET /A N=0

%DRIVE_LETTER%
cd %GMOD_PATH%
SET /A TIMEOUT=TIMEOUT+1
echo GMod Launcher:

:main
START hl2.exe -windowed -w 500 -h 500 >nul
PING 0.0.0.0 -n %TIMEOUT% >nul
TASKKILL /F /IM hl2.exe >nul

SET /A N=N+1
if (%n% GEQ 1000) (exit /b)
SET /A TIME_LEFT=((%TIMEOUT%-1) * (1000-%N%))/60
ECHO [+] The game has been launched '%n%/1000' times! %TIME_LEFT% Mins Remaining...
goto main