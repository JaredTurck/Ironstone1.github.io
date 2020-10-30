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
set timeout_between_maps=120
set timeout_CSGO_launch=30
set /a map_index=1

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

REM <--- Check if CSGO is running -->
:loop
tasklist /FI "IMAGENAME eq csgo.exe" 2>nul | find /I /N "csgo.exe" >nul
if errorlevel 1 (
	echo Please start CSGO! Waiting for program to start!
	REM Start CSGO
	cd %CSGO_Dir%
	cd..
	start csgo.exe
	timeout %timeout_CSGO_launch%
	goto loop
	
) else (
	echo CSGO is running!
	goto end
)
:end

REM <--- main --->
echo -------------------------
echo CSGO Marksman Achievement
echo -------------------------
echo .

set maps=de_shorttrain de_shortdust de_bank de_sugarcane de_safehouse de_stmarc de_lake ar_shoots ar_monastery ar_dizzy ar_baggage

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
	echo Please make sure there is only 1 BSP file in the workshop folder!
	echo delete any other files
	start %windir%\explorer.exe "%CSGO_Dir%\%Workshop_folder%"
	echo then press any key to continue...
	pause >nul
	goto no_files_test
) else (
	echo 1 BSP file found!
	goto end2
)
:end2

REM rename map file and start CSGO
:rename_file
%drive%
cd %CSGO_Dir%
cd %Workshop_folder%
for /f "tokens=* delims= " %%a in ('dir /b *.bsp /a-d') do (set BSP_current=%%a)

if (%map_index%==1) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" de_shorttrain.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\de_shorttrain.bsp"
		goto end3
)
if (%map_index%==2) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" de_shortdust.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\de_shortdust.bsp"
		goto end3
)
if (%map_index%==3) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" de_bank.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\de_bank.bsp"
		goto end3
)
if (%map_index%==4) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" de_sugarcane.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\de_sugarcane.bsp"
		goto end3
)
if (%map_index%==5) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" de_safehouse.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\de_safehouse.bsp"
		goto end3
)
if (%map_index%==6) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" de_stmarc.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\de_stmarc.bsp"
		goto end3
)
if (%map_index%==7) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" de_lake.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\de_lake.bsp"
		goto end3
)
if (%map_index%==8) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" ar_shoots.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\ar_shoots.bsp"
		goto end3
)
if (%map_index%==9) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" ar_monastery.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\ar_monastery.bsp"
		goto end3
)
if (%map_index%==10) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" ar_dizzy.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\ar_dizzy.bsp"
		goto end3
)
if (%map_index%==11) do (
        rename "%CSGO_Dir%\%Workshop_folder%\%BSP_current%" ar_baggage.bsp
		start "%CSGO_root%\csgo.exe" "%CSGO_Dir%\%Workshop_folder%\ar_baggage.bsp"
		goto end3
)

:end3
set /a map_index+=1

REM wait x seconds, then load next map
timeout %timeout_between_maps%
REM goto next map
goto no_files_test

REM wait until CSGO closes itself, then load next map??

pause