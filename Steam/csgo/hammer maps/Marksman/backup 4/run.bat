@echo off

REM change the "set drive=" command to the drive letter that your Steam folder is on.
REM for exmaple "set drive=C:" or "set drive=D:" if you have a C or D drive etc.
REM make sure you dont put any extra spaces in, or back/forward slashes.
REM only change the drive letter!
set drive=D:

REM change the "CSGO_root=" command to the path of your "csgo" folder
REM make sure there is no \ or / at the end of the file path.
set CSGO_root=D:\Steam\steamapps\common\Counter-Strike Global Offensive
set CSGO_Dir=%CSGO_root%\csgo

REM <--- init var --->
set Workshop_folder=maps\workshop\126484317
set timeout_between_maps=5
set timeout_CSGO_launch=15
set /a map_index=0

REM <--- Check if batch file in correct directory --->
echo %0|find "%CSGO_Dir%" >nul
if errorlevel 1 (
	echo Please move this batch file to your "%CSGO_Dir%" folder
	echo Press any key to exit...
	pause >nul
	exit /b
) else (
	echo Batch in correct dir!
)

REM <--- main --->
echo -------------------------
echo CSGO Marksman Achievement
echo -------------------------
echo .

REM init map names
set map[0]=de_shorttrain.bsp
set map[1]=de_shortdust.bsp
set map[2]=de_bank.bsp
set map[3]=de_sugarcane.bsp
set map[4]=de_safehouse.bsp
set map[5]=de_stmarc.bsp
set map[6]=de_lake.bsp
set map[7]=ar_shoots.bsp
set map[8]=ar_monastery.bsp
set map[9]=ar_dizzy.bsp
set map[10]=ar_baggage.bsp

REM make sure there is only 1 BSP file
:no_files_test
%drive%
cd %CSGO_Dir%
cd %Workshop_folder%
	
set /a fcount=0
for /f "tokens=* delims= " %%a in ('dir /s /b /a-d "*.bsp"') do (
	set /a fcount+=1
)
if not %fcount%==1 (
	echo [-] Please make sure there is only 1 BSP file in the workshop folder!
	echo [-] delete any other files
	start %windir%\explorer.exe "%CSGO_Dir%\%Workshop_folder%"
	echo then press any key to continue...
	pause >nul
	goto no_files_test
) else (
	rem 1 BSP file found!
	goto end
)
:end

REM rename, copy and start
:rename_file
%drive%
cd %CSGO_Dir%
cd %Workshop_folder%
for /f "tokens=* delims= " %%a in ('dir /b *.bsp /a-d') do (set BSP_current=%%a)
for /f "tokens=* delims= " %%a in ('call echo %%map[%map_index%]%%') do (set map_name=%%a)

rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" %map_name% >nul
copy /b /v /y "%CSGO_Dir%\%Workshop_folder%\%map_name%" "%CSGO_Dir%\maps" >nul
start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\maps\%map_name%" >nul
echo [+] Loading map: %map_name%

set /a map_index+=1
:end2

echo [+] Waiting for CSGO to start...
timeout %timeout_CSGO_launch% >nul
REM Check if CSGO is running
:loop
tasklist /FI "IMAGENAME eq csgo.exe" 2>nul | find /I /N "csgo.exe" >nul
if errorlevel 1 (
	echo Please start CSGO! Waiting for program to start!
	start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\maps\%map_name%"
	timeout %timeout_CSGO_launch% >nul
	goto loop
	
) else (
	echo [+] CSGO is running!
	goto end3
)
:end3

REM check if CSGO has stopped running
tasklist /FI "IMAGENAME eq csgo.exe" 2>nul | find /I /N "csgo.exe" >nul
if errorlevel 1 (
	REM CSGO has stopped running!
	goto end4
) else (
	REM CSGO is still running!
	timeout %timeout_between_maps% >nul
	goto end3
)
:end4
REM goto next map
goto no_files_test

REM verify integrity of game files once done
echo.
echo [+] Check to see if you have the achievement!
echo.
echo Please also make sure to verify the integrity of your game files!
echo Right click on CSGO in your steam library, then go to Properties --> Local Files --> Verify Integrity of Game Files
echo .
echo Thank you for using my script, press any key to exit...
pause >nul
exit