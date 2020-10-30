@echo off

REM <--- init var --->
set CSGO_Dir=Steam\steamapps\common\Counter-Strike Global Offensive\csgo
set Workshop_folder=maps\workshop\126484317
set timeout_between_maps=120
set timeout_CSGO_launch=30

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

REM create list of maps
set n=0
for %%i in (
	"de_shorttrain"
	"de_shortdust"
	"de_bank"
	"de_sugarcane"
	"de_safehouse"
	"de_stmarc"
	"de_lake"
	"ar_shoots"
	"ar_monastery"
	"ar_dizzy"
	"ar_baggage"
) do (
	set map_names[!n!]=%%i
	set /A n+=1
)

REM make sure there is only 1 BSP file
goto no_files_test
:no_files_test
cd %CSGO_Dir%
cd %Workshop_folder%
	
for /f %%A in (
	'dir /b *.bsp /a-d | find /I /N ".bsp"'
) do (
	set fcount=%%A
) if not %fcount%=="1" (
	echo Please make sure there is only 1 BSP file in the workshop folder!
	echo delete any other files
	start %windir%\explorer.exe "%Workshop_folder%"
	echo then press any key to continue...
	pause >nul
	goto no_files_test
) else (
	echo 1 BSP file found!
	goto end2
)
:end2	
	
	REM rename map file
	for /f %%A in (
		'dir /b *.bsp /a-d | find /I /N ".bsp"'
	) do (
		set current_BSP_name=%%A
	)
	
	rename %current_BSP_name% %%x
	
	REM start CSGO with the map file name
	cd %CSGO_Dir%
	cd..
	start csgo.exe "%Workshop_folder%\%%x"
	
	rem echo %%x | find /I /N "de_" >nul
	rem if errorlevel 0 ()
	
	REM wait x seconds, then load next map
	timeout %timeout_between_maps%
	
	
pause >nul