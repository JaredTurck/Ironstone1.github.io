REM rename map file and start CSGO
:rename_file2
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